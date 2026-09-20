import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoriteThunks";
import toast from "react-hot-toast";

const FavoriteButton = ({
  propertyId,
  className = "",
  iconSize = "w-5 h-5",
  showBg = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { favoriteIds } = useSelector((state) => state.favorites);

  const [loading, setLoading] = useState(false);

  const isFavorited = favoriteIds.includes(propertyId);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to save properties to favorites");
      navigate("/login");
      return;
    }

    if (user?.role === "Owner") {
      toast.error("Favorites are available for tenant accounts");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      if (isFavorited) {
        await dispatch(removeFavorite(propertyId)).unwrap();
        toast.success("Removed from favorites");
      } else {
        await dispatch(addFavorite(propertyId)).unwrap();
        toast.success("Saved to favorites");
      }
    } catch (err) {
      toast.error(err || "Failed to update favorites");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      disabled={loading}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className={`relative inline-flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
        showBg
          ? "w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md shadow-md hover:bg-surface border border-white/60 hover:shadow-lg"
          : "p-2 rounded-full hover:bg-black/5"
      } ${className}`}
    >
      {loading ? (
        <Loader2 className={`${iconSize} text-primary animate-spin`} />
      ) : isFavorited ? (
        <Heart
          className={`${iconSize} fill-error text-error transition-transform scale-110`}
        />
      ) : (
        <Heart
          className={`${iconSize} text-text-main/80 hover:text-error transition-colors`}
        />
      )}
    </button>
  );
};

export default FavoriteButton;
