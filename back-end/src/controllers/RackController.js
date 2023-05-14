const { Pod } = require('../models/pod');
const RackService = require('../services/RackService');
const mongoose = require('mongoose');

class RackController {
  static async createRack(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.body.Pod)) {
        res.status(400).json({ message: 'Invalid Pod ID' });
        return;
      }
      
      const podId = req.body.Pod;
      const findpod = await Pod.findById(req.body.Pod);
      if (!findpod) {
        res.status(404).json({ message: 'Invalid Pod ID' });
        return;
      }
      const newRack = await RackService.createRack(req.body);
        await Pod.findOneAndUpdate(
          { _id: podId },
          { $push: { Racks: newRack._id } },
          { new: true }
        );
      res.status(201).send({ message:"rack created successfully"});
    } catch (error) {
      next(error);
    }
  }

  static async getRackById(req, res, next) {
    try {
      const rack = await RackService.getRackById(req.params.id);
      if (rack) {
        res.json(rack);
      } else {
        res.status(404).json({ message: 'Rack not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllRacks(req, res, next) {
    try {
      const racks = await RackService.getAllRacks();
      res.json(racks);
    } catch (error) {
      next(error);
    }
  }

  static async updateRack(req, res, next) {
    try {
      const updatedRack = await RackService.updateRack(req.params.id, req.body);
      res.json(updatedRack);
    } catch (error) {
      next(error);
    }
  }

  static async deleteRack(req, res, next) {
    try {
      const pod = await RackService.getRackById(req.params.id);
      const podId=pod.Pod;
      const ch=await Pod.findOneAndUpdate(
        { _id: podId },
        { $pull: { Racks: req.params.id } },
        { new: true }
      );
      console.log(ch);
      await RackService.deleteRack(req.params.id);
      res.json({ message: 'Rack deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RackController;
