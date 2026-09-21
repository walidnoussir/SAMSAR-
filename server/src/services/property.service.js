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

/*
|--------------------------------------------------------------------------
| Moroccan City Accent-Insensitive Regex Builder
|--------------------------------------------------------------------------
| Allows queries like "Beni Mellal" to match "Béni Mellal", "Kenitra" to
| match "Kénitra", and handles common transliterations like Fez / Fès.
|--------------------------------------------------------------------------
*/
const buildAccentInsensitiveRegex = (text) => {
  if (!text) return "";
  let pattern = text.trim();

  // Handle known Moroccan city transliterations before char expansion
  if (/^f[eéèêë][sz]$/i.test(pattern)) {
    return "F[eéèêë][sz]";
  }
  if (/^marrak[ec]sh?$/i.test(pattern)) {
    return "Marrak[ec]sh?";
  }

  // Escape special regex characters except for word boundaries
  pattern = pattern.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

  // Map letters to character classes matching accented variants
  const charMap = {
    a: "[aàâäáAÀÂÄÁ]",
    e: "[eéèêëEÉÈÊË]",
    i: "[iîïíIÎÏÍ]",
    o: "[oôöóOÔÖÓ]",
    u: "[uùûüúUÙÛÜÚ]",
    c: "[cçCÇ]",
  };

  return pattern
    .replace(/[aàâäá]/gi, charMap.a)
    .replace(/[eéèêë]/gi, charMap.e)
    .replace(/[iîïí]/gi, charMap.i)
    .replace(/[oôöó]/gi, charMap.o)
    .replace(/[uùûüú]/gi, charMap.u)
    .replace(/[cç]/gi, charMap.c);
};

export const getAllProperties = async (filters = {}) => {
  const {
    city,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    minSurface,
    maxSurface,
    status,
    sort,
    page,
    limit,
  } = filters;

  const query = {};

  // Search by city (accent-insensitive & alias-aware)
  if (city) {
    const cityPattern = buildAccentInsensitiveRegex(city);
    query["location.city"] = {
      $regex: cityPattern,
      $options: "i",
    };
  }

  // filter by property type
  if (propertyType) {
    query.propertyType = propertyType;
  }

  // filter by price
  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  // filter by bedrooms & bathrooms
  if (bedrooms) {
    query.bedrooms = Number(bedrooms);
  }

  if (bathrooms) {
    query.bathrooms = Number(bathrooms);
  }

  // filter by surface
  if (minSurface || maxSurface) {
    query.surface = {};

    if (minSurface) {
      query.surface.$gte = Number(minSurface);
    }

    if (maxSurface) {
      query.surface.$lte = Number(maxSurface);
    }
  }

  // filter by status
  if (status) {
    query.status = status;
  }

  //===========================// Sorting //============================//
  let sortOption = { createdAt: -1 };

  if (sort === "priceAsc") {
    sortOption = { price: 1 };
  }

  if (sort === "priceDesc") {
    sortOption = { price: -1 };
  }

  if (sort === "newest") {
    sortOption = { createdAt: -1 };
  }

  //=============================Pagination==========================//
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;

  const skip = (pageNumber - 1) * limitNumber;

  const properties = await Property.find(query)
    .populate("owner", "firstName lastName email")
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber);

  const total = await Property.countDocuments(query);

  return {
    properties,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
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
