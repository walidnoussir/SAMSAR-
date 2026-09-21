import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  MapPin,
  Image as ImageIcon,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
  Save,
  Cloud,
  AlertCircle,
} from "lucide-react";
import {
  getPropertyById,
  updateProperty,
} from "../../features/properties/propertyThunks";
import LocationSelect from "../../components/LocationSelect";
import api from "../../services/api";
import toast from "react-hot-toast";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { property, loading: fetching } = useSelector((state) => state.properties);

  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "Apartment",
    status: "available",
    city: "Casablanca",
    address: "",
    latitude: 33.5731,
    longitude: -7.5898,
    bedrooms: 2,
    bathrooms: 1,
    surface: 80,
    images: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(getPropertyById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (property && property._id === id) {
      setFormData({
        title: property.title || "",
        description: property.description || "",
        price: property.price || "",
        propertyType: property.propertyType || "Apartment",
        status: property.status || "available",
        city: property.location?.city || "Casablanca",
        address: property.location?.address || "",
        latitude: property.location?.latitude || 33.5731,
        longitude: property.location?.longitude || -7.5898,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        surface: property.surface || 0,
        images: property.images || [],
      });
    }
  }, [property, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (loc) => {
    setFormData((prev) => ({
      ...prev,
      city: loc.city,
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

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
          `${data.urls.length} image${data.urls.length > 1 ? "s" : ""} uploaded!`,
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

    if (formData.images.length === 0) {
      toast.error("Please ensure the listing has at least one image.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        propertyType: formData.propertyType,
        status: formData.status,
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
      };

      await dispatch(updateProperty({ id, propertyData: payload })).unwrap();
      toast.success("Property updated successfully!");
      navigate("/owner/properties");
    } catch (err) {
      toast.error(err || "Failed to update property.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          to="/owner/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Properties</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
          Edit Property Listing
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic info */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span>Property Information</span>
            </h2>

            {/* Status toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-secondary">Status:</span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-bold text-text-main focus:outline-none cursor-pointer"
              >
                <option value="available">🟢 Available</option>
                <option value="rented">🔴 Currently Rented</option>
              </select>
            </div>
          </div>

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
                className="w-full p-4 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-text-main">Layout Specifications</h2>
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

        {/* Location with LocationSelect */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Moroccan Location</span>
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
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Address / Street *
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                  Latitude
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
                  Longitude
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

        {/* Photography with Cloudinary Dropzone */}
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

          <div
            onClick={() => !uploadingImages && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all cursor-pointer ${
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
            <div className="max-w-sm mx-auto space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto">
                {uploadingImages ? (
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                ) : (
                  <Cloud className="w-6 h-6" />
                )}
              </div>
              <span className="text-xs font-bold text-text-main block">
                {uploadingImages
                  ? "Uploading to Cloudinary..."
                  : "Upload new images from your device"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              placeholder="Add image URL (https://...)"
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
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-white">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>No images remaining. Please upload at least one image.</span>
            </div>
          )}
        </div>

        {/* Submit */}
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
            className="px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
