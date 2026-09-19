import React from "react";
import { Filter, X, RotateCcw } from "lucide-react";

const CITIES = ["Casablanca", "Marrakech", "Rabat", "Tangier", "Agadir"];
const PROPERTY_TYPES = [
  { label: "Apartment", value: "Apartment" },
  { label: "Villa", value: "Villa" },
  { label: "Traditional Riad / House", value: "House" },
  { label: "Studio", value: "Studio" },
  { label: "Private Room", value: "Room" },
];

const PropertyFilters = ({
  filters,
  onChange,
  onReset,
  onApply,
  isOpen = true,
  onClose,
  isMobile = false,
}) => {
  const handleCityChange = (city) => {
    onChange({ ...filters, city: filters.city === city ? "" : city, page: 1 });
  };

  const handleTypeChange = (type) => {
    onChange({
      ...filters,
      propertyType: filters.propertyType === type ? "" : type,
      page: 1,
    });
  };

  const handleBedroomsChange = (beds) => {
    onChange({
      ...filters,
      bedrooms: filters.bedrooms === beds ? "" : beds,
      page: 1,
    });
  };

  const handleBathroomsChange = (baths) => {
    onChange({
      ...filters,
      bathrooms: filters.bathrooms === baths ? "" : baths,
      page: 1,
    });
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="text-base font-bold text-text-main">Filters</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear Filters</span>
        </button>
      </div>

      {/* City Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-3">
          City
        </label>
        <div className="space-y-2">
          {CITIES.map((c) => {
            const isSelected = filters.city?.toLowerCase() === c.toLowerCase();
            return (
              <label
                key={c}
                className="flex items-center justify-between text-sm text-text-main cursor-pointer hover:text-primary transition-colors py-0.5"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCityChange(c)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <span className={isSelected ? "font-semibold text-primary" : ""}>
                    {c}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Property Type Filter */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-3">
          Property Type
        </label>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((t) => {
            const isSelected = filters.propertyType === t.value;
            return (
              <label
                key={t.value}
                className="flex items-center justify-between text-sm text-text-main cursor-pointer hover:text-primary transition-colors py-0.5"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleTypeChange(t.value)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <span className={isSelected ? "font-semibold text-primary" : ""}>
                    {t.label}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-3">
          Monthly Price (MAD)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="text-[10px] text-text-secondary font-medium">Min MAD</span>
            <input
              type="number"
              min="0"
              step="500"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onChange({ ...filters, minPrice: e.target.value, page: 1 })
              }
              placeholder="0"
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <span className="text-[10px] text-text-secondary font-medium">Max MAD</span>
            <input
              type="number"
              min="0"
              step="500"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onChange({ ...filters, maxPrice: e.target.value, page: 1 })
              }
              placeholder="30000"
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-3">
          Bedrooms
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {["", "1", "2", "3", "4"].map((b) => {
            const isSelected = (filters.bedrooms || "") === b;
            return (
              <button
                key={b || "any"}
                type="button"
                onClick={() => handleBedroomsChange(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-background border-border text-text-main hover:border-primary/40"
                }`}
              >
                {b === "" ? "Any" : `${b}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-3">
          Bathrooms
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {["", "1", "2", "3"].map((b) => {
            const isSelected = (filters.bathrooms || "") === b;
            return (
              <button
                key={b || "any"}
                type="button"
                onClick={() => handleBathroomsChange(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-background border-border text-text-main hover:border-primary/40"
                }`}
              >
                {b === "" ? "Any" : `${b}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Surface (m²) */}
      <div className="pt-4 border-t border-border">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-main mb-3">
          Living Surface (m²)
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="text-[10px] text-text-secondary font-medium">Min m²</span>
            <input
              type="number"
              min="0"
              value={filters.minSurface || ""}
              onChange={(e) =>
                onChange({ ...filters, minSurface: e.target.value, page: 1 })
              }
              placeholder="30"
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <span className="text-[10px] text-text-secondary font-medium">Max m²</span>
            <input
              type="number"
              min="0"
              value={filters.maxSurface || ""}
              onChange={(e) =>
                onChange({ ...filters, maxSurface: e.target.value, page: 1 })
              }
              placeholder="500"
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-text-main focus:bg-surface focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Availability toggle */}
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-text-main block">Available Now</span>
          <span className="text-[11px] text-text-secondary">Hide rented properties</span>
        </div>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...filters,
              status: filters.status === "available" ? "" : "available",
              page: 1,
            })
          }
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
            filters.status === "available" ? "bg-primary" : "bg-border"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              filters.status === "available" ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Mobile Apply button */}
      {isMobile && (
        <div className="pt-6">
          <button
            type="button"
            onClick={() => {
              if (onApply) onApply();
              if (onClose) onClose();
            }}
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-md hover:bg-primary-dark transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4">
        <div className="bg-surface w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-3xl p-6 overflow-y-auto shadow-2xl border border-border animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-border">
            <span className="text-lg font-bold text-text-main">Filter Listings</span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-text-secondary hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs sticky top-28">
      {content}
    </div>
  );
};

export default PropertyFilters;
