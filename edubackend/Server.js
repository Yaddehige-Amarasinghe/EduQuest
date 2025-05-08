require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Payment = require("./models/paymentModel");
const Progress = require("./Models/progress");
const { sendWelcomeEmail, sendResetPasswordEmail, sendPaymentSuccessEmail } = require("./emailService");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware to Authenticate JWT Token
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access denied. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// User Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Initialize progress for new user
    const newProgress = new Progress({ userId: newUser._id });
    await newProgress.save();

    await sendWelcomeEmail(email, name);
    res.status(201).json({ message: "User registered successfully. Welcome email sent!" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Error signing up", error: err.message });
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// Get User Profile with Progress
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const progress = await Progress.findOne({ userId: req.user.id });
    res.status(200).json({ ...user.toObject(), progress });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
});

// Update Material Progress
app.post("/progress/materials", authenticateToken, async (req, res) => {
  try {
    const { materialId, category, completed, progress } = req.body;
    const progressDoc = await Progress.findOne({ userId: req.user.id });

    const materialIndex = progressDoc.materials.findIndex(m => m.materialId === materialId);
    if (materialIndex >= 0) {
      progressDoc.materials[materialIndex] = {
        ...progressDoc.materials[materialIndex],
        completed: completed || progressDoc.materials[materialIndex].completed,
        progress: progress || progressDoc.materials[materialIndex].progress,
        completedAt: completed ? new Date() : progressDoc.materials[materialIndex].completedAt
      };
    } else {
      progressDoc.materials.push({ materialId, category, completed, progress, completedAt: completed ? new Date() : null });
    }

    progressDoc.gamification.points += completed ? 10 : 0;
    await progressDoc.save();
    res.status(200).json({ message: "Material progress updated" });
  } catch (err) {
    console.error("Material Progress Error:", err);
    res.status(500).json({ message: "Error updating material progress", error: err.message });
  }
});

// Update Video Progress
app.post("/progress/videos", authenticateToken, async (req, res) => {
  try {
    const { videoId, module, completed } = req.body;
    const progressDoc = await Progress.findOne({ userId: req.user.id });

    const videoIndex = progressDoc.videos.findIndex(v => v.videoId === videoId);
    if (videoIndex >= 0) {
      progressDoc.videos[videoIndex] = {
        ...progressDoc.videos[videoIndex],
        completed,
        completedAt: completed ? new Date() : progressDoc.videos[videoIndex].completedAt
      };
    } else {
      progressDoc.videos.push({ videoId, module, completed, completedAt: completed ? new Date() : null });
    }

    progressDoc.gamification.points += completed ? 10 : 0;
    if (progressDoc.videos.filter(v => v.module === module && v.completed).length === 4) {
      progressDoc.gamification.badges.push(`${module} Module Master`);
      progressDoc.gamification.points += 20;
    }
    await progressDoc.save();
    res.status(200).json({ message: "Video progress updated" });
  } catch (err) {
    console.error("Video Progress Error:", err);
    res.status(500).json({ message: "Error updating video progress", error: err.message });
  }
});

// Update Quiz Progress
app.post("/progress/quizzes", authenticateToken, async (req, res) => {
  try {
    const { score, points, level, badges } = req.body;
    const progressDoc = await Progress.findOne({ userId: req.user.id });

    progressDoc.quizzes = {
      score,
      points,
      level,
      badges,
      lastAttempt: new Date()
    };
    progressDoc.gamification.points += points;
    progressDoc.gamification.level = level;
    progressDoc.gamification.badges = [...new Set([...progressDoc.gamification.badges, ...badges])];
    await progressDoc.save();
    res.status(200).json({ message: "Quiz progress updated" });
  } catch (err) {
    console.error("Quiz Progress Error:", err);
    res.status(500).json({ message: "Error updating quiz progress", error: err.message });
  }
});

// Password Reset Request
app.post("/reset-password-request", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendResetPasswordEmail(email, resetLink);
    res.status(200).json({ message: "Password reset email sent. Check your inbox!" });
  } catch (err) {
    console.error("Password Reset Request Error:", err);
    res.status(500).json({ message: "Error processing request", error: err.message });
  }
});

// Password Reset
app.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: "Token and new password are required" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password Reset Error:", err);
    res.status(500).json({ message: "Error resetting password", error: err.message });
  }
});

// Payment Processing
app.post("/payment", async (req, res) => {
  try {
    const { cardNumber, cardHolderName, expiryDate, cvv, emailAddress } = req.body;
    if (!cardNumber || !cardHolderName || !expiryDate || !cvv || !emailAddress) {
      return res.status(400).json({ message: "All payment fields are required" });
    }

    const payment = new Payment({ cardNumber, cardHolderName, expiryDate, cvv, emailAddress });
    await payment.save();

    await sendPaymentSuccessEmail(emailAddress, cardHolderName, { cardNumber, cardHolderName, expiryDate, cvv });
    res.status(200).json({ message: "Payment processed successfully", transactionId: payment._id, status: "completed" });
  } catch (err) {
    console.error("Payment Processing Error:", err);
    res.status(500).json({ message: "Error processing payment", error: err.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));