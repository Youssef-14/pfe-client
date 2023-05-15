const express = require('express');
const router = express.Router();
const UtilisateurController = require('../controllers/UtilisateurController');
const passport = require('passport');
const { inRole , Roles } = require('../security/Rolemiddleware');

const utilisateurController = new UtilisateurController();

router.get('/getaccounts',passport.authenticate('jwt', { session: false }) ,inRole(Roles.Admin), utilisateurController.getAllUtilisateurs.bind(utilisateurController));
router.get('/:id',passport.authenticate('jwt', { session: false }) ,inRole(Roles.Admin), utilisateurController.getUtilisateurById.bind(utilisateurController));
router.post('/signup',passport.authenticate('jwt', { session: false }) ,inRole(Roles.Admin), utilisateurController.createUtilisateur.bind(utilisateurController));
router.post('/signin', utilisateurController.verifierUtilisateur.bind(utilisateurController));
router.put('/update/:id',passport.authenticate('jwt', { session: false }) ,inRole(Roles.Admin), utilisateurController.updateUtilisateur.bind(utilisateurController));
router.delete('/delete/:id',passport.authenticate('jwt', { session: false }) ,inRole(Roles.Admin), utilisateurController.deleteUtilisateur.bind(utilisateurController));

module.exports = router;
