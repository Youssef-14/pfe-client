const express = require('express');
const router = express.Router();
const dataCenterController = require('../controllers/DataCenterController');
const passport = require('passport');
const { inRole , Roles } = require('../security/Rolemiddleware');

router.get('/get',dataCenterController.getAllDataCenters);
router.get('/:id', dataCenterController.getDataCenterById);
router.post('/add',passport.authenticate('jwt', { session: false }) ,inRole(Roles.Admin), dataCenterController.createDataCenter);
router.put('/:id',passport.authenticate('jwt', { session: false }) ,inRole(Roles.Admin), dataCenterController.updateDataCenter);
router.delete('/:id',passport.authenticate('jwt', { session: false }) ,inRole(Roles.Admin), dataCenterController.deleteDataCenter);

module.exports = router;