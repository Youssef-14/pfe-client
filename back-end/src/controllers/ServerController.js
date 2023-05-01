const serveurService = require('../services/serveur');

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

  async createServeur(req, res, next) {
    try {
      const serveur = await serveurService.createServeur(req.body);
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
