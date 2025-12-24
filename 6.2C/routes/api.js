import express from 'express';
import { add } from '../utils/calculator.js';

const router = express.Router();

router.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  res.json({ result: add(a, b) });
});

export default router;
