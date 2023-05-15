const express = require('express');
const router = express.Router();
const serveurController = require('../controllers/ServeurController');
const passport = require('passport');

router.get('/get',passport.authenticate('jwt', { session: false }) , serveurController.getAllServeurs);
router.get('/get/:id',passport.authenticate('jwt', { session: false }) , serveurController.getServeurById);
router.get('/get/datacenter/:id', serveurController.getServeurByDataCenterId);
router.post('/add',passport.authenticate('jwt', { session: false }) , serveurController.addServeur);
router.put('/:id',passport.authenticate('jwt', { session: false }) , serveurController.updateServeur);
router.delete('/delete/:id',passport.authenticate('jwt', { session: false })  , serveurController.deleteServeur);

module.exports = router;