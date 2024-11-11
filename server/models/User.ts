import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  apiKey: {
    type: String,
    unique: true,
    default: () => crypto.randomUUID(),
  },
  widgetSettings: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    position: {
      type: String,
      enum: ['left', 'right'],
      default: 'right',
    },
    primaryColor: {
      type: String,
      default: '#0066FF',
    },
    greeting: {
      type: String,
      default: 'Hi there! How can we help you today?',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);