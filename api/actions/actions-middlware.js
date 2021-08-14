// add middlewares here related to actions
const Actions = require('./actions-model.js');

const validateActionID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    if (!action) {
      return res.status(404).json({
        message: `Action not found with id: ${id}`
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

function validateActionBody(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    return res.status(400).json({
      message: 'Please provide a project ID, description and notes for the new action!'
    });
  } else {
    next();
  }
}

module.exports = {
  validateActionID,
  validateActionBody
};