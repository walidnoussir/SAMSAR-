import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  ShieldCheck,
  Zap,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import FavoriteButton from "./FavoriteButton";

// Fallback image if property has no images
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";

const PropertyCard = ({ property, viewMode = "grid" }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  if (!property) return null;

  const images =
    property.images && property.images.length > 0
      ? property.images
      : [DEFAULT_IMAGE];

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const isRented = property.status === "rented";

  return (
    <div
      className={`group bg-surface rounded-2xl sm:rounded-3xl border border-border/80 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col ${
        viewMode === "list" ? "md:flex-row md:items-stretch" : ""
      }`}
    >
      {/* Media / Image Container */}
      <div
        className={`relative overflow-hidden bg-background ${
          viewMode === "list"
            ? "md:w-2/5 md:min-h-[260px] h-64 sm:h-72"
            : "w-full aspect-[4/3] sm:aspect-[16/10]"
        }`}
      >
        <img
          src={images[currentImgIndex]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-semibold shadow-xs">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </span>

          {isRented ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/90 backdrop-blur-md text-white text-[11px] font-semibold">
              Rented
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/95 backdrop-blur-md text-white text-[11px] font-semibold shadow-xs">
              <Zap className="w-3 h-3" />
              Available
            </span>
          )}
        </div>

        {/* Favorite Button (Top Right) */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton propertyId={property._id} />
        </div>

        {/* Image Carousel Arrows (shown on hover if >1 images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-surface/80 hover:bg-surface text-text-main flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-surface/80 hover:bg-surface text-text-main flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Photo Counter Pill */}
            <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium tracking-wide z-10">
              {currentImgIndex + 1}/{images.length} photos
            </div>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Price & Property Type Header */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-text-main">
                {property.price?.toLocaleString()} MAD
              </span>
              <span className="text-xs text-text-secondary font-medium">/ month</span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-primary-light/40 text-primary-dark">
              {property.propertyType}
            </span>
          </div>

          {/* Title */}
          <Link
            to={`/properties/${property._id}`}
            className="block text-base sm:text-lg font-bold text-text-main hover:text-primary transition-colors line-clamp-1 mb-1.5"
          >
            {property.title}
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">
              {property.location?.city}
              {property.location?.address ? `, ${property.location.address}` : ""}
            </span>
          </div>

          {/* Key Specs Row */}
          <div className="flex items-center gap-4 py-3 border-y border-border/70 text-xs text-text-secondary font-medium">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-primary" />
              <span>{property.bedrooms || 0} Beds</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-primary" />
              <span>{property.bathrooms || 0} Baths</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-primary" />
              <span>{property.surface || 0} m²</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-5 pt-1 flex items-center justify-between gap-3">
          <span className="text-xs text-text-secondary truncate">
            Owner:{" "}
            <span className="font-medium text-text-main">
              {property.owner?.firstName || "Verified Landlord"}
            </span>
          </span>

          <Link
            to={`/properties/${property._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow active:scale-95 shrink-0"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
