const { Rack } = require('../models/rack.js');

async function createRack(rack) {
  const newRack = new Rack(rack);
  return await newRack.save();
}

async function getRackById(id) {
  return await Rack.findById(id).populate('Pod');
}

async function getAllRacks() {
  return await Rack.find().populate('Pod');
}

async function updateRack(id, rack) {
  return await Rack.findByIdAndUpdate(id, rack, { new: true });
}

async function deleteRack(id) {
  return await Rack.findByIdAndRemove(id);
}

module.exports = {
  createRack,
  getRackById,
  getAllRacks,
  updateRack,
  deleteRack,
};
