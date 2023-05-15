const express = require('express');
const podController = require('../controllers/PodController');
const passport = require('passport');

const router = express.Router();

router.post('/add',passport.authenticate('jwt', { session: false }) , podController.createPod);
router.get('/get',passport.authenticate('jwt', { session: false }) , podController.getAllPods);
router.get('/:id',passport.authenticate('jwt', { session: false }) , podController.getPodById);
router.get('/get/datacenter/:id',passport.authenticate('jwt', { session: false }) , podController.getPodsByDatacenterId);
router.put('/:id',passport.authenticate('jwt', { session: false }) , podController.updatePodById);
router.delete('/:id',passport.authenticate('jwt', { session: false }) , podController.deletePodById);

module.exports = router;
