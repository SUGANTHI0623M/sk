import { Booking } from "../models/Booking.js";
import { User } from "../models/User.js";

export const createBooking = async (req, res) => {
  try {
    const { name, phone, email, address, service, date, time, description } = req.body;

    if (!name || !phone || !email || !address || !service || !date || !time) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const existingBooking = await Booking.findOne({
      date: new Date(date),
      time,
    });

    if (existingBooking) {
      return res.status(409).json({ message: "Selected date/time slot is already booked." });
    }

    const adminUsername = (process.env.ADMIN_USERNAME || "skprobeauty.makeover@gmail.com").toLowerCase();
    const adminUser = await User.findOne({ username: adminUsername });

    const booking = await Booking.create({
      name,
      phone,
      email,
      address,
      service,
      date: new Date(date),
      time,
      description,
      createdBy: adminUser?._id,
    });

    return res.status(201).json({ message: "Booking created successfully.", booking });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Selected date/time slot is already booked." });
    }
    return res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

export const getBookings = async (_req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1, time: 1 });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    return res.json({ message: "Booking deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete booking", error: error.message });
  }
};
