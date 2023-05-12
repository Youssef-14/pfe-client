const dataCenterService = require('../services/DataCenterService');

const getAllDataCenters = async (req, res) => {
  try {
    const dataCenters = await dataCenterService.getAllDataCenters();
    res.send(dataCenters);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getDataCenterById = async (req, res) => {
  try {
    const dataCenter = await dataCenterService.getDataCenterById(req.params.id);
    if (!dataCenter) {
      return res.status(404).send('Data center not found');
    }
    res.send(dataCenter);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createDataCenter = async (req, res) => {
  try {
    await dataCenterService.createDataCenter(req.body);
    res.status(201).send({ message:"data center created successfully"});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateDataCenter = async (req, res) => {
  try {
    const dataCenter = await dataCenterService.updateDataCenter(req.params.id, req.body);
    if (!dataCenter) {
      return res.status(404).send('Data center not found');
    }
    res.send(dataCenter);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteDataCenter = async (req, res) => {
  try {
    const dataCenter = await dataCenterService.deleteDataCenter(req.params.id);
    if (!dataCenter) {
      return res.status(404).send('Data center not found');
    }
    res.send(dataCenter);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllDataCenters,
  getDataCenterById,
  createDataCenter,
  updateDataCenter,
  deleteDataCenter,
};
