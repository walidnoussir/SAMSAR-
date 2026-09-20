import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Building2,
  MapPin,
  Image as ImageIcon,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import {
  createProperty,
  uploadPropertyImages,
} from "../../features/properties/propertyThunks";
import PropertyImageUploader from "../../components/PropertyImageUploader";
import toast from "react-hot-toast";

const CITIES_COORDINATES = {
  Casablanca: { lat: 33.5731, lng: -7.5898 },
  Marrakech: { lat: 31.6295, lng: -7.9811 },
  Rabat: { lat: 34.0209, lng: -6.8416 },
  Tangier: { lat: 35.7595, lng: -5.834 },
  Agadir: { lat: 30.4278, lng: -9.5981 },
};

const CreateProperty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
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
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" && CITIES_COORDINATES[value]) {
      setFormData((prev) => ({
        ...prev,
        city: value,
        latitude: CITIES_COORDINATES[value].lat,
        longitude: CITIES_COORDINATES[value].lng,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one property image");
      return;
    }

    setLoading(true);
    try {
      const uploadedImages = await dispatch(
        uploadPropertyImages(images.map((image) => image.file)),
      ).unwrap();

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
        images: uploadedImages,
        status: "available",
      };

      await dispatch(createProperty(payload)).unwrap();
      toast.success("Property listing created successfully!");
      navigate("/owner/properties");
    } catch (err) {
      toast.error(err || "Failed to create property");
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

        {/* Section 3: Location Coordinates */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-5">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Location & Address</span>
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
                Street Address / Neighborhood *
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. 14 Rue Jean Jaurès, Gauthier"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Property Images */}
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
            disabled={loading}
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
