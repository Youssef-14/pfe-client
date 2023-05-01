const { DataCenter } = require('../models/data-center.js');

const getAllDataCenters = async () => {
  return await DataCenter.find();
};

const getDataCenterById = async (id) => {
  return await DataCenter.findById(id);
};

const createDataCenter = async (data) => {
  const dataCenter = new DataCenter(data);
  return await dataCenter.save();
};

const updateDataCenter = async (id, data) => {
  return await DataCenter.findByIdAndUpdate(id, data, { new: true });
};

const deleteDataCenter = async (id) => {
  return await DataCenter.findByIdAndDelete(id);
};

module.exports = {
  getAllDataCenters,
  getDataCenterById,
  createDataCenter,
  updateDataCenter,
  deleteDataCenter,
};
