import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Ban,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import api from "../../services/api";
import { getPropertyById } from "../../features/properties/propertyThunks";
import toast from "react-hot-toast";

const PropertyReservations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { property } = useSelector((state) => state.properties);

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/reservations/property/${id}`);
      setReservations(data.reservations || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getPropertyById(id));
      fetchReservations();
    }
  }, [id, dispatch]);

  const handleAccept = async (reservationId) => {
    setProcessingId(reservationId);
    try {
      await api.patch(`/reservations/${reservationId}/accept`);
      toast.success("Reservation accepted! Property is now marked as rented.");
      fetchReservations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to accept reservation");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (reservationId) => {
    setProcessingId(reservationId);
    try {
      await api.patch(`/reservations/${reservationId}/reject`);
      toast.success("Reservation declined.");
      fetchReservations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to decline reservation");
    } finally {
      setProcessingId(null);
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
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            <Ban className="w-3.5 h-3.5 text-slate-500" />
            Cancelled by Tenant
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          to="/owner/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Properties</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-main">
          Reservations for {property?.title || "Property"}
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Review tenant applications, communicate directly, or approve lease requests.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        </div>
      ) : reservations.length === 0 ? (
        <div className="bg-surface rounded-3xl border border-border p-16 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-text-main">No reservation requests yet</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Prospective tenants searching for rentals in {property?.location?.city || "Morocco"}{" "}
            will see your listing. When they submit a reservation, it will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => {
            const isPending = res.status === "pending";

            return (
              <div
                key={res._id}
                className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
                      {res.user?.firstName?.[0]}
                      {res.user?.lastName?.[0]}
                    </div>
                    <div>
                      <span className="text-base font-bold text-text-main block">
                        {res.user?.firstName} {res.user?.lastName}
                      </span>
                      <span className="text-xs text-text-secondary">
                        Applied on{" "}
                        {new Date(res.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(res.status)}
                  </div>
                </div>

                {/* Contact information */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary p-3 rounded-2xl bg-background border border-border">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>{res.user?.email || "No email"}</span>
                  </div>
                  {res.user?.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-primary" />
                      <span>{res.user.phone}</span>
                    </div>
                  )}
                </div>

                {/* Message */}
                {res.message && (
                  <div className="p-4 rounded-2xl bg-background border border-border/80 text-xs text-text-main leading-relaxed">
                    <span className="font-bold block text-text-secondary text-[10px] uppercase tracking-wider mb-1">
                      Applicant's Note:
                    </span>
                    "{res.message}"
                  </div>
                )}

                {/* Pending Actions */}
                {isPending && (
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
                    <button
                      type="button"
                      onClick={() => handleReject(res._id)}
                      disabled={processingId === res._id}
                      className="px-4 py-2 rounded-xl border border-error/30 text-error hover:bg-red-50 text-xs font-semibold cursor-pointer"
                    >
                      Decline Request
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAccept(res._id)}
                      disabled={processingId === res._id}
                      className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold shadow-xs cursor-pointer"
                    >
                      Accept & Lease Property
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PropertyReservations;
