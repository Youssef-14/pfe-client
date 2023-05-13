const UtilisateurService = require('../services/UtilisateurService');
const jwt = require('jsonwebtoken');

class UtilisateurController {
  constructor() {
    this.utilisateurService = new UtilisateurService();
  }

  async getAllUtilisateurs(req, res) {
    try {
      const utilisateurs = await this.utilisateurService.getAllUtilisateurs();
      res.status(200).send(utilisateurs);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  async getUtilisateurById(req, res) {
    try {
      const utilisateur = await this.utilisateurService.getUtilisateurById(req.params.id);
      if (!utilisateur) {
        return res.status(404).send({ error: 'Utilisateur n\'existe pas' });
      }
      res.status(200).send(utilisateur);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async createUtilisateur(req, res) {
    try {
      var response = await this.utilisateurService.createUtilisateur(req.body);
      if (response == -1){
        return res.status(409).send({ error: 'Utilisateur existe deja' });
      }
      res.status(201).send({res : "ajout avec succes"});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  async verifierUtilisateur(req, res) {
    try {
      const utilisateur = await this.utilisateurService.verifUtilisateur(req.body);
      
      if (utilisateur == null) {
        return res.status(404).send({ error: 'Utilisateur not found' });
      }
      const accessToken = jwt.sign({ id:utilisateur._id, Role: utilisateur.Role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.status(200).send({message:"utilisateur existe",token:accessToken});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  async updateUtilisateur(req, res) {
    try {
      const utilisateur = await this.utilisateurService.updateUtilisateur(req.params.id, req.body);
      if (!utilisateur) {
        return res.status(404).send({ error: 'Utilisateur not found' });
      }
      res.status(200).send({message:"update avec succes"});
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async deleteUtilisateur(req, res) {
    try {
      const utilisateur = await this.utilisateurService.deleteUtilisateur(req.params.id);
      
      if (!utilisateur) {
        return res.status(404).send({ error: 'Utilisateur not found' });
      }
      res.status(204).send({message:"delete avec succes"});
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = UtilisateurController;
