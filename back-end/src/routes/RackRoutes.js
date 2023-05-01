const express = require('express');
const router = express.Router();
const rackController = require('../controllers/rack.controller');

router.post('/', rackController.createRack);
router.get('/', rackController.getAllRacks);
router.get('/:id', rackController.getRackById);
router.put('/:id', rackController.updateRack);
router.delete('/:id', rackController.deleteRack);

module.exports = router;
