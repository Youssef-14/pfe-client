const express = require('express');
const router = express.Router();
const dataCenterController = require('../controllers/DataCenterController');
const passport = require('passport');
const { inRole , Roles } = require('../security/Rolemiddleware');

router.get('/get',/*passport.authenticate('jwt', { session: false }) ,inRole(Roles.Admin),*/dataCenterController.getAllDataCenters);
router.get('/:id', dataCenterController.getDataCenterById);
router.post('/add', dataCenterController.createDataCenter);
router.put('/:id', dataCenterController.updateDataCenter);
router.delete('/:id', dataCenterController.deleteDataCenter);

module.exports = router;