const { Serveur } = require('../models/serveur');

class ServeurService {
  async getAllServeurs() {
    return await Serveur.find();
  }

  async getServeurById(id) {
    return await Serveur.findById(id);
  }

  async createServeur(serveur) {
    const newServeur = new Serveur(serveur);
    return await newServeur.save();
  }

  async updateServeur(id, serveur) {
    return await Serveur.findByIdAndUpdate(id, serveur, { new: true });
  }

  async deleteServeur(id) {
    return await Serveur.findByIdAndRemove(id);
  }
}

module.exports = new ServeurService();
