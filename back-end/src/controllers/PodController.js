const mongoose = require('mongoose');
const { DataCenter } = require('../models/data-center.js');
const podService = require('../services/PodService');

class PodController {
  static async createPod(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.body.DataCenter)) {
        res.status(400).json({ message: 'Invalid DataCenter ID' });
        return;
      }
      console.log(req.body.DataCenter);

      const datacenterId = req.body.DataCenter;
      const finddatacenter = await DataCenter.findById(datacenterId);
      if (!finddatacenter) {
        res.status(404).json({ message: 'Invalid DataCenter ID' });
        return;
      }
      const pod = await podService.createPod(req.body);
      
        await DataCenter.findOneAndUpdate(
          { _id: datacenterId },
          { $push: { pods: pod._id } },
          { new: true }
        );
      res.status(201).send({ message:"pod created successfully"});
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async getAllPods(req, res) {
    try {
      const pods = await podService.getAllPods();
      res.send(pods);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async getPodById(req, res) {
    try {
      const pod = await podService.getPodById(req.params.id);
      if (!pod) {
        return res.status(404).send();
      }
      res.send(pod);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async getPodsByDatacenterId(req, res) {
    try {
      const pods = await podService.getPodsByDatacenterId(req.params.id);
      if (!pods) {
        return res.status(404).send();
      }
      res.send(pods);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async updatePodById(req, res) {
    try {
      const pod = await podService.updatePodById(req.params.id, req.body);
      if (!pod) {
        return res.status(404).send();
      }
      res.send(pod);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async deletePodById(req, res) {
    try {
      const dataCenter = await podService.getPodById(req.params.id);
      const dataCenterId = dataCenter.DataCenter;
      
      await DataCenter.findOneAndUpdate(
        { _id: dataCenterId },
        { $pull: { pods: req.params.id } },
        { new: true }
      );
      const pod = await podService.deletePodById(req.params.id);
      if (!pod) {
        return res.status(404).send();
      }
      res.send("pod deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = PodController;
