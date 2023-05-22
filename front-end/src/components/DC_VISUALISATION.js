import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from "../_services/account.services";
import { faTrashAlt, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataCenterPopup from './CrudDataCenters/DataCenterPopup';
import RackPopup from './CrudDataCenters/RackPopup';
import PodPopup from './CrudDataCenters/podPopup';
import './style/DC_VISUALISATION.css'
const DataCenterComponent = () => {
  const [dataCenters, setDataCenters] = useState([]);
  const [selectedDataCenter, setSelectedDataCenter] = useState('');
  const [pods, setPods] = useState([]);
  const [selectedPod, setSelectedPod] = useState('');
  const [racks, setRacks] = useState([]);
  const [showAddDataCenterPopup, setShowAddDataCenterPopup] = useState(false);
  const [showAddRackPopup, setShowAddRackPopup] = useState(false);
  const [showAddPodPopup, setShowAddPodPopup] = useState(false);

  useEffect(() => {
    fetchDataCenters();
  }, []);

  const handleClosePopup = () => {
    setShowAddPodPopup(false);
  };

  const handleCloseRackPopup = () => {
    setShowAddRackPopup(false);
  };
  const handleCloseDataCenterPopup = () => {
    setShowAddDataCenterPopup(false);
  };

  const fetchDataCenters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/datacenters/get', {
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
      const response = await axios.get(`http://127.0.0.1:3001/racks/get/pod/${podId}`, {
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
    document.getElementById("addpod").style.display = "inline";

    setSelectedPod('');
    setRacks([]);

    if (selectedDataCenterId) {
      fetchPods(selectedDataCenterId);
    }
  };

  const handlePodChange = (event) => {
    const selectedPodId = event.target.value;
    document.getElementById("addrack").style.display = "inline";

    setSelectedPod(selectedPodId);
    setRacks([]);

    if (selectedPodId) {
      fetchRacks(selectedPodId);
    }
  };

  const toggleAddDataCenterPopup = () => {
    setShowAddDataCenterPopup(!showAddDataCenterPopup);
  };
  const toggleAddPodPopup = () => {
    setShowAddPodPopup(!showAddPodPopup);
  };

  const toggleAddRackPopup = () => {
    setShowAddRackPopup(!showAddRackPopup);
  };

  const handleAddDataCenter = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        'http://127.0.0.1:3001/datacenters/add',
        {
          Libelle: data.libelle,
          Description: data.description,
          Capacite: data.capacite,
        },
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        }
      );

      setDataCenters([...dataCenters, response.data.DataCenter]);
      toggleAddDataCenterPopup();
    } catch (error) {
      console.error(error);
    }
  };


  const handleAddPod = async (data) => {

    try {

      const response = await axios.post(`http://127.0.0.1:3001/pods/add`, {

        Libelle: data.Libelle,
        DataCenter: selectedDataCenter
      },
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        }
      );
      setPods([...pods, response.data.Pod]);
      toggleAddPodPopup();
    } catch (error) {
      console.error(error);
      console.log(data)
    }
  };




  const handleAddRack = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        'http://127.0.0.1:3001/racks/add',
        {
          Nom: data.Nom,
          Taille: data.Taille,
          Pod: selectedPod
        },
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        }
      );
      setRacks([...racks, response.data.rack]);
      toggleAddRackPopup();
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
  const handleEditRack = async (rackId) => {
    try {
      await axios.put(`http://127.0.0.1:3001/racks/update/${rackId}`, handleEditRack, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const updatedRacks = racks.map((rack) => {
        if (rack._id === rackId) {
          return { ...rack, ...handleEditRack };
        }
        return rack;
      });
      setRacks(updatedRacks);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ height: "550px", overflowY: "scroll" }}>
      <h2>Data Centers</h2>
      <div className="button-container">
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
            <div className="table-container">
              <select value={selectedPod} onChange={handlePodChange}>
                <option value="">Sélectionner un Pod</option>
                {pods.map((pod) => (
                  <option key={pod._id} value={pod._id}>
                    {pod.Libelle}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className='button-container'>
          <div>
            <button className="action-button" onClick={toggleAddDataCenterPopup}>
              <FontAwesomeIcon icon={faPlus} />
              Ajouter un Data Center
            </button>
            {showAddDataCenterPopup && (
              <DataCenterPopup onSubmit={handleAddDataCenter} onClose={handleCloseDataCenterPopup} />
            )}
          </div>

          <div>
            <button
              className="action-button"
              id="addpod"
              onClick={toggleAddPodPopup}
              style={{ display: 'none' }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Ajouter un Pod
            </button>
            {showAddPodPopup && (
              <PodPopup
                id={selectedDataCenter}
                onSubmit={handleAddPod}
                onClose={handleClosePopup}
              />
            )}
          </div>
          <div>
            <button className="action-button" id='addrack' onClick={toggleAddRackPopup} style={{ display: 'none' }}>
              <FontAwesomeIcon icon={faPlus} />
              Ajouter un Rack
            </button>
            {showAddRackPopup && (
              <RackPopup
                id={selectedPod}
                onSubmit={handleAddRack}
                onClose={handleCloseRackPopup}
              />)}
          </div>
        </div>
        {selectedPod && (
          <table>
            <thead>
              <tr>
                <th>Rack</th>
                <th>Pod</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {racks.map((rack) => (
                <tr key={rack._id}>
                  <td className='td'>{rack.Nom}</td>
                  <td className='td'>{rack.Pod}</td>
                  <td>
                    <button className="action-button delete-button" onClick={() => handleDeleteRack(rack._id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button className='edit-button' onClick={() => handleEditRack(rack._id)}>
                      <FontAwesomeIcon icon={faEdit} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div >
  );

};

export default DataCenterComponent;


