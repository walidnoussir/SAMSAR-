import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  ShieldCheck,
  Share2,
  Star,
  Sparkles,
  Wifi,
  Wind,
  Car,
  Tv,
  Flame,
  Coffee,
  AlertCircle,
  Loader2,
  ArrowRight,
  X,
} from "lucide-react";
import { getPropertyById } from "../features/properties/propertyThunks";
import { createReservation } from "../features/reservations/reservationThunks";
import FavoriteButton from "../components/FavoriteButton";
import toast from "react-hot-toast";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80";

const PropertyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { property, loading, error } = useSelector((state) => state.properties);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [reservationMessage, setReservationMessage] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [duration, setDuration] = useState("6 months");
  const [occupants, setOccupants] = useState("1 - 2 People");
  const [submittingReservation, setSubmittingReservation] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getPropertyById(id));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, dispatch]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: property?.title || "Samsar Rental",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Property link copied to clipboard!");
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in as a tenant to request a reservation");
      navigate("/login", { state: { from: { pathname: `/properties/${id}` } } });
      return;
    }

    if (user?.role === "Owner") {
      toast.error("Owners cannot book rental properties. Please use a tenant account.");
      return;
    }

    if (property?.status !== "available") {
      toast.error("This property is no longer available for rent");
      return;
    }

    setSubmittingReservation(true);
    try {
      const fullMessage = `[Move-in: ${moveInDate || "ASAP"}, Duration: ${duration}, Occupants: ${occupants}] ${reservationMessage}`;

      await dispatch(
        createReservation({
          propertyId: id,
          message: fullMessage,
        }),
      ).unwrap();

      toast.success("Reservation request sent successfully to the owner!");
      navigate("/reservations");
    } catch (err) {
      toast.error(err || "Failed to create reservation");
    } finally {
      setSubmittingReservation(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-xl w-2/3" />
        <div className="h-4 bg-slate-200 rounded-lg w-1/3" />
        <div className="aspect-[16/9] bg-slate-200 rounded-3xl" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-surface rounded-3xl border border-border text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-error mx-auto" />
        <h2 className="text-xl font-bold text-text-main">Property Not Found</h2>
        <p className="text-sm text-text-secondary">
          {error || "The requested property does not exist or has been removed."}
        </p>
        <Link
          to="/properties"
          className="inline-block px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold"
        >
          Return to Browse
        </Link>
      </div>
    );
  }

  const images = property.images?.length > 0 ? property.images : [DEFAULT_IMAGE];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-text-secondary">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link to="/properties" className="hover:text-primary">
          Properties
        </Link>
        <span>/</span>
        <Link
          to={`/properties?city=${property.location?.city}`}
          className="hover:text-primary"
        >
          {property.location?.city}
        </Link>
        <span>/</span>
        <span className="text-text-main font-semibold truncate max-w-xs">
          {property.title}
        </span>
      </nav>

      {/* 2. Header Title & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
            {property.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-text-secondary">
            <div className="flex items-center gap-1 text-accent font-semibold">
              <Star className="w-4 h-4 fill-accent" />
              <span>4.94 (28 reviews)</span>
            </div>
            <span>•</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Owner
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>
                {property.location?.address}, {property.location?.city}, Morocco
              </span>
            </div>
          </div>
        </div>

        {/* Share & Favorite Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-surface text-text-main text-xs font-semibold hover:bg-black/5 transition-colors cursor-pointer shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <FavoriteButton propertyId={property._id} showBg={true} />
        </div>
      </div>

      {/* 3. Image Gallery (Hero Mosaic matching image 4) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[21/9] max-h-[500px]">
        {/* Main large image */}
        <div
          onClick={() => setSelectedPhotoIndex(0)}
          className="md:col-span-2 h-full cursor-pointer relative group overflow-hidden bg-slate-100"
        >
          <img
            src={images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Sub grid */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-full">
          {[1, 2, 3, 4].map((idx) => {
            const imgSrc = images[idx] || images[0];
            return (
              <div
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx % images.length)}
                className="relative h-full cursor-pointer group overflow-hidden bg-slate-100"
              >
                <img
                  src={imgSrc}
                  alt={`${property.title} ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {idx === 4 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-sm font-bold">
                    +{images.length - 4} photos
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/40"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={images[selectedPhotoIndex]}
            alt="Full size property view"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}

      {/* 4. Main Details Grid (2 Columns: Left content, Right booking widget) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: Specs, Features, Description, Amenities, Map, Reviews */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-10">
          {/* Key Specs Card Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-text-main block">
                  {property.bedrooms || 0} Beds
                </span>
                <span className="text-[11px] text-text-secondary">Bedrooms</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-text-main block">
                  {property.bathrooms || 0} Baths
                </span>
                <span className="text-[11px] text-text-secondary">Bathrooms</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                <Maximize className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-text-main block">
                  {property.surface || 0} m²
                </span>
                <span className="text-[11px] text-text-secondary">Living Space</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-text-main block">
                  {property.propertyType}
                </span>
                <span className="text-[11px] text-text-secondary">Type</span>
              </div>
            </div>
          </div>

          {/* Key Residence Features (matching image 4) */}
          <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
            <h3 className="text-base font-bold text-text-main">
              Key Residence Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-background border border-border/70 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary-light text-primary mt-0.5">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-main">
                    Dedicated Workspace & Fiber
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Equipped with 100Mbps fiber internet and ergonomic setup.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background border border-border/70 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary-light text-primary mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-main">
                    Private Solarium & Living Area
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Year-round climate control with sun terrace and quiet lounge.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background border border-border/70 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary-light text-primary mt-0.5">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-main">
                    Modern Moroccan Design
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Artisan zellige tiles, smooth tadelakt, and high ceilings.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background border border-border/70 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary-light text-primary mt-0.5">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-main">
                    Gated Security & Parking
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Secure private entry with dedicated underground parking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* About this Property */}
          <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
            <h3 className="text-base font-bold text-text-main">About this Property</h3>
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {property.description}
            </div>
          </div>

          {/* Amenities Included */}
          <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
            <h3 className="text-base font-bold text-text-main">Amenities Included</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-text-main">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background">
                <Wifi className="w-4 h-4 text-primary" />
                <span>High-speed WiFi</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background">
                <Wind className="w-4 h-4 text-primary" />
                <span>Air Conditioning</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background">
                <Car className="w-4 h-4 text-primary" />
                <span>Free Street Parking</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background">
                <Tv className="w-4 h-4 text-primary" />
                <span>Smart 4K TV</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background">
                <Flame className="w-4 h-4 text-primary" />
                <span>Fireplace / Heating</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Security Cameras</span>
              </div>
            </div>
          </div>

          {/* Location & Neighborhood Interactive Map Preview */}
          <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-text-main">Location & Neighborhood</h3>
              <span className="text-xs text-primary font-semibold">
                Walkable Score: 94/100
              </span>
            </div>

            {/* Embedded Visual Map Preview */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-slate-100 flex items-center justify-center">
              <iframe
                title="Property Map Location"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://maps.google.com/maps?q=${
                  property.location?.latitude || 33.5731
                },${property.location?.longitude || -7.5898}&hl=en&z=14&output=embed`}
                className="w-full h-full"
              />
              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-md">
                📍 {property.location?.city}
              </div>
            </div>

            {/* Nearby attractions pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-background text-xs text-text-secondary">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>5 min to Carré Eden Shopping & Cafés</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-background text-xs text-text-secondary">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>12 min to Majorelle Garden & Museum</span>
              </div>
            </div>
          </div>

          {/* Landlord / Host Card */}
          <div className="p-6 rounded-3xl bg-surface border border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-lg overflow-hidden border-2 border-primary/20">
                {property.owner?.avatar ? (
                  <img
                    src={property.owner.avatar}
                    alt={property.owner.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{property.owner?.firstName?.[0] || "O"}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base font-bold text-text-main">
                    Hosted by {property.owner?.firstName} {property.owner?.lastName}
                  </h4>
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs text-text-secondary">
                  Verified Property Owner • Response rate: 98%
                </p>
              </div>
            </div>

            <a
              href={`mailto:${property.owner?.email || ""}`}
              className="px-4 py-2 rounded-xl border border-border hover:border-primary text-xs font-semibold text-text-main hover:text-primary transition-colors cursor-pointer"
            >
              Contact Owner
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Floating Booking / Reservation Card (matching image 4) */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
          <div className="bg-surface rounded-3xl p-6 sm:p-7 border border-border shadow-xl space-y-6">
            {/* Price & Monthly badge */}
            <div className="flex items-baseline justify-between gap-2 pb-4 border-b border-border">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-text-main">
                    {property.price?.toLocaleString()} MAD
                  </span>
                  <span className="text-xs text-text-secondary font-medium">/ month</span>
                </div>
                <span className="text-[11px] text-text-secondary">
                  All utility estimates included
                </span>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  property.status === "available"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {property.status === "available" ? "Available Monthly" : "Currently Rented"}
              </span>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              {/* Move-in Date */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                  Move-in Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs font-semibold text-text-main focus:bg-surface focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Lease Duration & Occupants */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs font-semibold text-text-main focus:bg-surface focus:border-primary focus:outline-none cursor-pointer"
                  >
                    <option value="1 month">1 Month</option>
                    <option value="3 months">3 Months</option>
                    <option value="6 months">6 Months</option>
                    <option value="12 months">12 Months (1 yr)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                    Occupants
                  </label>
                  <select
                    value={occupants}
                    onChange={(e) => setOccupants(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs font-semibold text-text-main focus:bg-surface focus:border-primary focus:outline-none cursor-pointer"
                  >
                    <option value="1 Person">1 Person</option>
                    <option value="2 People">2 People</option>
                    <option value="3 People">3 People</option>
                    <option value="4+ People">4+ People</option>
                  </select>
                </div>
              </div>

              {/* Direct Message */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                  Message to Owner
                </label>
                <textarea
                  rows="3"
                  value={reservationMessage}
                  onChange={(e) => setReservationMessage(e.target.value)}
                  placeholder="Introduce yourself (e.g. relocation for work, family size, profession)..."
                  className="w-full p-3 rounded-xl border border-border bg-background text-xs text-text-main focus:bg-surface focus:border-primary focus:outline-none resize-none"
                />
              </div>

              {/* Price Calculation Summary (matching image 4) */}
              <div className="space-y-2 pt-3 border-t border-border text-xs">
                <div className="flex justify-between text-text-secondary">
                  <span>Monthly rent</span>
                  <span className="font-semibold text-text-main">
                    {property.price?.toLocaleString()} MAD
                  </span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Security deposit (refundable)</span>
                  <span className="font-semibold text-text-main">
                    {property.price?.toLocaleString()} MAD
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Samsar Tenant Protection</span>
                  <span className="font-bold">0 MAD (Free)</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-border font-bold text-sm text-text-main">
                  <span>Total initial request</span>
                  <span className="text-primary">
                    {((property.price || 0) * 2).toLocaleString()} MAD
                  </span>
                </div>
              </div>

              {/* CTA Submit Button */}
              <button
                type="submit"
                disabled={submittingReservation || property.status !== "available"}
                className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99] mt-2"
              >
                {submittingReservation ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Request Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-text-secondary text-center leading-tight">
                🔒 You won't be charged yet. The owner will review your request and reply
                within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
