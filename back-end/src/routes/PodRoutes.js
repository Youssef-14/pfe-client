const express = require('express');
const podController = require('../controllers/pod.controller');

const router = express.Router();

router.post('/', podController.createPod);
router.get('/', podController.getAllPods);
router.get('/:id', podController.getPodById);
router.patch('/:id', podController.updatePodById);
router.delete('/:id', podController.deletePodById);

module.exports = router;
