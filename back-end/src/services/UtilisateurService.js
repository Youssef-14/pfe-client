const { Utilisateur } = require('../models/utilisateur.js');

class UtilisateurService {
  async getAllUtilisateurs() {
    return await Utilisateur.find({});
  }

  async getUtilisateurById(id) {
    return await Utilisateur.findById(id);
  }

  async createUtilisateur(data) {
    const utilisateur = new Utilisateur(data);
    return await utilisateur.save();
  }

  async verifUtilisateur(data) {
    return await Utilisateur.findOne({ email: data.email, password: data.password });
  }

  async updateUtilisateur(id, data) {
    return await Utilisateur.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUtilisateur(id) {
    return await Utilisateur.findByIdAndDelete(id);
  }
}

module.exports = UtilisateurService;
