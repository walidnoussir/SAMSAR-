import * as propertyService from "../services/property.service.js";
import cloudinary from "../config/cloudinary.js";

/*
|--------------------------------------------------------------------------
| Upload Property Images
|--------------------------------------------------------------------------
|
| Receives image files from multer (memory storage), streams each one to
| Cloudinary and returns the hosted secure URLs.
|--------------------------------------------------------------------------
*/

const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "samsar/properties",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );

    stream.end(file.buffer);
  });

export const uploadPropertyImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one image to upload",
      });
    }

    const urls = await Promise.all(req.files.map(uploadToCloudinary));

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      urls,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Create Property
|--------------------------------------------------------------------------
*/

export const createProperty = async (req, res, next) => {
  try {
    const property = await propertyService.createProperty(
      req.body,
      req.user.id,
    );

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get All Properties
|--------------------------------------------------------------------------
*/

export const getAllProperties = async (req, res, next) => {
  try {
    const { properties, pagination } = await propertyService.getAllProperties(
      req.query,
    );

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Property By ID
|--------------------------------------------------------------------------
*/

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get My Properties
|--------------------------------------------------------------------------
*/

export const getMyProperties = async (req, res, next) => {
  try {
    const properties = await propertyService.getPropertiesByOwner(req.user.id);

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Property
|--------------------------------------------------------------------------
*/

export const updateProperty = async (req, res, next) => {
  try {
    const property = await propertyService.updateProperty(
      req.params.id,
      req.user.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Property
|--------------------------------------------------------------------------
*/

export const deleteProperty = async (req, res, next) => {
  try {
    await propertyService.deleteProperty(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
