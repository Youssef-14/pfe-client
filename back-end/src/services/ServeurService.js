const { Serveur } = require('../models/serveur.js');
const { Rack } = require('../models/rack.js');
const { Pod } = require('../models/pod.js');

class ServeurService {
  async getAllServeurs() {
    const serveurs = await Serveur.find();
    return serveurs.map((serveur, index) => {
      const findRack =  Rack.findById(serveur.Rack);
      const Rack = findRack.Nom;
      const Pod =  Pod.findById(findRack.Pod).Libelle;
      return {
        "n": index,
        "rack": Rack,
        "pod": Pod,
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
