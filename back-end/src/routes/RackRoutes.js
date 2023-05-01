const express = require('express');
const router = express.Router();
const rackController = require('../controllers/RackController');

router.post('/add', rackController.createRack);
router.get('/get', rackController.getAllRacks);
router.get('/:id', rackController.getRackById);
router.put('/:id', rackController.updateRack);
router.delete('/:id', rackController.deleteRack);

module.exports = router;
