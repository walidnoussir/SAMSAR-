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

/*
|--------------------------------------------------------------------------
| Get My Reservations
|--------------------------------------------------------------------------
*/

export const getMyReservations = async (userId) => {
  const reservations = await Reservation.find({
    user: userId,
  })
    .populate("property", "title price propertyType location images status")
    .sort({ createdAt: -1 });

  return reservations;
};

/*
|--------------------------------------------------------------------------
| Cancel Reservation
|--------------------------------------------------------------------------
*/

export const cancelReservation = async (reservationId, userId) => {
  const reservation = await Reservation.findById(reservationId);

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  if (reservation.user.toString() !== userId.toString()) {
    throw new Error("You are not allowed to cancel this reservation");
  }

  if (reservation.status !== "pending") {
    throw new Error("Only pending reservations can be cancelled");
  }

  reservation.status = "cancelled";

  await reservation.save();

  return reservation;
};

/*
|--------------------------------------------------------------------------
| Get Property Reservations
|--------------------------------------------------------------------------
*/

export const getPropertyReservations = async (propertyId, ownerId) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.owner.toString() !== ownerId.toString()) {
    throw new Error("You are not allowed to view these reservations");
  }

  const reservations = await Reservation.find({
    property: propertyId,
  })
    .populate("user", "firstName lastName email phone")
    .populate("property", "title price propertyType location")
    .sort({ createdAt: -1 });

  return reservations;
};

/*
|--------------------------------------------------------------------------
| Accept Reservation
|--------------------------------------------------------------------------
*/

export const acceptReservation = async (reservationId, ownerId) => {
  const reservation =
    await Reservation.findById(reservationId).populate("property");

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  const property = reservation.property;

  if (property.owner.toString() !== ownerId.toString()) {
    throw new Error("You are not allowed to accept this reservation");
  }

  if (reservation.status !== "pending") {
    throw new Error("Only pending reservations can be accepted");
  }

  if (property.status !== "available") {
    throw new Error("This property is no longer available");
  }

  reservation.status = "accepted";
  await reservation.save();

  property.status = "rented";
  await property.save();

  return reservation;
};

/*
|--------------------------------------------------------------------------
| Reject Reservation
|--------------------------------------------------------------------------
*/

export const rejectReservation = async (reservationId, ownerId) => {
  const reservation =
    await Reservation.findById(reservationId).populate("property");

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  const property = reservation.property;

  if (property.owner.toString() !== ownerId.toString()) {
    throw new Error("You are not allowed to reject this reservation");
  }

  if (reservation.status !== "pending") {
    throw new Error("Only pending reservations can be rejected");
  }

  reservation.status = "rejected";

  await reservation.save();

  return reservation;
};
