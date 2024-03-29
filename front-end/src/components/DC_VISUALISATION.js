import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken , getUserRole } from "../_services/account.services";
import { faTrashAlt, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataCenterPopup from './CrudDataCenters/DataCenterPopup';
import RackPopup from './CrudDataCenters/RackPopup';
import PodPopup from './CrudDataCenters/podPopup';
import './style/DC_VISUALISATION.css'
const DataCenterComponent = () => {
  const [dataCenters, setDataCenters] = useState([]);
  const [selectedDataCenter, setSelectedDataCenter] = useState('');
  const [selectedRack, setSelectedRack] = useState('');
  const [pods, setPods] = useState([]);
  const [selectedPod, setSelectedPod] = useState('');
  const [racks, setRacks] = useState([]);
  const [showAddDataCenterPopup, setShowAddDataCenterPopup] = useState(false);
  const [showAddRackPopup, setShowAddRackPopup] = useState(false);
  const [showAddPodPopup, setShowAddPodPopup] = useState(false);
  const [showEditDataCenterPopup, setShowEditDataCenterPopup] = useState(false);
  const [showEditRackPopup, setShowEditRackPopup] = useState(false);
  const [showEditPodPopup, setShowEditPodPopup] = useState(false);

  useEffect(() => {
    fetchDataCenters();
  }, []);

  const handleClosePopup = () => {
    setShowAddPodPopup(false);
    setShowEditPodPopup(false);
  };

  const handleCloseRackPopup = () => {
    setShowAddRackPopup(false);
    setShowEditRackPopup(false);
  };
  const handleCloseDataCenterPopup = () => {
    setShowAddDataCenterPopup(false);
    setShowEditDataCenterPopup(false);
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
    setSelectedPod('');
    setRacks([]);

    if (selectedDataCenterId) {
      fetchPods(selectedDataCenterId);
    }
  };

  const handlePodChange = (event) => {
    const selectedPodId = event.target.value;

    setSelectedPod(selectedPodId);
    setSelectedRack('');
    setRacks([]);

    if (selectedPodId) {
      fetchRacks(selectedPodId);
    }
  };

  const handleRackChange = (event) => {
    const selectedRackId = event.target.value;
    setSelectedRack(selectedRackId);
  };

  const toggleAddDataCenterPopup = () => {

    setShowAddDataCenterPopup(!showAddDataCenterPopup);
  };
  const toggleAddPodPopup = () => {
    if(!selectedDataCenter) {
      alert('Please select a data center first');
      return;
    }
    setShowAddPodPopup(!showAddPodPopup);
  };

  const toggleAddRackPopup = () => {
    if (!selectedPod) {
      alert('Please select a pod first');
      return;
    }
    setShowAddRackPopup(!showAddRackPopup);
  };
  const toggleEditDataCenterPopup = () => {
    if (!selectedDataCenter) {
      alert('Please unselect data center first');
      return;
    }
    setShowEditDataCenterPopup(!showEditDataCenterPopup);
  };
  const toggleEditPodPopup = () => {
    if (!selectedPod) {
      alert('Please unselect pod first');
      return;
    }
    setShowEditPodPopup(!showEditPodPopup);
  };
  const toggleEditRackPopup = () => {
    if (!selectedRack) {
      alert('Please unselect rack first');
      return;
    }
    setShowEditRackPopup(!showEditRackPopup);
  };

  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showUpdateOptions, setShowUpdateOptions] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');
  const handleToggleAddOptions = () => {
    setShowAddOptions(!showAddOptions);
    setShowUpdateOptions(false);
    setShowDeleteOptions(false);
  };
  const handleToggleUpdateOptions = () => {
    setShowUpdateOptions(!showUpdateOptions);
    setShowAddOptions(false);
    setShowDeleteOptions(false);
  };
  const handleToggleDeleteOptions = () => {
    setShowDeleteOptions(!showDeleteOptions);
    setShowAddOptions(false);
    setShowUpdateOptions(false);
  };




  const handleOptionSelection = (option) => {
    setSelectedOption(option);
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
      const response = await axios.post(
        'http://127.0.0.1:3001/racks/add',
        {
          Nom: data.nom,
          Taille: data.taille,
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


  const handleDeleteDataCenter = async () => {
    if (!selectedDataCenter) {
      alert('Please select data center first');
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:3001/datacenters/${selectedDataCenter}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setDataCenters(dataCenters.filter((dataCenter) => dataCenter._id !== selectedDataCenter));
      setPods([]);
      setRacks([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePod = async () => {
    if (!selectedPod) {
      alert('Please select pod first');
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:3001/pods/${selectedPod}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setPods(pods.filter((pod) => pod._id !== selectedPod));
      setRacks([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRack = async () => {
    if (!selectedRack) {
      alert('Please select rack first');
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:3001/racks/${selectedRack}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setRacks(racks.filter((rack) => rack._id !== selectedRack));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDataCenter = async (data) => {
    try {
      await axios.put(`http://127.0.0.1:3001/datacenters/${selectedDataCenter}`, {
        Libelle: data.libelle,
        Description: data.description,
        Capacite: data.capacite,
      },
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
      const updatedDataCenters = dataCenters.map((dataCenter) => {
        if (dataCenter._id === selectedDataCenter) {
          return { ...dataCenter, ...data };
        }
        return dataCenter;
      });
      setDataCenters(updatedDataCenters);
      toggleEditDataCenterPopup();
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditPod = async (data) => {
    try {
      await axios.put(`http://127.0.0.1:3001/pods/${selectedPod}`, {
        Libelle: data.libelle,
        DataCenter: selectedDataCenter
      },
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        }
      );
      const updatedPods = pods.map((pod) => {
        if (pod._id === selectedPod) {
          return { ...pod, ...data };
        }
        return pod;
      });
      setPods(updatedPods);
      toggleEditPodPopup();
    } catch (error) {
      console.error(error);
    }
  };



  const handleEditRack = async (data) => {
    try {
      console.log(data);
      await axios.put(`http://127.0.0.1:3001/racks/${selectedRack}`, {
        Nom: data.nom,
        Taille: data.taille,
      }, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const updatedRacks = racks.map((rack) => {
        if (rack._id === selectedRack) {
          return { ...rack, ...handleEditRack };
        }
        return rack;
      });
      setRacks(updatedRacks);
      toggleEditRackPopup();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ height: "550px", overflowY: "scroll", paddingInline:"10px" }}>
      <h2 style={{ margin: "20px" }}>Data Centers</h2>
      <div className="button-container" >
        <div style={{ display: 'flex', flexDirection: 'scroll' }}>
          {dataCenters.map((dataCenter) => (
            <div key={dataCenter._id} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                id={dataCenter._id}
                name="dataCenter"
                value={dataCenter._id}
                checked={selectedDataCenter === dataCenter._id}
                onChange={handleDataCenterChange}
                style={{ display: 'none' }}
              />
              <label
                htmlFor={dataCenter._id}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#f1f1f1',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: selectedDataCenter === dataCenter._id ? '#ffffff' : '#000000',
                  background: selectedDataCenter === dataCenter._id ? '#3853D8' : 'none',
                }}
              >
                {dataCenter.Libelle}
              </label>
            </div>
          ))}
        </div>
        <div className='button-container'>
          <div>

            {showAddDataCenterPopup && (
              <DataCenterPopup onSubmit={handleAddDataCenter} onClose={handleCloseDataCenterPopup} addEdit={null} />
            )}
            {showEditDataCenterPopup && (
              <DataCenterPopup onSubmit={handleEditDataCenter} onClose={handleCloseDataCenterPopup} addEdit={dataCenters.find(f => f._id == selectedDataCenter)} />
            )}
          </div>
          <div>

            {showAddPodPopup && (
              <PodPopup
                onSubmit={handleAddPod}
                onClose={handleClosePopup}
                addEdit={null}
              />
            )}
            {showEditPodPopup && (
              <PodPopup
                onSubmit={handleEditPod}
                onClose={handleClosePopup}
                addEdit={pods.find(f => f._id == selectedPod)}
              />
            )}
          </div>
          <div>
            {showAddRackPopup && (
              <RackPopup
                onSubmit={handleAddRack}
                onClose={handleCloseRackPopup}
                addEdit={null}
              />
            )}
            {showEditRackPopup && (
              <RackPopup
                onSubmit={handleEditRack}
                onClose={handleCloseRackPopup}
                addEdit={racks.find(f => f._id == selectedRack)}
              />
            )}
          </div>



        </div>
      </div>
      <div className='allbtn'>
        {getUserRole() === 'Admin' && (
          <>
            <div className="parentDiv" id="div1" >
              <button className="action-button" onClick={handleToggleAddOptions}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              {showAddOptions && (
                <div className="options-container">
                  <button className="action-button" onClick={() => { toggleAddDataCenterPopup(); setShowAddOptions(false); }}>
                    <FontAwesomeIcon icon={faPlus} />
                    Ajouter un Data Center
                  </button>
                  <button className="action-button" onClick={() => { toggleAddPodPopup(); setShowAddOptions(false); }}>
                    <FontAwesomeIcon icon={faPlus} />
                    Ajouter un Pod
                  </button>
                  <button className="action-button" onClick={() => { toggleAddRackPopup(); setShowAddOptions(false); }}>
                    <FontAwesomeIcon icon={faPlus} />
                    Ajouter un Rack
                  </button>
                </div>
              )}
            </div>
            <div className="parentDiv" id="div2">
              <button className="edit-button" onClick={handleToggleUpdateOptions}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              {showUpdateOptions && (
                <div className="edit-options-container">
                  <button className="edit-button" onClick={() => { toggleEditDataCenterPopup(); setShowUpdateOptions(false); }}>
                    <FontAwesomeIcon icon={faEdit} />
                    Modifier le Data Center
                  </button>
                  <button className="edit-button" onClick={() => { toggleEditPodPopup(); setShowUpdateOptions(false); }}>
                    <FontAwesomeIcon icon={faEdit} />
                    Modifier le Pod
                  </button>
                  <button className="edit-button" onClick={() => { toggleEditRackPopup(); setShowUpdateOptions(false); }}>
                    <FontAwesomeIcon icon={faEdit} />
                    Modifier le Rack
                  </button>
                </div>
              )}
            </div>
            <div className="parentDiv" id="div3">
              <button className="delete-button" onClick={handleToggleDeleteOptions}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              {showDeleteOptions && (
                <div className="delete-button-options-container">
                  <button className="delete-button" onClick={() => { handleDeleteDataCenter(); }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    Supprimer le Data Center
                  </button>
                  <button className="delete-button" onClick={() => { handleDeletePod(); }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    Supprimer le Pod
                  </button>
                  <button className="delete-button" onClick={() => { handleDeleteRack(); }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    Supprimer le Rack
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="table-container">
        <div className='div-container'>
          <div className="div1">

            <table className='table1'>
              <thead>
                <tr>
                  <th>Sélectionner un Pod</th>
                </tr>
              </thead>
              <tbody>
                {pods.map((pod) => (
                  <tr key={pod._id}>
                    <td>
                      <input
                        type="radio"
                        id={pod._id}
                        name="pod"
                        value={pod._id}
                        checked={selectedPod === pod._id}
                        onChange={handlePodChange}
                        style={{ display: 'none' }}
                      />
                      <label
                        htmlFor={pod._id}
                        style={{ display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#f1f1f1',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: selectedPod === pod._id ? '#ffffff' : '#000000',
                        background: selectedPod === pod._id ? '#4e4caf' : 'none',}}
                        className={`radio-button-label ${selectedPod === pod._id ? 'selected' : ''
                          }`}
                      >
                        {pod.Libelle}
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <div className="div2">
            <table className='table2' >
              <thead>
                <tr>
                  <th>Rack</th>

                </tr>
              </thead>
              <tbody>
                {racks.map((rack) => (
                  <tr key={rack._id}>
                    <td className='td' on>
                      <input
                        type="radio"
                        id={rack._id}
                        name="rack"
                        value={rack._id}
                        checked={selectedRack === rack._id}
                        onChange={handleRackChange}
                        style={{ display: 'none' }}
                      />
                      <label id='l'
                        htmlFor={rack._id}
                        style={{ display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#f1f1f1',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: selectedRack === rack._id ? '#ffffff' : '#000000',
                        background: selectedRack === rack._id ? '#4e4caf' : 'none',}}
                        className={`radio-button-label ${selectedRack === rack._id ? 'selected' : ''
                          }`}
                      >
                        {rack.Nom}
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );


}
export default DataCenterComponent;
