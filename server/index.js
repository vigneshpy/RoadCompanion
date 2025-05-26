import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { planTrip } from './agent/tripPlanner.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Rate limiter middleware: max 5 requests per minute per IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per `window` (here, per minute)
  message: {
    error: 'Too many requests from this IP, please try again after a minute',
  },
});

app.use(limiter); // Apply to all requests

app.post('/plan-trip', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    const result = await planTrip(prompt);
    res.json({ response: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
