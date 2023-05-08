const serveurService = require('../services/ServeurService');
const { DataCenter } = require('../models/data-center.js');
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
      if (!mongoose.Types.ObjectId.isValid(req.body.DataCenter)) {
        res.status(400).json({ message: 'Invalid DataCenter ID' });
        return;
      }
      const finddatacenter = await DataCenter.findById(req.body.DataCenter);
      if (!finddatacenter) {
        res.status(404).json({ message: 'Invalid DataCenter ID' });
        return;
      }
      const serveur = await serveurService.addServeur(req.body);
      const datacenterId = req.body.DataCenter;
      await DataCenter.findOneAndUpdate(
        { _id: datacenterId },
        { $push: { serveurs: serveur._id } },
        { new: true }
      );
      res.status(201).json(serveur);
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
      await serveurService.deleteServeur(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ServeurController();
