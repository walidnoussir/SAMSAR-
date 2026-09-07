import Property from "../models/Property.js";

/*
|--------------------------------------------------------------------------
| Create Property
|--------------------------------------------------------------------------
*/

export const createProperty = async (propertyData, ownerId) => {
  const property = await Property.create({
    ...propertyData,
    owner: ownerId,
  });

  return property;
};

/*
|--------------------------------------------------------------------------
| Get All Properties
|--------------------------------------------------------------------------
*/

export const getAllProperties = async (filters = {}) => {
  const { city, propertyType } = filters;

  const query = {};

  // Search by city
  if (city) {
    query["location.city"] = {
      $regex: city,
      $options: "i",
    };
  }

  // filter by property type
  if (propertyType) {
    query.propertyType = propertyType;
  }

  const properties = await Property.find(query)
    .populate("owner", "firstName lastName email")
    .sort({ createdAt: -1 });

  return properties;
};

/*
|--------------------------------------------------------------------------
| Get Property By ID
|--------------------------------------------------------------------------
*/

export const getPropertyById = async (propertyId) => {
  const property = await Property.findById(propertyId).populate(
    "owner",
    "firstName lastName email",
  );

  if (!property) {
    throw new Error("Property not found");
  }

  return property;
};

/*
|--------------------------------------------------------------------------
| Get Properties By Owner
|--------------------------------------------------------------------------
*/

export const getPropertiesByOwner = async (ownerId) => {
  const properties = await Property.find({
    owner: ownerId,
  }).sort({ createdAt: -1 });

  return properties;
};

/*
|--------------------------------------------------------------------------
| Update Property
|--------------------------------------------------------------------------
*/

export const updateProperty = async (propertyId, ownerId, propertyData) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.owner.toString() !== ownerId.toString()) {
    throw new Error("You are not allowed to update this property");
  }

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData,
    {
      new: true,
      runValidators: true,
    },
  ).populate("owner", "firstName lastName email");

  return updatedProperty;
};

/*
|--------------------------------------------------------------------------
| Delete Property
|--------------------------------------------------------------------------
*/

export const deleteProperty = async (propertyId, ownerId) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.owner.toString() !== ownerId.toString()) {
    throw new Error("You are not allowed to delete this property");
  }

  await Property.findByIdAndDelete(propertyId);

  return property;
};
