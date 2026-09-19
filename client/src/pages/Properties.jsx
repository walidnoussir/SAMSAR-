import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Grid,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
} from "lucide-react";
import { getProperties } from "../features/properties/propertyThunks";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";

const POPULAR_CITIES = [
  "All Morocco",
  "Casablanca",
  "Marrakech",
  "Rabat",
  "Tangier",
  "Agadir",
];

const Properties = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, pagination, loading, error } = useSelector(
    (state) => state.properties,
  );

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list' | 'map'
  const [searchInput, setSearchInput] = useState(searchParams.get("city") || "");

  // Read current filters from URL params
  const currentFilters = {
    city: searchParams.get("city") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
    minSurface: searchParams.get("minSurface") || "",
    maxSurface: searchParams.get("maxSurface") || "",
    status: searchParams.get("status") || "",
    sort: searchParams.get("sort") || "newest",
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: 9,
  };

  useEffect(() => {
    // Clean params for API call
    const query = {};
    Object.entries(currentFilters).forEach(([k, v]) => {
      if (v !== "" && v !== undefined && v !== null) {
        query[k] = v;
      }
    });

    dispatch(getProperties(query));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams, dispatch]);

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v !== "" && v !== undefined && v !== null) {
        params.set(k, v);
      }
    });
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({ ...currentFilters, city: searchInput.trim(), page: 1 });
  };

  const handleCityPillClick = (city) => {
    if (city === "All Morocco") {
      setSearchInput("");
      updateFilters({ ...currentFilters, city: "", page: 1 });
    } else {
      setSearchInput(city);
      updateFilters({ ...currentFilters, city, page: 1 });
    }
  };

  const handleSortChange = (e) => {
    updateFilters({ ...currentFilters, sort: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || (pagination && newPage > pagination.totalPages)) return;
    updateFilters({ ...currentFilters, page: newPage });
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setSearchParams(new URLSearchParams());
  };

  // Count active filters (excluding default sort and page)
  const activeFilterCount = [
    currentFilters.city,
    currentFilters.propertyType,
    currentFilters.minPrice,
    currentFilters.maxPrice,
    currentFilters.bedrooms,
    currentFilters.bathrooms,
    currentFilters.minSurface,
    currentFilters.maxSurface,
    currentFilters.status,
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <span className="text-text-main font-medium">Properties for Rent in Morocco</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-main">
          Find your next home in Morocco
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Verified properties with instant booking and transparent pricing.
        </p>
      </div>

      {/* Top Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex items-center gap-2 p-2 bg-surface rounded-2xl border border-border shadow-xs focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <div className="pl-3 text-text-secondary pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by neighborhood, street, or city (e.g. Maarif, Gueliz, Agdal)..."
            className="flex-1 bg-transparent py-2 px-2 text-sm text-text-main placeholder:text-text-secondary/70 focus:outline-none"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                updateFilters({ ...currentFilters, city: "", page: 1 });
              }}
              className="p-1 text-text-secondary hover:text-text-main"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors shadow-xs"
          >
            Search
          </button>
        </div>
      </form>

      {/* Quick City Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {POPULAR_CITIES.map((city) => {
          const isActive =
            city === "All Morocco"
              ? !currentFilters.city
              : currentFilters.city?.toLowerCase() === city.toLowerCase();

          return (
            <button
              key={city}
              type="button"
              onClick={() => handleCityPillClick(city)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "bg-surface border border-border text-text-main hover:border-primary/40 hover:bg-black/5"
              }`}
            >
              {city}
            </button>
          );
        })}
      </div>

      {/* Main Content Layout: Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1">
          <PropertyFilters
            filters={currentFilters}
            onChange={updateFilters}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Mobile Filter Drawer */}
        <PropertyFilters
          filters={currentFilters}
          onChange={updateFilters}
          onReset={handleResetFilters}
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          isMobile={true}
        />

        {/* Results Column */}
        <section className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            {/* Total Results Count */}
            <div>
              <span className="text-lg font-bold text-text-main">
                {pagination?.total !== undefined ? pagination.total : properties.length}{" "}
                properties available for rent
              </span>
              {currentFilters.city && (
                <span className="text-xs text-text-secondary block">
                  in {currentFilters.city} & surrounding areas
                </span>
              )}
            </div>

            {/* Controls Right */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-surface text-xs font-semibold text-text-main shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  value={currentFilters.sort}
                  onChange={handleSortChange}
                  className="appearance-none bg-surface border border-border rounded-xl px-3.5 py-2 pr-8 text-xs font-medium text-text-main focus:border-primary focus:outline-none cursor-pointer shadow-xs"
                >
                  <option value="newest">Sort by: Newest Listed</option>
                  <option value="priceAsc">Sort by: Price: Low to High</option>
                  <option value="priceDesc">Sort by: Price: High to Low</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-text-secondary absolute right-2.5 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-surface border border-border rounded-xl p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary-light text-primary font-bold"
                      : "text-text-secondary hover:text-text-main"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-primary-light text-primary font-bold"
                      : "text-text-secondary hover:text-text-main"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Tag Pills Row */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-text-secondary font-medium">Active filters:</span>

              {currentFilters.city && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-light/50 text-primary-dark font-medium border border-primary/20">
                  {currentFilters.city}
                  <button
                    onClick={() => updateFilters({ ...currentFilters, city: "", page: 1 })}
                    className="hover:text-error"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {currentFilters.propertyType && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-light/50 text-primary-dark font-medium border border-primary/20">
                  {currentFilters.propertyType}
                  <button
                    onClick={() =>
                      updateFilters({ ...currentFilters, propertyType: "", page: 1 })
                    }
                    className="hover:text-error"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {(currentFilters.minPrice || currentFilters.maxPrice) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-light/50 text-primary-dark font-medium border border-primary/20">
                  Price: {currentFilters.minPrice || "0"} - {currentFilters.maxPrice || "Any"} MAD
                  <button
                    onClick={() =>
                      updateFilters({
                        ...currentFilters,
                        minPrice: "",
                        maxPrice: "",
                        page: 1,
                      })
                    }
                    className="hover:text-error"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {currentFilters.bedrooms && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-light/50 text-primary-dark font-medium border border-primary/20">
                  {currentFilters.bedrooms}+ Beds
                  <button
                    onClick={() =>
                      updateFilters({ ...currentFilters, bedrooms: "", page: 1 })
                    }
                    className="hover:text-error"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {currentFilters.status && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-light/50 text-primary-dark font-medium border border-primary/20">
                  Available Only
                  <button
                    onClick={() =>
                      updateFilters({ ...currentFilters, status: "", page: 1 })
                    }
                    className="hover:text-error"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-xs text-primary font-semibold hover:underline ml-2"
              >
                Reset all
              </button>
            </div>
          )}

          {/* Properties Grid or Skeletons */}
          {loading ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-surface rounded-3xl border border-border p-4 animate-pulse space-y-4"
                >
                  <div className="bg-slate-200 aspect-[4/3] rounded-2xl w-full" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-8 rounded-3xl bg-red-50 border border-error/30 text-center space-y-3">
              <p className="text-error font-semibold text-base">{error}</p>
              <button
                onClick={() => dispatch(getProperties(currentFilters))}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
              >
                Try Again
              </button>
            </div>
          ) : properties.length === 0 ? (
            /* Empty State */
            <div className="py-16 px-4 bg-surface rounded-3xl border border-border text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-primary-light text-primary flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-main">No properties found</h3>
              <p className="text-sm text-text-secondary max-w-md mx-auto">
                We couldn't find any rentals matching your search criteria. Try removing some
                filters or search in another city.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="pt-8 pb-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(currentFilters.page - 1)}
                disabled={currentFilters.page <= 1}
                className="p-2 rounded-xl border border-border bg-surface text-text-main hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  return (
                    p === 1 ||
                    p === pagination.totalPages ||
                    Math.abs(p - currentFilters.page) <= 1
                  );
                })
                .map((pageNum, idx, arr) => {
                  const showEllipsis = idx > 0 && pageNum - arr[idx - 1] > 1;
                  const isCurrent = pageNum === currentFilters.page;

                  return (
                    <React.Fragment key={pageNum}>
                      {showEllipsis && (
                        <span className="px-2 text-text-secondary">...</span>
                      )}
                      <button
                        type="button"
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          isCurrent
                            ? "bg-primary text-white shadow-xs"
                            : "bg-surface border border-border text-text-main hover:bg-black/5"
                        }`}
                      >
                        {pageNum}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                type="button"
                onClick={() => handlePageChange(currentFilters.page + 1)}
                disabled={currentFilters.page >= pagination.totalPages}
                className="p-2 rounded-xl border border-border bg-surface text-text-main hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Save Search Alert Banner (matching bottom of image 5) */}
          <div className="p-6 rounded-3xl bg-primary-light/40 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main">
                  Looking for something specific in Morocco?
                </h4>
                <p className="text-xs text-text-secondary">
                  Save your search alerts to receive notifications for new matching listings.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert("Search alert saved! You will receive updates.")}
              className="px-4 py-2.5 rounded-xl border border-primary text-primary font-semibold text-xs bg-surface hover:bg-primary hover:text-white transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Save Search Alert
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Properties;
