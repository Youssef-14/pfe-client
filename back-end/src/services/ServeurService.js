const { Serveur } = require('../models/serveur.js');

class ServeurService {
  async getAllServeurs() {
    return await Serveur.find();
  }

  async getServeurById(id) {
    return await Serveur.findById(id);
  }

  async getServeurByDataCenterId(id) {
    return await Serveur.find({ DataCenter: id });
  }

  async addServeur(serveur) {
    try{
      const newServeur = new Serveur(serveur);
      return await newServeur.save();
    }catch(err){
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
