import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ArrowRight, AlertCircle } from "lucide-react";
import { getFavorites } from "../features/favorites/favoriteThunks";
import PropertyCard from "../components/PropertyCard";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main flex items-center gap-2.5">
            <span>Saved Favorites</span>
            <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-primary-light text-primary-dark">
              {favorites.length}
            </span>
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Properties you've bookmarked for your future home in Morocco.
          </p>
        </div>

        <Link
          to="/properties"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark"
        >
          <span>Find more properties</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-surface rounded-3xl border border-border p-4 animate-pulse space-y-3"
            >
              <div className="bg-slate-200 aspect-[4/3] rounded-2xl w-full" />
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 rounded-3xl border border-error/30 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-error mx-auto" />
          <p className="text-error font-medium">{error}</p>
        </div>
      ) : favorites.length === 0 ? (
        /* Empty State */
        <div className="bg-surface rounded-3xl border border-border p-16 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-red-50 text-error flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-text-main">
            Save the places you love.
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            You don't have any favorite listings yet. Click the heart icon on any property to
            save it for later.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors shadow-xs"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => {
            const property = fav.property;
            if (!property) return null;
            return <PropertyCard key={fav._id} property={property} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
