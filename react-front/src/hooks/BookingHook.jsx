import { useState, useEffect } from "react";
import { BookingAPI } from "../api/BookingAPI";

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const data = await BookingAPI.getAll();
      setBookings(data);
    } catch {
      setError("Failed to fetch bookings");
    }
    setLoading(false);
  };

  const createBooking = async (data) => {
    try {
      await BookingAPI.create(data);
      fetchBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await BookingAPI.delete(id);
      fetchBookings();
    } catch {
      setError("Failed to delete");
    }
  };

  const assignSchedule = async (bookingID, scheduleID) => {
    try {
      await BookingAPI.assignSchedule(bookingID, scheduleID);
      fetchBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    createBooking,
    deleteBooking,
    fetchBookings,
    assignSchedule,
  };
};

export const useBookingHistory = (customerID) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    if (!customerID) return;
    setLoading(true);

    const data = await BookingAPI.getByCustomer(customerID);
    setBookings(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [customerID]);

  return { bookings, setBookings, loading, fetchHistory }; // ⭐ MUST RETURN fetchHistory
};
