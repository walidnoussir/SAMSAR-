import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Search,
  Check,
  ChevronDown,
  X,
  Compass,
} from "lucide-react";
import {
  MOROCCO_LOCATIONS,
  POPULAR_CITIES,
  searchLocations,
  findLocationByCity,
} from "../constants/moroccoLocations";

const LocationSelect = ({
  value,
  onChange,
  required = false,
  placeholder = "Search Moroccan city or place (e.g. Casablanca, Fès, Béni Mellal)...",
  className = "",
  showCoordinates = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'popular' | 'regions'
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Derive selected location object
  const selectedLocation =
    typeof value === "object" && value?.city
      ? value
      : findLocationByCity(value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter locations based on search query or tab
  const filteredLocations = searchLocations(searchQuery).filter((loc) => {
    if (searchQuery) return true; // search query takes precedence
    if (activeTab === "popular") {
      return POPULAR_CITIES.includes(loc.city);
    }
    return true;
  });

  const handleSelectLocation = (loc) => {
    onChange({
      city: loc.city,
      region: loc.region,
      province: loc.province,
      latitude: loc.latitude,
      longitude: loc.longitude,
    });
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange({
      city: "",
      region: "",
      province: "",
      latitude: 33.5731,
      longitude: -7.5898,
    });
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button / Input Display */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={`w-full min-h-[46px] px-3.5 py-2 rounded-xl border bg-background text-sm transition-all cursor-pointer flex items-center justify-between gap-2 select-none ${
          isOpen
            ? "border-primary ring-1 ring-primary bg-surface shadow-xs"
            : "border-border hover:border-primary/40 focus:border-primary"
        }`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden flex-1">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>

          {selectedLocation?.city ? (
            <div className="flex flex-col text-left truncate">
              <span className="text-sm font-bold text-text-main truncate">
                {selectedLocation.city}
              </span>
              <span className="text-[11px] text-text-secondary truncate">
                {selectedLocation.province} • {selectedLocation.region}
              </span>
            </div>
          ) : (
            <span className="text-xs sm:text-sm text-text-secondary/70 truncate">
              {placeholder}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {selectedLocation?.city && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-text-secondary hover:text-error hover:bg-black/5 transition-colors"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </div>
      </div>

      {/* Hidden input for HTML form validation */}
      {required && (
        <input
          type="text"
          value={selectedLocation?.city || ""}
          required
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
        />
      )}

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-surface rounded-2xl border border-border shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search Box */}
          <div className="p-3 border-b border-border bg-background/50">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-text-secondary absolute left-3 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type city (e.g. Marrakech, Béni Mellal, Fez)..."
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-border bg-surface text-xs sm:text-sm text-text-main placeholder:text-text-secondary/70 focus:outline-none focus:border-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 p-1 text-text-secondary hover:text-text-main"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filters Pill Bar (when not actively searching) */}
            {!searchQuery && (
              <div className="flex items-center gap-1.5 mt-2.5 pt-1 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === "all"
                      ? "bg-primary text-white"
                      : "bg-surface text-text-secondary hover:text-text-main border border-border/70"
                  }`}
                >
                  All Places ({MOROCCO_LOCATIONS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("popular")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === "popular"
                      ? "bg-primary text-white"
                      : "bg-surface text-text-secondary hover:text-text-main border border-border/70"
                  }`}
                >
                  Popular Cities ({POPULAR_CITIES.length})
                </button>
              </div>
            )}
          </div>

          {/* Locations List */}
          <div className="max-h-64 sm:max-h-72 overflow-y-auto divide-y divide-border/40 p-1">
            {filteredLocations.length === 0 ? (
              <div className="p-6 text-center text-text-secondary space-y-1">
                <Compass className="w-6 h-6 mx-auto text-text-secondary/50" />
                <p className="text-xs font-semibold text-text-main">
                  No Moroccan location found
                </p>
                <p className="text-[11px]">
                  Try searching without accents or using alternate spellings.
                </p>
              </div>
            ) : (
              filteredLocations.map((loc) => {
                const isSelected = selectedLocation?.city === loc.city;

                return (
                  <button
                    key={`${loc.region}-${loc.city}`}
                    type="button"
                    onClick={() => handleSelectLocation(loc)}
                    className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-primary-light/40 text-primary-dark font-semibold"
                        : "hover:bg-background text-text-main"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? "text-primary" : "text-text-secondary"
                        }`}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-text-main">
                            {loc.city}
                          </span>
                          {POPULAR_CITIES.includes(loc.city) && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary-light/60 text-primary-dark">
                              Popular
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-text-secondary block">
                          {loc.province} • {loc.region}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {showCoordinates && (
                        <span className="text-[10px] text-text-secondary font-mono hidden sm:inline">
                          {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                        </span>
                      )}
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-2.5 border-t border-border bg-background/50 text-[11px] text-text-secondary flex items-center justify-between px-3">
            <span>Covers all 12 Moroccan administrative regions</span>
            <span className="text-primary font-semibold">Morocco Kingdom</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelect;
