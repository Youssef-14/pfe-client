const serveurService = require('../services/ServeurService');
const { Rack } = require('../models/rack.js');
const mongoose = require('mongoose');

class ServeurController {
  async getAllServeurs(req, res, next) {
    try {
      const serveurs = await serveurService.getAllServeurs();
      res.json(serveurs);
    } catch (err) {
      next(err);
    }
  }

  async getServeurById(req, res, next) {
    try {
      const serveur = await serveurService.getServeurById(req.params.id);
      res.json(serveur);
    } catch (err) {
      next(err);
    }
  }

  async getServeurByDataCenterId(req, res, next) {
    try {
      const serveurs = await serveurService.getServeurByDataCenterId(req.params.id);
      res.json(serveurs);
    } catch (err) {
      next(err);
    }
  }

  async addServeur(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.body.Rack)) {
        res.status(400).json({ message: 'Invalid Rack ID' });
        return;
      }
      const findRack = await Rack.findById(req.body.Rack);
      if (!findRack) {
        res.status(400).json({ message: 'Invalid Rack ID' });
        return;
      }
      const serveur = await serveurService.addServeur(req.body);
      await Rack.findOneAndUpdate(
        { _id: req.body.Rack },
        { $push: { serveurs: serveur._id } },
        { new: true }
      );
      res.status(201).json({ message:"serveur created successfully"});
    } catch (err) {
      next(err);
    }
  }

  async updateServeur(req, res, next) {
    try {
      const serveur = await serveurService.updateServeur(req.params.id, req.body);
      res.json(serveur);
    } catch (err) {
      next(err);
    }
  }

  async deleteServeur(req, res, next) {
    try {
      const rackId = await serveurService.getServeurById(req.params.id).Rack;
      await Rack.findOneAndUpdate(
        { _id: rackId },
        { $pull: { serveurs: req.params.id } },
        { new: true }
      );
      await serveurService.deleteServeur(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ServeurController();