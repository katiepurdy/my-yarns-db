const { Router } = require('express');
const router = Router();
const Knitter = require('../../models/knitter');
const validator = require('../../validator');

// Get all knitters
router.get('/', (req, res) => {
  Knitter.find({}, (err, knitters) => {
    if (err) return res.status(400).send('Error');
    res.send(knitters);
  });
});

// Get one knitter
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Knitter.findById(id, (err, knitter) => {
    if (err || !knitter)
      return res.status(404).send(`A knitter with the id ${id} was not found.`);
    res.send(knitter);
  });
});

// Create a knitter
router.post('/', (req, res) => {
  const { error } = validator.validateKnitter(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newKnitter = new Knitter(req.body);
  newKnitter.save((err, result) => {
    if (err) return res.status(400).send('Error');
    res.status(201).send(result);
  });
});

// Update a knitter
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedKnitter = req.body;
  const { error } = validator.validateKnitter(updatedKnitter);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  Knitter.findByIdAndUpdate(
    id,
    updatedKnitter,
    { new: true },
    (err, knitter) => {
      if (err || !knitter)
        return res
          .status(404)
          .send(`A knitter with the id ${id} was not found.`);
      res.status(200).send(knitter);
    }
  );
});

// Delete a knitter
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Knitter.findByIdAndRemove(id, (err, knitter) => {
    if (err || !knitter)
      return res.status(404).send(`A knitter with the id ${id} was not found.`);
    res.status(204);
  });
});

module.exports = router;
