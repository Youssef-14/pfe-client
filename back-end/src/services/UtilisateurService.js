const { Utilisateur } = require('../models/utilisateur.js');
const bcrypt = require('bcrypt');

class UtilisateurService {
  async getAllUtilisateurs() {
    try {
      return await Utilisateur. find({ Role: "Utilisateur" });
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
      const user = await Utilisateur.findOne({
        "Username": data.Username
      });
      if (user) {
        return -1;
      }
      const utilisateur = new Utilisateur(data);
      utilisateur.Role="Utilisateur";
      const salt = await bcrypt.genSalt(10);
      utilisateur.Password = await bcrypt.hash(utilisateur.Password, salt);
      return await utilisateur.save();
    } catch (err) {
      throw err;
    }
  }

  async verifUtilisateur(data) {
    try {
      const user = await Utilisateur.findOne({
        "Username": data.Username
      });
      if (!user) {
        return null;
      }
      const isMatch = await bcrypt.compare(data.Password, user.Password);
      if (isMatch) {
        return user;
      } else {
        return null;
      }
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
