// add middlewares here related to projects
const Projects = require('./projects-model.js');

const validateProjectID = async (req, res, next) => {
  const  { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (!project) {
      return res.status(404).json({
        message: `Project not found with id: ${id}!`
      });
    } else {
      req.project = project;
      next();
    } 
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

function validateProjectBody(req, res, next) {
  if(!req.body.name || !req.body.description) {
    return res.status(400).json({
      message: 'Please provide a name and description for the project!'
    });
  } else {
    next();
  }
}


// Add middlewares to the project route
module.exports = {
  validateProjectID,
  validateProjectBody
};