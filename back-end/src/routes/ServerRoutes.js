const express = require('express');
const router = express.Router();
const serveurController = require('../controllers/serveur');

router.get('/', serveurController.getAllServeurs);
router.get('/:id', serveurController.getServeurById);
router.post('/', serveurController.createServeur);
router.put('/:id', serveurController.updateServeur);
router.delete('/:id', serveurController.deleteServeur);

module.exports = router;
