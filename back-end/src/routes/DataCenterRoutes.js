const express = require('express');
const router = express.Router();
const dataCenterController = require('../controllers/DatacenterController');

router.get('/get', dataCenterController.getAllDataCenters);
router.get('/:id', dataCenterController.getDataCenterById);
router.post('/add', dataCenterController.createDataCenter);
router.put('/:id', dataCenterController.updateDataCenter);
router.delete('/:id', dataCenterController.deleteDataCenter);

module.exports = router;
