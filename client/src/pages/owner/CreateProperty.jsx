import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Building2,
  MapPin,
  Image as ImageIcon,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
  Upload,
  Cloud,
  AlertCircle,
} from "lucide-react";
import { createProperty } from "../../features/properties/propertyThunks";
import LocationSelect from "../../components/LocationSelect";
import api from "../../services/api";
import toast from "react-hot-toast";

const CreateProperty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "Apartment",
    city: "Casablanca",
    address: "",
    latitude: 33.5731,
    longitude: -7.5898,
    bedrooms: "2",
    bathrooms: "1",
    surface: "80",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for LocationSelect change
  const handleLocationChange = (loc) => {
    setFormData((prev) => ({
      ...prev,
      city: loc.city,
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));
  };

  // Upload images to Cloudinary through backend endpoint
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate size (max 5MB each)
    const invalidFile = files.find((f) => f.size > 5 * 1024 * 1024);
    if (invalidFile) {
      toast.error(`"${invalidFile.name}" exceeds maximum allowed size of 5MB.`);
      return;
    }

    setUploadingImages(true);
    const toastId = toast.loading("Uploading images to Cloudinary...");

    try {
      const uploadFormData = new FormData();
      files.forEach((file) => {
        uploadFormData.append("images", file);
      });

      const { data } = await api.post("/properties/upload", uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.urls && data.urls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...data.urls],
        }));
        toast.success(
          `${data.urls.length} image${data.urls.length > 1 ? "s" : ""} uploaded to Cloudinary!`,
          { id: toastId },
        );
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to upload images to Cloudinary.",
        { id: toastId },
      );
    } finally {
      setUploadingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Fallback: Add image via direct URL
  const handleAddImageUrl = (e) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()],
    }));
    setImageUrlInput("");
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || !formData.address) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!formData.city) {
      toast.error("Please select a Moroccan city or place.");
      return;
    }

    if (formData.images.length === 0) {
      toast.error("Please upload at least one image of the property.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        propertyType: formData.propertyType,
        location: {
          city: formData.city,
          address: formData.address,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        surface: Number(formData.surface),
        images: formData.images,
        status: "available",
      };

      await dispatch(createProperty(payload)).unwrap();
      toast.success("Property listing published successfully!");
      navigate("/owner/properties");
    } catch (err) {
      toast.error(err || "Failed to create property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button & Header */}
      <div>
        <Link
          to="/owner/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Properties</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
          Create New Rental Listing
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Provide complete details to attract verified prospective tenants across Morocco.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <span>Property Information</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                required
                minLength={5}
                maxLength={100}
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Sunny Designer Studio w/ Terrace in Gauthier"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">Traditional House / Riad</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio">Studio</option>
                  <option value="Room">Private Room</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                  Monthly Rent (MAD) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min={0}
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 7500"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Detailed Description *
              </label>
              <textarea
                name="description"
                rows={5}
                required
                minLength={10}
                maxLength={2000}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe features, neighborhood, natural sunlight, furnishings, and lease conditions..."
                className="w-full p-4 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Dimensions & Layout */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-text-main">
            Layout & Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                min={0}
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                min={0}
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Surface (m²)
              </label>
              <input
                type="number"
                name="surface"
                min={0}
                value={formData.surface}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Location Coordinates & Moroccan City Selection */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Moroccan Location & Address</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Moroccan City / Place * (Searchable)
              </label>
              <LocationSelect
                value={formData.city}
                onChange={handleLocationChange}
                required={true}
                placeholder="Type or select any Moroccan city (e.g. Marrakech, Fès, Béni Mellal, Agadir)..."
              />
              <p className="text-[11px] text-text-secondary mt-1">
                Selecting a city automatically updates the default coordinates for the map.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Specific Street Address or Neighborhood *
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Avenue Mohammed VI, Guéliz"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                  Latitude (for Map view)
                </label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  required
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-mono text-text-main focus:bg-surface focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                  Longitude (for Map view)
                </label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  required
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-mono text-text-main focus:bg-surface focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Property Photography & Cloudinary Upload */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              <span>Property Photography (Cloudinary)</span>
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-light text-primary-dark">
              {formData.images.length} Image{formData.images.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Cloudinary File Upload Dropzone */}
          <div
            onClick={() => !uploadingImages && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${
              uploadingImages
                ? "border-primary bg-primary-light/10 cursor-not-allowed opacity-75"
                : "border-border hover:border-primary hover:bg-background/60"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="max-w-sm mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto shadow-xs">
                {uploadingImages ? (
                  <Loader2 className="w-7 h-7 animate-spin text-primary" />
                ) : (
                  <Cloud className="w-7 h-7" />
                )}
              </div>

              <div>
                <span className="text-sm font-bold text-text-main block">
                  {uploadingImages
                    ? "Uploading to Cloudinary..."
                    : "Upload images from your device"}
                </span>
                <span className="text-xs text-text-secondary mt-0.5 block">
                  Click to select multiple photos (PNG, JPG, WebP up to 5MB)
                </span>
              </div>

              {!uploadingImages && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-xs hover:bg-primary-dark transition-colors pointer-events-none"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Files</span>
                </button>
              )}
            </div>
          </div>

          {/* Fallback Image URL Input */}
          <div className="pt-2">
            <span className="text-xs font-bold text-text-secondary block mb-1.5">
              Or paste direct image URL
            </span>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/... or Cloudinary URL"
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add URL</span>
              </button>
            </div>
          </div>

          {/* Images Grid preview */}
          {formData.images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {formData.images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-border group bg-slate-100 shadow-xs"
                >
                  <img
                    src={imgUrl}
                    alt={`Property ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors shadow-xs"
                    title="Remove image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary text-white shadow-xs">
                      Cover Photo
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>No images uploaded yet. Please add at least 1 image before publishing.</span>
            </div>
          )}
        </div>

        {/* Submit action */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/owner/properties"
            className="px-6 py-3 rounded-2xl border border-border text-text-main font-semibold text-sm hover:bg-black/5"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading || uploadingImages}
            className="px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Listing...</span>
              </>
            ) : (
              <span>Publish Listing</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProperty;
