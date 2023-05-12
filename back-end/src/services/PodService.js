const { Pod } = require('../models/pod.js');

class PodService {
  static async createPod(podData) {
    try {
      const pod = new Pod(podData);
      return await pod.save();
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllPods() {
    const pods = await Pod.find();
    return pods;
  }

  static async getPodById(podId) {
    const pod = await Pod.findById(podId);
    return pod;
  }

  static async getPodsByDatacenterId(datacenterId) {
    const pods = await Pod.find({ datacenterId });
    return pods;
  }

  static async updatePodById(podId, podData) {
    const pod = await Pod.findByIdAndUpdate(podId, podData, { new: true });
    return pod;
  }

  static async deletePodById(podId) {
    const pod = await Pod.findByIdAndDelete(podId);
    return pod;
  }
}

module.exports = PodService;
