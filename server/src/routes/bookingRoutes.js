import { Router } from "express";
import { createBooking, deleteBooking, getBookings } from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", createBooking);
router.get("/", verifyToken, getBookings);
router.delete("/:id", verifyToken, deleteBooking);

export default router;
