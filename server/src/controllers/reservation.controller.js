import * as reservationService from "../services/reservation.service.js";

/*
|--------------------------------------------------------------------------
| Create Reservation
|--------------------------------------------------------------------------
*/

export const createReservation = async (req, res, next) => {
  try {
    const { propertyId, message } = req.body;

    const reservation = await reservationService.createReservation(
      req.user.id,
      propertyId,
      message,
    );

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get My Reservations
|--------------------------------------------------------------------------
*/

export const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getMyReservations(
      req.user.id,
    );

    res.status(200).json({
      success: true,
      count: reservations.length,
      reservations,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Cancel Reservation
|--------------------------------------------------------------------------
*/

export const cancelReservation = async (req, res, next) => {
  try {
    const reservation = await reservationService.cancelReservation(
      req.params.id,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      message: "Reservation cancelled successfully",
      reservation,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Property Reservations
|--------------------------------------------------------------------------
*/

export const getPropertyReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getPropertyReservations(
      req.params.propertyId,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      count: reservations.length,
      reservations,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Accept Reservation
|--------------------------------------------------------------------------
*/

export const acceptReservation = async (req, res, next) => {
  try {
    const reservation = await reservationService.acceptReservation(
      req.params.id,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      message: "Reservation accepted successfully",
      reservation,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Reject Reservation
|--------------------------------------------------------------------------
*/

export const rejectReservation = async (req, res, next) => {
  try {
    const reservation = await reservationService.rejectReservation(
      req.params.id,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      message: "Reservation rejected successfully",
      reservation,
    });
  } catch (error) {
    next(error);
  }
};
