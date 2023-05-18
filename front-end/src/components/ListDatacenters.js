import { Container, Row, Col } from "reactstrap";
import ModalForm from "../components/CrudServeurs/Modal";
import DataTable from "../components/CrudServeurs/DataTable";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataCenterButton from './DataCenterButton';
import { getToken } from "../_services/account.services";
import './style/create.component.css';

const DataCenter = () => {
    const [dataCenters, setDataCenters] = useState([]);
    const [selectedDataCenter, setSelectedDataCenter] = useState(null);
    const [selectedPods, setSelectedPods] = useState([]);
    const [selectedRacks, setSelectedRacks] = useState([]);

    useEffect(() => {
        fetchDataCenters();
    }, []);

    const fetchDataCenters = async () => {
        try {
            const token = getToken();
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get('http://localhost:3001/datacenters/get', { headers });
            setDataCenters(response.data);
        } catch (error) {
            console.error('Error fetching data centers:', error);
        }
    };

    const fetchDataCenterPodsAndRacks = async (dataCenterId) => {
        try {
            const token = getToken();
            const headers = { Authorization: `Bearer ${token}` };
            const podsResponse = await axios.get(`http://localhost:3001/pods/get?DataCenter=${dataCenterId}`, { headers });
            const pods = podsResponse.data;
            const racksPromises = pods.map(async (pod) => {
                const rackResponse = await axios.get(`http://localhost:3001/racks/get?Pod=${pod._id}`, { headers });
                const racks = rackResponse.data;
                return {
                    ...pod,
                    racks
                };
            });
            const podsAndRacks = await Promise.all(racksPromises);
            setSelectedPods(podsAndRacks);
            setSelectedRacks([]);
        } catch (error) {
            console.error(`Error fetching pods and racks for data center ${dataCenterId}:`, error);
        }
    };

    const handleDataCenterClick = async (dataCenterId) => {
        setSelectedDataCenter(dataCenterId);
        await fetchDataCenterPodsAndRacks(dataCenterId);
    };

    const handlePodClick = (pod) => {
        setSelectedRacks(pod.racks);
    };

    return (
        <div>
            <h1>Data Centers</h1>
            {dataCenters.map((dataCenter) => (
                <DataCenterButton
                    key={dataCenter._id}
                    dataCenter={dataCenter}
                    onClick={handleDataCenterClick}
                />
            ))}
            <hr />
            {selectedDataCenter && (
                <div>
                    <h2>Data Center: {selectedDataCenter}</h2>
                    <div className="scrollable-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Pods</th>
                                    <th>Racks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedPods.map((pod) => (
                                    <tr key={pod._id} onClick={() => handlePodClick(pod)}>
                                        <td>{pod.Libelle}</td>
                                        <td>
                                            {pod.racks.map((rack) => (
                                                <div key={rack._id}>
                                                    Rack: {rack.Nom}, Size: {rack.Taille}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {selectedRacks.length > 0 && (
                <div>
                    <h3>Selected Racks:</h3>
                    <ul>
                        {selectedRacks.map((rack) => (
                            <li key={rack._id}>
                                Rack: {rack.Nom}, Size: {rack.Taille}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DataCenter;

