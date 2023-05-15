const { Serveur } = require('../models/serveur.js');

class ServeurService {
  async getAllServeurs() {
    const serveurs = await Serveur.find().populate({
      path: 'Rack',
      populate: { path: 'Pod', select: 'Libelle' },
      select: 'Nom'
    });
  
    const serveurObjects = await Promise.all(serveurs.map(async (serveur, index) => {
      const { Rack } = serveur;
      const pod = Rack.Pod.Libelle;
      const rack = Rack.Nom;
      const serveurObject = { n: index,  ...serveur.toObject() , rack, pod};
      return serveurObject;
    }));
  
    return serveurObjects;
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
