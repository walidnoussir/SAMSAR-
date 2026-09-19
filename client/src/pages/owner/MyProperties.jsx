import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Bed,
  Bath,
  Maximize,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  getMyProperties,
  deleteProperty,
} from "../../features/properties/propertyThunks";
import toast from "react-hot-toast";

const MyProperties = () => {
  const dispatch = useDispatch();
  const { myProperties, loading, error } = useSelector(
    (state) => state.properties,
  );
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(getMyProperties());
  }, [dispatch]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await dispatch(deleteProperty(id)).unwrap();
      toast.success("Property deleted successfully");
    } catch (err) {
      toast.error(err || "Failed to delete property");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
            My Property Listings
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage your active Moroccan rental portfolio, edit details, or track bookings.
          </p>
        </div>

        <Link
          to="/owner/properties/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
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
      ) : myProperties.length === 0 ? (
        /* Empty state */
        <div className="bg-surface rounded-3xl border border-border p-16 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-text-main">
            No properties listed yet
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Start welcoming tenants by creating your first verified rental listing in
            Morocco.
          </p>
          <Link
            to="/owner/properties/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Listing</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProperties.map((p) => (
            <div
              key={p._id}
              className="bg-surface rounded-3xl border border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] bg-slate-100">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary-dark">
                      <Building2 className="w-10 h-10 text-primary/40" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-xs ${
                        p.status === "available"
                          ? "bg-emerald-500/90 text-white"
                          : "bg-slate-800/90 text-white"
                      }`}
                    >
                      {p.status === "available" ? "Available" : "Rented"}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xl font-bold text-text-main">
                      {p.price?.toLocaleString()} MAD
                      <span className="text-xs font-normal text-text-secondary">/mo</span>
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary-light/40 text-primary-dark">
                      {p.propertyType}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-text-main line-clamp-1">
                    {p.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">
                      {p.location?.address}, {p.location?.city}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 py-2 border-t border-border/70 text-xs text-text-secondary font-medium mt-3">
                    <div className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-primary" />
                      <span>{p.bedrooms || 0} Beds</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-primary" />
                      <span>{p.bathrooms || 0} Baths</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5 text-primary" />
                      <span>{p.surface || 0} m²</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-4 bg-background/50 border-t border-border flex items-center justify-between gap-2">
                <Link
                  to={`/properties/${p._id}`}
                  className="p-2 rounded-xl text-text-secondary hover:text-text-main hover:bg-black/5"
                  title="View Public Listing"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                <Link
                  to={`/owner/properties/${p._id}/reservations`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border text-xs font-semibold text-text-main hover:bg-black/5"
                  title="View Bookings"
                >
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>Bookings</span>
                </Link>

                <Link
                  to={`/owner/properties/${p._id}/edit`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-primary/30 text-xs font-semibold text-primary hover:bg-primary-light/30"
                  title="Edit Listing"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(p._id, p.title)}
                  disabled={deletingId === p._id}
                  className="p-2 rounded-xl text-error hover:bg-red-50 cursor-pointer"
                  title="Delete Property"
                >
                  {deletingId === p._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
