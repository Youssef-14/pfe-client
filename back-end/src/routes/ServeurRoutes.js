const express = require('express');
const router = express.Router();
const serveurController = require('../controllers/ServeurController');

router.get('/get', serveurController.getAllServeurs);
router.get('/get/:id', serveurController.getServeurById);
router.get('/get/datacenter/:id', serveurController.getServeurByDataCenterId);
router.post('/add', serveurController.addServeur);
router.put('/:id', serveurController.updateServeur);
router.delete('/:id', serveurController.deleteServeur);

module.exports = router;