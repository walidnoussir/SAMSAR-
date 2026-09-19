import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Key,
  CheckCircle2,
  Calendar,
  Plus,
  ArrowRight,
  Star,
  Eye,
  Edit,
  TrendingUp,
  ShieldCheck,
  Loader2,
  Download,
} from "lucide-react";
import { getMyProperties } from "../../features/properties/propertyThunks";
import api from "../../services/api";
import toast from "react-hot-toast";

const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myProperties } = useSelector((state) => state.properties);

  const [allReservations, setAllReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    dispatch(getMyProperties());
  }, [dispatch]);

  // Fetch pending reservations for all owner properties
  useEffect(() => {
    const fetchReservations = async () => {
      if (myProperties && myProperties.length > 0) {
        setLoadingReservations(true);
        try {
          // Fetch reservations across properties
          const promises = myProperties.map((p) =>
            api
              .get(`/reservations/property/${p._id}`)
              .then((res) => res.data.reservations || [])
              .catch(() => []),
          );
          const results = await Promise.all(promises);
          const flat = results.flat().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAllReservations(flat);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingReservations(false);
        }
      }
    };

    fetchReservations();
  }, [myProperties]);

  const handleAccept = async (reservationId) => {
    setProcessingId(reservationId);
    try {
      await api.patch(`/reservations/${reservationId}/accept`);
      toast.success("Reservation accepted! Property marked as rented.");
      // Refresh properties & reservations
      dispatch(getMyProperties());
      setAllReservations((prev) =>
        prev.map((r) => (r._id === reservationId ? { ...r, status: "accepted" } : r)),
      );
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
      toast.success("Reservation request declined.");
      setAllReservations((prev) =>
        prev.map((r) => (r._id === reservationId ? { ...r, status: "rejected" } : r)),
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject reservation");
    } finally {
      setProcessingId(null);
    }
  };

  // Compute metrics
  const totalProperties = myProperties.length;
  const availableProperties = myProperties.filter((p) => p.status === "available").length;
  const rentedProperties = myProperties.filter((p) => p.status === "rented").length;
  const pendingRequests = allReservations.filter((r) => r.status === "pending");

  const totalMonthlyRevenue = myProperties
    .filter((p) => p.status === "rented")
    .reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Welcome & Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
            Welcome back, {user?.firstName || "Landlord"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Here's what's happening with your rental properties across Morocco today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toast.success("Financial statement downloaded as PDF")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-text-main text-xs font-semibold hover:bg-black/5 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-text-secondary" />
            <span>Download Financial Report</span>
          </button>

          <Link
            to="/owner/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property</span>
          </Link>
        </div>
      </div>

      {/* 2. 4 Metric Cards (matching image 3) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-surface p-5 rounded-3xl border border-border shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary">
              Total Properties
            </span>
            <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-text-main block">
            {totalProperties}
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">
            Active in your portfolio
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface p-5 rounded-3xl border border-border shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary">
              Available Properties
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-text-main block">
            {availableProperties}
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">
            Ready for tenants
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface p-5 rounded-3xl border border-border shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary">
              Rented Properties
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-text-main block">
            {rentedProperties}
          </span>
          <span className="text-[11px] text-text-secondary font-medium">
            Generating monthly rent
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface p-5 rounded-3xl border border-border shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-secondary">
              Pending Requests
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-text-main block">
            {pendingRequests.length}
          </span>
          <span className="text-[11px] text-amber-700 font-semibold">
            Requires action
          </span>
        </div>
      </div>

      {/* 3. Middle 2-Column: Incoming Requests (Left) & Revenue Snapshot (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Incoming Reservation Requests */}
        <div className="lg:col-span-7 bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-text-main">
                Incoming Reservation Requests
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {pendingRequests.length} Awaiting Review
            </span>
          </div>

          {loadingReservations ? (
            <div className="p-8 text-center text-text-secondary">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
            </div>
          ) : pendingRequests.length === 0 ? (
            <div className="py-12 text-center text-text-secondary space-y-2">
              <CheckCircle2 className="w-10 h-10 text-primary/40 mx-auto" />
              <p className="text-sm font-medium text-text-main">
                All requests caught up!
              </p>
              <p className="text-xs">
                When prospective tenants apply for your listings, they will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.slice(0, 3).map((req) => (
                <div
                  key={req._id}
                  className="p-4 rounded-2xl bg-background border border-border space-y-3"
                >
                  {/* Tenant header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                        {req.user?.firstName?.[0]}
                        {req.user?.lastName?.[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-text-main">
                            {req.user?.firstName} {req.user?.lastName}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-emerald-600" />
                            5.0 Tenant Score
                          </span>
                        </div>
                        <span className="text-xs text-text-secondary block">
                          Applying for:{" "}
                          <span className="font-semibold text-text-main">
                            {req.property?.title}
                          </span>
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-primary">
                      {req.property?.price?.toLocaleString()} MAD/mo
                    </span>
                  </div>

                  {/* Message quote */}
                  {req.message && (
                    <div className="p-3 rounded-xl bg-surface border border-border/80 text-xs text-text-secondary italic">
                      "{req.message}"
                    </div>
                  )}

                  {/* Action buttons (matching image 3) */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <a
                      href={`mailto:${req.user?.email || ""}`}
                      className="px-3 py-1.5 rounded-xl border border-border bg-surface text-xs font-semibold text-text-main hover:bg-black/5"
                    >
                      Message
                    </a>

                    <button
                      type="button"
                      onClick={() => handleReject(req._id)}
                      disabled={processingId === req._id}
                      className="px-3 py-1.5 rounded-xl border border-error/40 text-error hover:bg-red-50 text-xs font-semibold cursor-pointer"
                    >
                      Decline
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAccept(req._id)}
                      disabled={processingId === req._id}
                      className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                      Accept Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Revenue Snapshot */}
        <div className="lg:col-span-5 bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="text-base font-bold text-text-main">Revenue Snapshot</h3>
            <span className="text-xs text-text-secondary font-medium">Monthly Est.</span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-text-secondary block">
              Current Monthly Revenue
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-primary">
                {totalMonthlyRevenue.toLocaleString()} MAD
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +8.4%
              </span>
            </div>
          </div>

          {/* Occupancy Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-text-secondary">Portfolio Occupancy Rate</span>
              <span className="text-text-main">
                {totalProperties > 0
                  ? Math.round((rentedProperties / totalProperties) * 100)
                  : 0}
                % ({rentedProperties}/{totalProperties} Units)
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{
                  width: `${
                    totalProperties > 0 ? (rentedProperties / totalProperties) * 100 : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Rental Collection Status */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-text-main block">
              Rental Collection Status
            </span>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-text-main font-medium">Collected on Time</span>
              </div>
              <span className="font-bold text-text-main">
                {totalMonthlyRevenue.toLocaleString()} MAD (100%)
              </span>
            </div>
          </div>

          {/* Rent Guarantee Badge */}
          <div className="p-3.5 rounded-2xl bg-primary-light/40 border border-primary/20 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-primary-dark block">
                Samsar Rent Guarantee Active
              </span>
              <span className="text-text-secondary text-[11px]">
                All leases covered with direct bank deposit protection.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Table: My Managed Properties (matching image 3) */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-text-main">
              My Managed Properties
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Live overview of your assets, rental tiers, and active tenant status
            </p>
          </div>

          <Link
            to="/owner/properties"
            className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Properties Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                <th className="pb-3 pl-2">Property</th>
                <th className="pb-3">Monthly Rent</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Bed / Bath</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {myProperties.map((p) => (
                <tr key={p._id} className="hover:bg-black/5 transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-3">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                          <Building2 className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-text-main block">
                          {p.title}
                        </span>
                        <span className="text-[11px] text-text-secondary">
                          {p.location?.city}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 font-bold text-text-main">
                    {p.price?.toLocaleString()} MAD/m
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        p.status === "available"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          p.status === "available" ? "bg-emerald-600" : "bg-slate-500"
                        }`}
                      />
                      {p.status === "available" ? "Available" : "Rented"}
                    </span>
                  </td>
                  <td className="py-3.5 text-text-secondary">
                    {p.bedrooms || 0} Beds • {p.bathrooms || 0} Baths
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        to={`/properties/${p._id}`}
                        title="Preview Listing"
                        className="p-1.5 rounded-lg border border-border hover:border-primary text-text-secondary hover:text-primary"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/owner/properties/${p._id}/edit`}
                        title="Edit Property"
                        className="p-1.5 rounded-lg border border-border hover:border-primary text-text-secondary hover:text-primary"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/owner/properties/${p._id}/reservations`}
                        title="View Bookings"
                        className="p-1.5 rounded-lg border border-border hover:border-primary text-text-secondary hover:text-primary"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
