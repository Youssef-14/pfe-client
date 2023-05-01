const rackService = require('../services/RackService');

async function createRack(req, res, next) {
  try {
    const newRack = await rackService.createRack(req.body);
    res.json(newRack);
  } catch (error) {
    next(error);
  }
}

async function getRackById(req, res, next) {
  try {
    const rack = await rackService.getRackById(req.params.id);
    if (rack) {
      res.json(rack);
    } else {
      res.status(404).json({ message: 'Rack not found' });
    }
  } catch (error) {
    next(error);
  }
}

async function getAllRacks(req, res, next) {
  try {
    const racks = await rackService.getAllRacks();
    res.json(racks);
  } catch (error) {
    next(error);
  }
}

async function updateRack(req, res, next) {
  try {
    const updatedRack = await rackService.updateRack(req.params.id, req.body);
    res.json(updatedRack);
  } catch (error) {
    next(error);
  }
}

async function deleteRack(req, res, next) {
  try {
    await rackService.deleteRack(req.params.id);
    res.json({ message: 'Rack deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createRack,
  getRackById,
  getAllRacks,
  updateRack,
  deleteRack,
};
