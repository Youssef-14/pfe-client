const { Serveur } = require('../models/serveur.js');
const { Rack } = require('../models/rack.js');
const { Pod } = require('../models/pod.js');
const RackService = require('../services/RackService');

class ServeurService {
  async getAllServeurs() {
    const serveurs = await Serveur.find();
     return serveurs.map( (serveur, index) => {
      const findRack =  RackService.getRackById(serveur.Rack);
      const rack = findRack.Nom;
      const pod =  Pod.findById(findRack.Pod).Libelle;
      console.log(findRack);
      console.log(pod);
      console.log(rack);
      return {
        "n": index,
        "rack": rack,
        "pod": pod,
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
