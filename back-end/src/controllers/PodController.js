const podService = require('../services/PodService');

const createPod = async (req, res) => {
  try {
    const pod = await podService.createPod(req.body);
    res.status(201).send(pod);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllPods = async (req, res) => {
  try {
    const pods = await podService.getAllPods();
    res.send(pods);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPodById = async (req, res) => {
  try {
    const pod = await podService.getPodById(req.params.id);
    if (!pod) {
      return res.status(404).send();
    }
    res.send(pod);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPodsByDatacenterId = async (req, res) => {
  try {
    const pods = await podService.getPodsByDatacenterId(req.params.id);
    if (!pods) {
      return res.status(404).send();
    }
    res.send(pods);
  } catch (error) {
    res.status(500).send(error);
  }
};



const updatePodById = async (req, res) => {
  try {
    const pod = await podService.updatePodById(req.params.id, req.body);
    if (!pod) {
      return res.status(404).send();
    }
    res.send(pod);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePodById = async (req, res) => {
  try {
    const pod = await podService.deletePodById(req.params.id);
    if (!pod) {
      return res.status(404).send();
    }
    res.send(pod);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPod,
  getAllPods,
  getPodById,
  updatePodById,
  deletePodById,
  getPodsByDatacenterId,
};
