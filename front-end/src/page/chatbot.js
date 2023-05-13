import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/ListServices.css';
const ServerList = () => {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/serveurs/get')
            .then(response => {
                setServers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const deleteServer = (id) => {
        axios.delete(`http://localhost:3000/servers/${id}`)
            .then(response => {
                setServers(servers.filter(server => server.id !== id));
            })
            .catch(error => {
                console.log(error);
            });


        const addServer = () => {
            axios.post('http://localhost:3000/servers', { name, ipAddress })
                .then(response => {
                    setServers([...servers, response.data]);
                    setName('');
                    setIpAddress('');
                    $('#addServerModal').modal('hide');
                })
                .catch(error => {
                    console.log(error);
                });
        };
    };

    return (
        <div className="table-responsive">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8">
                            <h2>Server List</h2>
                        </div>
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addServerModal">
                                <i className="material-icons">&#xE147;</i> <span>Add New Server</span>
                            </button>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>IP Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servers.map(server => (
                            <tr key={server.id}>
                                <td>{server.id}</td>
                                <td>{server.name}</td>
                                <td>{server.ipAddress}</td>
                                <td>
                                    <a href="#editServerModal" className="edit" data-toggle="modal">
                                        <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                    </a>
                                    <a href="#deleteServerModal" className="delete" data-toggle="modal" onClick={() => deleteServer(server.id)}>
                                        <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServerList;
