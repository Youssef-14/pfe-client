import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/style/DC_VISUALISATION.css'
const DataCenters = () => {
    const [dataCenters, setDataCenters] = useState([]);
    const [selectedDataCenter, setSelectedDataCenter] = useState(null);
    const [selectedPod, setSelectedPod] = useState(null);

    useEffect(() => {
        fetchDataCenters();
    }, []);

    const fetchDataCenters = async () => {
        try {
            const response = await axios.get('http://localhost:3001/datacenters/get');
            setDataCenters(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDataCenterClick = (dataCenterId) => {
        const selectedDataCenter = dataCenters.find((dc) => dc._id === dataCenterId);
        setSelectedDataCenter(selectedDataCenter);
        setSelectedPod(null);
    };

    const handlePodClick = (podId) => {
        const selectedPod = selectedDataCenter.pods.find((pod) => pod._id === podId);
        setSelectedPod(selectedPod);
    };

    return (
        <div>
            <h2>Data Centers</h2>
            <div className="data-center-buttons">
                {dataCenters.map((dataCenter) => (
                    <button key={dataCenter._id} onClick={() => handleDataCenterClick(dataCenter._id)}>
                        {dataCenter.Libelle}
                    </button>
                ))}
            </div>
            {selectedDataCenter && (
                <div>
                    <h3>Pods</h3>
                    {selectedDataCenter.pods.length === 0 ? (
                        <p>No pods available for this data center.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Pod Name</th>
                                    <th>Description</th>
                                    <th>Capacity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedDataCenter.pods.map((pod) => (
                                    <tr key={pod._id} onClick={() => handlePodClick(pod._id)}>
                                        <td>{pod.Libelle}</td>
                                        <td>{pod.Description}</td>
                                        <td>{pod.Capacite}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
            {selectedPod && (
                <div>
                    <h3>Selected Pod: {selectedPod.Libelle}</h3>
                    {/* Display additional pod details if needed */}
                </div>
            )}
        </div>
    );
};

export default DataCenters;
