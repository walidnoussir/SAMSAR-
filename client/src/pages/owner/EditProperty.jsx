import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  MapPin,
  Image as ImageIcon,
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";
import {
  getPropertyById,
  updateProperty,
  uploadPropertyImages,
} from "../../features/properties/propertyThunks";
import PropertyImageUploader from "../../components/PropertyImageUploader";
import toast from "react-hot-toast";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { property, loading: fetching } = useSelector((state) => state.properties);

  const [loading, setLoading] = useState(false);
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
  });

  const [images, setImages] = useState([]);

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
      });

      setImages(
        (property.images || []).map((url) => ({
          id: url,
          url,
          file: null,
        })),
      );
    }
  }, [property, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const filesToUpload = images
        .filter((image) => image.file)
        .map((image) => image.file);

      const existingImages = images
        .filter((image) => !image.file)
        .map((image) => image.url);

      const uploadedImages = filesToUpload.length
        ? await dispatch(uploadPropertyImages(filesToUpload)).unwrap()
        : [];

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
        images: [...existingImages, ...uploadedImages],
      };

      await dispatch(updateProperty({ id, propertyData: payload })).unwrap();
      toast.success("Property updated successfully!");
      navigate("/owner/properties");
    } catch (err) {
      toast.error(err || "Failed to update property");
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
                className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-bold text-text-main focus:outline-none"
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

        {/* Location */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Location</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                City *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="Casablanca">Casablanca</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Rabat">Rabat</option>
                <option value="Tangier">Tangier</option>
                <option value="Agadir">Agadir</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-1.5">
                Address *
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
          </div>
        </div>

        {/* Photography */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            <span>Property Photography</span>
          </h2>

          <PropertyImageUploader
            value={images}
            onChange={setImages}
            disabled={loading}
          />
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
            disabled={loading}
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
