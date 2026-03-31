import nodemailer from "nodemailer";
import { Booking } from "../models/Booking.js";

const maybeSendBookingMail = async (booking) => {
  if (!process.env.SMTP_HOST || !process.env.NOTIFY_TO_EMAIL) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "no-reply@skprobeauty.com",
    to: process.env.NOTIFY_TO_EMAIL,
    subject: "New Booking - SK Pro Beauty Hub",
    text: `New appointment by ${booking.name}\nService: ${booking.service}\nDate: ${booking.date}\nTime: ${booking.time}\nPhone: ${booking.phone}`,
  });
};

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

    const booking = await Booking.create({
      name,
      phone,
      email,
      address,
      service,
      date: new Date(date),
      time,
      description,
    });

    await maybeSendBookingMail(booking);
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
