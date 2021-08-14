// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model.js');

const mw = require('./actions-middlware.js');

const router = express.Router();

router.get('/', (_, res) => {
  Actions.get() 
  .then(actions => {
    res.status(200).json(actions);
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({
      data: []
    });
  });
});

router.get('/:id', mw.validateActionID, (req, res) => {
    res.status(200).json(req.action);
});

router.post('/', mw.validateActionBody, (req, res) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message: "There was an error creating the action"
      });
    });
});

router.put('/:id', mw.validateActionID, mw.validateActionBody, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message: "There was an error updating the action"
      });
    });
});

router.delete('/:id', mw.validateActionID, (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message: "There was an error removing the action"
      });
    });
});

module.exports = router;