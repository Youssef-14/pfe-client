const { Utilisateur } = require('../models/utilisateur.js');

class UtilisateurService {
  async getAllUtilisateurs() {
    try {
      return await Utilisateur.find({});
    } catch (err) {
      throw err;
    }
  }

  async getUtilisateurById(id) {
    try {
      return await Utilisateur.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async createUtilisateur(data) {
    try {
      const utilisateur = new Utilisateur(data);
      utilisateur.IsAdmin = false;
      return await utilisateur.save();
    } catch (err) {
      throw err;
    }
  }

  async verifUtilisateur(data) {
    try {
      const user = await Utilisateur.findOne({
        "Email":data.Email,
        "Password":data.Password
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
  
  async updateUtilisateur(id, data) {
    try {
      return await Utilisateur.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
      throw err;
    }
  }

  async deleteUtilisateur(id) {
    try {
      return await Utilisateur.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UtilisateurService;
