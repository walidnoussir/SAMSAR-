import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  ArrowRight,
  Loader2,
  Ban,
} from "lucide-react";
import {
  getMyReservations,
  cancelReservation,
} from "../features/reservations/reservationThunks";
import toast from "react-hot-toast";

const MyReservations = () => {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector(
    (state) => state.reservations,
  );
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    dispatch(getMyReservations());
  }, [dispatch]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this pending reservation?")) {
      return;
    }

    setCancellingId(id);
    try {
      await dispatch(cancelReservation(id)).unwrap();
      toast.success("Reservation cancelled successfully");
    } catch (err) {
      toast.error(err || "Failed to cancel reservation");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Accepted
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Pending Review
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            Declined
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Ban className="w-3.5 h-3.5 text-slate-500" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
          My Rental Reservations
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Track the status of your rental applications and landlord responses.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-surface p-6 rounded-3xl border border-border animate-pulse flex flex-col sm:flex-row gap-6"
            >
              <div className="w-full sm:w-48 aspect-video sm:aspect-square bg-slate-200 rounded-2xl" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-10 bg-slate-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 rounded-3xl border border-error/30 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-error mx-auto" />
          <p className="text-error font-medium">{error}</p>
          <button
            onClick={() => dispatch(getMyReservations())}
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      ) : reservations.length === 0 ? (
        /* Empty State */
        <div className="bg-surface rounded-3xl border border-border p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-text-main">
            You don't have any reservations yet
          </h3>
          <p className="text-sm text-text-secondary max-w-sm mx-auto">
            Once you request a reservation on a property, you can track the landlord's
            approval status here.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors shadow-xs"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => {
            const property = res.property;
            const isPending = res.status === "pending";

            return (
              <div
                key={res._id}
                className="bg-surface p-5 sm:p-6 rounded-3xl border border-border hover:border-primary/30 transition-all shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Left info & image */}
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  {property?.images?.[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.title || "Property"}
                      className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square object-cover rounded-2xl bg-slate-100"
                    />
                  ) : (
                    <div className="w-full sm:w-28 sm:h-28 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                      <Building2 className="w-8 h-8" />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(res.status)}
                      <span className="text-xs text-text-secondary">
                        Submitted on{" "}
                        {new Date(res.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <Link
                      to={property?._id ? `/properties/${property._id}` : "#"}
                      className="text-base sm:text-lg font-bold text-text-main hover:text-primary transition-colors block"
                    >
                      {property?.title || "Property Title"}
                    </Link>

                    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{property?.location?.city || "Morocco"}</span>
                      <span>•</span>
                      <span className="font-semibold text-text-main">
                        {property?.price?.toLocaleString()} MAD / mo
                      </span>
                    </div>

                    {res.message && (
                      <p className="text-xs text-text-secondary italic pt-1 max-w-md line-clamp-1">
                        "{res.message}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                  {property?._id && (
                    <Link
                      to={`/properties/${property._id}`}
                      className="px-4 py-2 rounded-xl border border-border hover:border-primary text-xs font-semibold text-text-main hover:text-primary transition-colors"
                    >
                      View Property
                    </Link>
                  )}

                  {isPending && (
                    <button
                      type="button"
                      onClick={() => handleCancel(res._id)}
                      disabled={cancellingId === res._id}
                      className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-error text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                    >
                      {cancellingId === res._id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Ban className="w-3.5 h-3.5" />
                      )}
                      <span>Cancel Request</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
