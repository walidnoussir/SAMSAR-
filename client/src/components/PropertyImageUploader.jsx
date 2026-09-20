import React, { useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (must match the server limit)

/**
 * Controlled image uploader with drag & drop support.
 *
 * `value` is an array of `{ id, url, file }` items:
 *  - `file` holds the raw File for images picked in the browser (url is a blob preview)
 *  - `file` is `null` for already-hosted images (url is a remote URL)
 */
const PropertyImageUploader = ({
  value = [],
  onChange,
  maxImages = 8,
  disabled = false,
}) => {
  const inputRef = useRef(null);
  const objectUrlsRef = useRef([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
    };
  }, []);

  const addFiles = (fileList) => {
    if (disabled) return;

    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    const remaining = maxImages - value.length;
    if (remaining <= 0) {
      toast.error(`You can upload up to ${maxImages} images`);
      return;
    }

    const accepted = [];

    files.forEach((file) => {
      if (accepted.length >= remaining) return;

      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds the 5MB limit`);
        return;
      }

      const url = URL.createObjectURL(file);
      objectUrlsRef.current.push(url);
      accepted.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}`,
        url,
        file,
      });
    });

    if (files.length > remaining) {
      toast.error(`You can upload up to ${maxImages} images`);
    }

    if (accepted.length > 0) {
      onChange([...value, ...accepted]);
    }
  };

  const handleInputChange = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    const item = value[index];

    if (item?.file && item.url?.startsWith("blob:")) {
      URL.revokeObjectURL(item.url);
      objectUrlsRef.current = objectUrlsRef.current.filter(
        (url) => url !== item.url,
      );
    }

    onChange(value.filter((_, idx) => idx !== index));
  };

  const isFull = value.length >= maxImages;

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleInputChange}
        disabled={disabled}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        disabled={disabled || isFull}
        className={`w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
          isDragging
            ? "border-primary bg-primary-light"
            : "border-border bg-background hover:border-primary hover:bg-primary-light/40"
        }`}
      >
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-primary-light text-primary">
          {isDragging ? (
            <ImagePlus className="w-5 h-5" />
          ) : (
            <UploadCloud className="w-5 h-5" />
          )}
        </span>
        <span className="text-sm font-semibold text-text-main">
          {isFull
            ? "Maximum number of images reached"
            : "Click to upload or drag and drop"}
        </span>
        <span className="text-xs text-text-secondary">
          PNG, JPG or WEBP · up to 5MB each · max {maxImages} images
        </span>
      </button>

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {value.map((item, idx) => (
            <div
              key={item.id}
              className="relative aspect-video rounded-2xl overflow-hidden border border-border group bg-slate-100"
            >
              <img
                src={item.url}
                alt={`Property ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-white">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyImageUploader;
