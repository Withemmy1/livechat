import express from 'express';
import { protect } from '../middleware/auth';
import { User } from '../models/User';

const router = express.Router();

// Get widget settings
router.get('/settings', protect, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id).select('widgetSettings apiKey');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching widget settings' });
  }
});

// Update widget settings
router.put('/settings', protect, async (req: any, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { widgetSettings: req.body },
      { new: true }
    ).select('widgetSettings');
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating widget settings' });
  }
});

// Generate new API key
router.post('/regenerate-key', protect, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.apiKey = crypto.randomUUID();
    await user.save();
    
    res.json({ apiKey: user.apiKey });
  } catch (error) {
    res.status(400).json({ message: 'Error regenerating API key' });
  }
});

export default router;