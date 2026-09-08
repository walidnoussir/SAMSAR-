import Reservation from "../models/Reservation.js";
import Property from "../models/Property.js";

/*
|--------------------------------------------------------------------------
| Create Reservation
|--------------------------------------------------------------------------
*/

export const createReservation = async (userId, propertyId, message = "") => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.status !== "available") {
    throw new Error("This property is not available for reservation");
  }

  const existingReservation = await Reservation.findOne({
    user: userId,
    property: propertyId,
    status: {
      $in: ["pending", "accepted"],
    },
  });

  if (existingReservation) {
    throw new Error("You already have an active reservation for this property");
  }

  const reservation = await Reservation.create({
    user: userId,
    property: propertyId,
    message,
  });

  return await Reservation.findById(reservation._id)
    .populate("user", "firstName lastName email")
    .populate("property", "title price propertyType location images");
};
