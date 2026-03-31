import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const ensureAdminExists = async () => {
  const username = (process.env.ADMIN_USERNAME || "skprobeauty.makeover@gmail.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "skprobeauty##2002";

  const existingAdmin = await User.findOne({ username });
  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashedPassword });
  console.log("Default admin account created.");
};

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), username: user.username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token, username: user.username });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login", error: error.message });
  }
};
