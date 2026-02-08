import Train from '../models/Train.js';

export const addTrain = async (req, res) => {
  const train = await Train.create(req.body);
  return res.status(201).json(train);
};

export const searchTrains = async (req, res) => {
  const { from, to } = req.query;
  const trains = await Train.find({
    from: new RegExp(`^${from}$`, 'i'),
    to: new RegExp(`^${to}$`, 'i')
  });
  return res.json(trains);
};
