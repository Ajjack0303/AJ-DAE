module.exports = {
  getClients: (req, res) => res.json({ message: 'Get clients working (dummy response)' }),
  createClient: (req, res) => res.json({ message: 'Create client working (dummy response)' }),
  updateClient: (req, res) => res.json({ message: `Update client ${req.params.id} working (dummy response)` }),
  deleteClient: (req, res) => res.json({ message: `Delete client ${req.params.id} working (dummy response)` })
};
