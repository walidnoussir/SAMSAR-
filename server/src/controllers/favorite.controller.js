import * as favoriteService from "../services/favorite.service.js";

/*
|--------------------------------------------------------------------------
| Add Favorite
|--------------------------------------------------------------------------
*/

export const addFavorite = async (req, res, next) => {
  try {
    const favorite = await favoriteService.addFavorite(
      req.user.id,
      req.body.propertyId,
    );

    res.status(201).json({
      success: true,
      message: "Property added to favorites",
      favorite,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Remove Favorite
|--------------------------------------------------------------------------
*/

export const removeFavorite = async (req, res, next) => {
  try {
    await favoriteService.removeFavorite(req.user.id, req.params.propertyId);

    res.status(200).json({
      success: true,
      message: "Property removed from favorites",
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get My Favorites
|--------------------------------------------------------------------------
*/

export const getMyFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteService.getMyFavorites(req.user.id);

    res.status(200).json({
      success: true,
      count: favorites.length,
      favorites,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Check Favorite
|--------------------------------------------------------------------------
*/

export const checkFavorite = async (req, res, next) => {
  try {
    const result = await favoriteService.checkFavorite(
      req.user.id,
      req.params.propertyId,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
