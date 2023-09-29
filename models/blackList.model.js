import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
  token: String,
  userId: String,
  reason: String,
  createdAt: { type: Date, default: Date.now },
});

export const blackListToken = new mongoose.model("blackListToken",blackListTokenSchema);