import Favorite from "../models/Favorite.js";
import Property from "../models/Property.js";

/*
|--------------------------------------------------------------------------
| Add Favorite
|--------------------------------------------------------------------------
*/

export const addFavorite = async (userId, propertyId) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  const existingFavorite = await Favorite.findOne({
    user: userId,
    property: propertyId,
  });

  if (existingFavorite) {
    throw new Error("Property is already in your favorites");
  }

  const favorite = await Favorite.create({
    user: userId,
    property: propertyId,
  });

  return await Favorite.findById(favorite._id).populate(
    "property",
    "title price propertyType location images status",
  );
};

/*
|--------------------------------------------------------------------------
| Remove Favorite
|--------------------------------------------------------------------------
*/

export const removeFavorite = async (userId, propertyId) => {
  const favorite = await Favorite.findOneAndDelete({
    user: userId,
    property: propertyId,
  });

  if (!favorite) {
    throw new Error("Favorite not found");
  }

  return favorite;
};

/*
|--------------------------------------------------------------------------
| Get My Favorites
|--------------------------------------------------------------------------
*/

export const getMyFavorites = async (userId) => {
  const favorites = await Favorite.find({ user: userId })
    .populate("property", "title price propertyType location images status bedrooms bathrooms surface owner")
    .sort({ createdAt: -1 });

  return favorites;
};

/*
|--------------------------------------------------------------------------
| Check Favorite
|--------------------------------------------------------------------------
*/

export const checkFavorite = async (userId, propertyId) => {
  const favorite = await Favorite.findOne({
    user: userId,
    property: propertyId,
  });

  return { isFavorited: !!favorite };
};
