const express = require('express');
const router = express.Router();
const UtilisateurController = require('../controllers/UtilisateurController');

const utilisateurController = new UtilisateurController();

router.get('/get', utilisateurController.getAllUtilisateurs.bind(utilisateurController));
router.get('/:id', utilisateurController.getUtilisateurById.bind(utilisateurController));
router.post('/signup', utilisateurController.createUtilisateur.bind(utilisateurController));
router.post('/signin', utilisateurController.verifierUtilisateur.bind(utilisateurController));
router.put(':id', utilisateurController.updateUtilisateur.bind(utilisateurController));
router.delete('/delete/:id', utilisateurController.deleteUtilisateur.bind(utilisateurController));

module.exports = router;
