// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model.js');

const mw = require('./projects-middleware.js');
const router = express.Router();

router.get('/', (_, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        data: []
      });
    });
});

router.get('/:id', mw.validateProjectID, (req, res) => {
  res.status(200).json(req.project)
});

router.post('/', mw.validateProjectBody, (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({message: "There was an error creating the project"})
    })
});

router.put('/:id', mw.validateProjectID, mw.validateProjectBody, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({message: "There was an error updating the project"})
    })
});

router.delete('/:id', mw.validateProjectID, (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error deleting the project"})
    })
});

router.get('/:id/actions', mw.validateProjectID, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error getting the project actions"})
    })
});

module.exports = router;
