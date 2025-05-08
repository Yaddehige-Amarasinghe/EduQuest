const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  materials: [{
    materialId: String,
    category: String, // 'readings', 'modules', 'resources'
    completed: { type: Boolean, default: false },
    progress: { type: Number, default: 0 }, // For modules
    completedAt: Date
  }],
  videos: [{
    videoId: String,
    module: String, // 'physics', 'chemistry', etc.
    completed: { type: Boolean, default: false },
    completedAt: Date
  }],
  quizzes: {
    score: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [String],
    lastAttempt: Date
  },
  gamification: {
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Progress', ProgressSchema);