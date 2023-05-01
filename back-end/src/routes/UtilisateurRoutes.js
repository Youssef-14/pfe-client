const express = require('express');
const router = express.Router();
const UtilisateurController = require('../controllers/UtilisateurController');

const utilisateurController = new UtilisateurController();

router.get('/get', utilisateurController.getAllUtilisateurs.bind(utilisateurController));
router.get('/:id', utilisateurController.getUtilisateurById.bind(utilisateurController));
router.post('/add', utilisateurController.createUtilisateur.bind(utilisateurController));
router.put('/:id', utilisateurController.updateUtilisateur.bind(utilisateurController));
router.delete('/:id', utilisateurController.deleteUtilisateur.bind(utilisateurController));

module.exports = router;
