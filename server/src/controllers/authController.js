import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const ensureAdminExists = async () => {
  const username = (process.env.ADMIN_USERNAME || "skprobeauty.makeover@gmail.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "skprobeauty##2002";

  const hashedPassword = await bcrypt.hash(password, 10);

  // Always reset admin user to match current env credentials
  await User.deleteMany({ username });
  await User.create({ username, password: hashedPassword });
  console.log("Default admin account reset from env.");
};

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("[ADMIN_LOGIN] Incoming login attempt", {
      usernameRaw: username,
      usernameLower: username?.toLowerCase(),
    });

    if (!username || !password) {
      console.log("[ADMIN_LOGIN] Missing username or password");
      return res.status(400).json({ message: "Username and password are required." });
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      console.log("[ADMIN_LOGIN] User not found for username", username.toLowerCase());
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("[ADMIN_LOGIN] Password mismatch for user", user.username);

      // Safety valve: if password matches current ADMIN_PASSWORD, refresh hash and allow login
      const envPassword = process.env.ADMIN_PASSWORD || "skprobeauty##2002";
      if (password === envPassword) {
        console.log("[ADMIN_LOGIN] Raw password matches ADMIN_PASSWORD env, refreshing stored hash.");
        const newHash = await bcrypt.hash(envPassword, 10);
        user.password = newHash;
        await user.save();
      } else {
        return res.status(401).json({ message: "Invalid credentials." });
      }
    }

    const token = jwt.sign(
      { userId: user._id.toString(), username: user.username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("[ADMIN_LOGIN] Successful login for", user.username);

    return res.json({ token, username: user.username });
  } catch (error) {
    console.error("[ADMIN_LOGIN] Error during login", error);
    return res.status(500).json({ message: "Failed to login", error: error.message });
  }
};
