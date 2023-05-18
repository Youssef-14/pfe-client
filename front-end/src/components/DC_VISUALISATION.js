import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from "../_services/account.services";

const DataCenterComponent = () => {
  const [dataCenters, setDataCenters] = useState([]);
  const [selectedDataCenter, setSelectedDataCenter] = useState('');
  const [pods, setPods] = useState([]);
  const [selectedPod, setSelectedPod] = useState('');
  const [racks, setRacks] = useState([]);

  useEffect(() => {
    fetchDataCenters();
  }, []);

  const fetchDataCenters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/datacenters/get',{
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
      });
      setDataCenters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPods = async (dataCenterId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/pods/get/datacenter/${dataCenterId}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        } 
    });
      setPods(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRacks = async (podId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/racks/get/pod/${podId}`,{
        headers: {
            'Authorization': `Bearer ${getToken()}`
        } 
    });
      setRacks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataCenterChange = (event) => {
    const selectedDataCenterId = event.target.value;
    setSelectedDataCenter(selectedDataCenterId);
    setSelectedPod('');
    setRacks([]);

    if (selectedDataCenterId) {
      fetchPods(selectedDataCenterId);
    }
  };

  const handlePodChange = (event) => {
    const selectedPodId = event.target.value;
    setSelectedPod(selectedPodId);
    setRacks([]);

    if (selectedPodId) {
      fetchRacks(selectedPodId);
    }
  };

  const handleAddDataCenter = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3001/datacenters/add', {
        Libelle: 'Nouveau DataCenter',
        Description: 'Description du nouveau DataCenter',
        Capacite: 100
      },{
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });

      setDataCenters([...dataCenters, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPod = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:3001/pods/add`, {
        Libelle: 'Nouveau Pod',
        DataCenter: selectedDataCenter
      }, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        } 
    });

      setPods([...pods, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRack = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:3001/racks/add`, {
        Nom: 'Nouveau Rack',
        Taille: 10,
        Pod: selectedPod
      }, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        } 
    });

      setRacks([...racks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDataCenter = async (dataCenterId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/datacenters/delete/${dataCenterId}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setDataCenters(dataCenters.filter((dataCenter) => dataCenter._id !== dataCenterId));
      setPods([]);
      setRacks([]);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDeletePod = async (podId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/pods/delete/${podId}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setPods(pods.filter((pod) => pod._id !== podId));
      setRacks([]);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDeleteRack = async (rackId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/racks/delete/${rackId}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setRacks(racks.filter((rack) => rack._id !== rackId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Data Centers</h2>
      <select value={selectedDataCenter} onChange={handleDataCenterChange}>
        <option value="">Sélectionner un Data Center</option>
        {dataCenters.map((dataCenter) => (
          <option key={dataCenter._id} value={dataCenter._id}>
            {dataCenter.Libelle}
          </option>
        ))}
      </select>

      {selectedDataCenter && (
        <div>
          <h3>Pods</h3>
          <select value={selectedPod} onChange={handlePodChange}>
            <option value="">Sélectionner un Pod</option>
            {pods.map((pod) => (
              <option key={pod._id} value={pod._id}>
                {pod.Libelle}
              </option>
            ))}
          </select>

          {selectedPod && (
            <div>
              <h4>Racks</h4>
              <button onClick={handleAddRack}>Ajouter un Rack</button>
              {racks.map((rack) => (
                <div key={rack._id}>
                  <span>{rack.Nom}</span>
                  <span>{rack.Taille}</span>
                  <button onClick={() => handleDeleteRack(rack._id)}>Supprimer</button>
                </div>
              ))}
            </div>
          )}
          <button onClick={handleAddPod}>Ajouter un Pod</button>
        </div>
      )}

      <button onClick={handleAddDataCenter}>Ajouter un Data Center</button>
    </div>
  );
};

export default DataCenterComponent;
