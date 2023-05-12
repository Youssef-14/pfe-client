const { Rack } = require('../models/rack.js');

class RackService {
  static async createRack(rack) {
    const newRack = new Rack(rack);
    return await newRack.save();
  }

  static async getRackById(id) {
    return await Rack.findById(id).populate('Pod');
  }

  static async getAllRacks() {
    return await Rack.find().populate('Pod');
  }

  static async updateRack(id, rack) {
    return await Rack.findByIdAndUpdate(id, rack, { new: true });
  }

  static async deleteRack(id) {
    return await Rack.findByIdAndRemove(id);
  }
}

module.exports = RackService;
