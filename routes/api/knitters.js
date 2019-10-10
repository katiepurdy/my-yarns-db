const { Router } = require('express');
const router = Router();
const Knitter = require('../../models/knitter');

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
  const knitter = new Knitter(req.body);
  knitter.save((err, result) => {
    if (err) return res.status(400).send('Error');
    res.status(200).send(result);
  });
});

// Update a knitter
router.put('/:id', (req, res) => {
  // const id = req.params.id;
  // Knitter.findOneAndUpdate(id);
});

// Delete a knitter
router.delete('/:id', (req, res) => {
  // const id = req.params.id;
  // Knitter.findByIdAndRemove(id);
});

module.exports = router;
