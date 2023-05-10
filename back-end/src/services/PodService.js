const { Pod } = require('../models/pod.js');

const createPod = async (podData) => {
  try {
    const pod = new Pod(podData);
    await pod.save();
  } catch (error) {
    console.log(error);
  }
};

const getAllPods = async () => {
  const pods = await Pod.find();
  return pods;
};

const getPodById = async (podId) => {
  const pod = await Pod.findById(podId);
  return pod;
};

const getPodsByDatacenterId = async (datacenterId) => {
  const pods = await Pod.find({ datacenterId });
  return pods;
};

const updatePodById = async (podId, podData) => {
  const pod = await Pod.findByIdAndUpdate(podId, podData, { new: true });
  return pod;
};

const deletePodById = async (podId) => {
  const pod = await Pod.findByIdAndDelete(podId);
  return pod;
};

module.exports = {
  createPod,
  getAllPods,
  getPodById,
  updatePodById,
  deletePodById,
  getPodsByDatacenterId,
};
