const express = require('express');
const router = express.Router();
const rackController = require('../controllers/RackController');
const passport = require('passport');

router.post('/add',passport.authenticate('jwt', { session: false }) , rackController.createRack);
router.get('/get',passport.authenticate('jwt', { session: false }) , rackController.getAllRacks);
router.get('/:id',passport.authenticate('jwt', { session: false }) , rackController.getRackById);
router.put('/:id',passport.authenticate('jwt', { session: false }) , rackController.updateRack);
router.delete('/:id',passport.authenticate('jwt', { session: false }) , rackController.deleteRack);

module.exports = router;
