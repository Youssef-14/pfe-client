const { Serveur } = require('../models/serveur.js');

class ServeurService {
  async getAllServeurs() {
    const serveurs = await Serveur.find();
    return serveurs.map((serveur, index) => {
      return {
        "n": index,
        ...serveur.toObject()
      };
    });
  }


  async getServeurById(id) {
    return await Serveur.findById(id);
  }

  async getServeurByRackId(id) {
    return await Serveur.find({ Rack: id });
  }

  async addServeur(serveur) {
    try {
      const newServeur = new Serveur(serveur);
      return await newServeur.save();
    } catch (err) {
      console.log(err);
    }
  }

  async updateServeur(id, serveur) {
    return await Serveur.findByIdAndUpdate(id, serveur, { new: true });
  }

  async deleteServeur(id) {
    return await Serveur.findByIdAndRemove(id);
  }
}

module.exports = new ServeurService();
