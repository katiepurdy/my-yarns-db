const { Router } = require('express');
const router = Router();
const { Knitter, validate } = require('../../models/knitter');

router.get('/', (req, res) => {
  Knitter.find({}, (err, knitters) => {
    if (err) return res.status(400).send('Error');
    res.status(200).send(knitters);
  });
});

router.get('/:id', (req, res) => {
  Knitter.findById(id, (err, knitter) => {
    if (err || !knitter)
      return res
        .status(404)
        .send(`${knitter} A knitter with the id ${id} was not found.`);
    res.status(200).send(knitter);
  });
});

router.post('/', (req, res) => {
  // If an ID is included, make sure it's unique before continuing
  if (req.body._id) {
    Knitter.findById({ _id: req.body._id }, err => {
      if (err) {
        return res.status(400).send(err);
      }
      res.sendStatus(422); // Unprocessable Entity when the ID is not unique
    });
  } else {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const newKnitter = new Knitter(req.body);
    newKnitter.save((err, result) => {
      if (err) return res.status(400).send(err);
      res.status(201).send(result);
    });
  }
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedKnitter = req.body;
  const { error } = validate(updatedKnitter);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  Knitter.findByIdAndUpdate(id, updatedKnitter, (err, knitter) => {
    if (err || !knitter) {
      return res.status(404).send(`A knitter with the id ${id} was not found.`);
    }
    res.status(200).send(updatedKnitter);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Knitter.findByIdAndRemove(id, (err, knitter) => {
    if (err || !knitter)
      return res.status(404).send(`A knitter with the id ${id} was not found.`);
    res.status(204);
  });
});

module.exports = router;
