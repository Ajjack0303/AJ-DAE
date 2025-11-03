module.exports = {
  getProjects: (req, res) => res.json({ message: 'Get projects working (dummy response)' }),
  createProject: (req, res) => res.json({ message: 'Create project working (dummy response)' }),
  updateProject: (req, res) => res.json({ message: `Update project ${req.params.id} working (dummy response)` }),
  deleteProject: (req, res) => res.json({ message: `Delete project ${req.params.id} working (dummy response)` })
};
