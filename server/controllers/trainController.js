import Train from '../models/Train.js';

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const addTrain = async (req, res) => {
  const train = await Train.create(req.body);
  return res.status(201).json(train);
};

export const searchTrains = async (req, res) => {
  const { from, to } = req.query;
  if (!from?.trim() || !to?.trim()) {
    return res.status(400).json({ message: 'Both from and to are required' });
  }

  const fromPattern = new RegExp(`^${escapeRegex(from.trim())}$`, 'i');
  const toPattern = new RegExp(`^${escapeRegex(to.trim())}$`, 'i');

  const trains = await Train.find({
    from: fromPattern,
    to: toPattern
  });
  return res.json(trains);
};
