const serveurService = require('../services/ServeurService');
const { DataCenter } = require('../models/data-center.js');

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

  async addServeur(req, res, next) {
    try {
      const serveur = await serveurService.addServeur(req.body);
      const datacenterId = req.body.datacenterId;
      const updatedDatacenter = await DataCenter.findOneAndUpdate(
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
