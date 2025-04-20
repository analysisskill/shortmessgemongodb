import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  message: { type: String, required: true, maxlength: 200 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
