const express = require('express');
const podController = require('../controllers/PodController');

const router = express.Router();

router.post('/add', podController.createPod);
router.get('/get', podController.getAllPods);
router.get('/:id', podController.getPodById);
router.get('/get/datacenter/:id', podController.getPodsByDatacenterId);
router.patch('/:id', podController.updatePodById);
router.delete('/:id', podController.deletePodById);

module.exports = router;
