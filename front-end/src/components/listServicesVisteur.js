
// import React, { useState } from 'react';
// import './style/ListServices.css'


// function ListServicesVisteur() {
//     return (
//         <div className='ManageServer'>

//             <>
//                 <meta charSet="utf-8" />
//                 <meta
//                     name="viewport"
//                     content="width=device-width, initial-scale=1, shrink-to-fit=no"
//                 />


//                 <link
//                     rel="stylesheet"
//                     href="https://fonts.googleapis.com/icon?family=Material+Icons"
//                 />
//                 <link
//                     rel="stylesheet"
//                     href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
//                 />
//                 <div className="container-xl">

//                     <div className="table-wrapper">
//                         <div className="table-title">
//                             <div className="row">
//                                 <div className="col-sm-6">
//                                     <h2>
//                                         Manage <b>server</b>
//                                     </h2>
//                                 </div>
//                                 <div className="col-sm-6">
//                                     <a
//                                         href="#addEmployeeModal"
//                                         className="btn btn-success"
//                                         data-toggle="modal"
//                                     >
//                                         <i className="material-icons"></i>{" "}

//                                     </a>
//                                     <a
//                                         href="#deleteEmployeeModal"
//                                         className="btn btn-danger"
//                                         data-toggle="modal"
//                                     >
//                                         <i className="material-icons"></i>
//                                         {/* <span>Delete</span> */}
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                         <table className="table table-striped table-hover">
//                             <thead>
//                                 <tr>
//                                     <th>

//                                     </th>
//                                     <th>Serveur</th>
//                                     <th>Hostname</th>
//                                     <th>IP</th>
//                                     <th>IP management</th>
//                                     <th>RAM</th>
//                                     <th>CPU</th>
//                                     <th>Consommation RAM</th>
//                                     <th>Consommation CPU</th>
//                                     <th>Modèle</th>
//                                     <th>Constructeur</th>
//                                     <th>RACK</th>
//                                     <th>POD</th>
//                                     <th>Owner</th>
//                                     <th>username</th>
//                                     <th>password</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>
//                                         <span className="custom-checkbox">
//                                             <input
//                                                 type="checkbox"
//                                                 id="checkbox1"
//                                                 name="options[]"
//                                                 defaultValue={1}
//                                             />
//                                             <label htmlFor="checkbox1" />
//                                         </span>
//                                     </td>
//                                     <td>TWeb1</td>
//                                     <td>webserver.example.com</td>
//                                     <td>192.168.0.1</td>
//                                     <td> 192.168.0.254</td>
//                                     <td>8 GB</td>
//                                     <td>Intel Xeon E5-2620</td>
//                                     <td>Dell PowerEdge R740</td>
//                                     <td> 20%</td>
//                                     <td>  Dell PowerEdge R740</td>
//                                     <td>  Supermicro</td>

//                                     <td> Rack 1</td>
//                                     <td>Pod 1</td>
//                                     <td>John Doe</td>
//                                     <td>jdoe</td>
//                                     <td>132123</td>
//                                     <td>
//                                         <a
//                                             href="#editEmployeeModal"
//                                             className="edit"
//                                             data-toggle="modal"
//                                         >
//                                             <i
//                                                 className="material-icons"
//                                                 data-toggle="tooltip"
//                                                 title="Edit"
//                                             >
//                                                 
//                                             </i>
//                                         </a>
//                                         <a
//                                             href="#deleteEmployeeModal"
//                                             className="delete"
//                                             data-toggle="modal"
//                                         >
//                                             <i
//                                                 className="material-icons"
//                                                 data-toggle="tooltip"
//                                                 title="Delete"
//                                             >
//                                                 
//                                             </i>
//                                         </a>
//                                     </td>
//                                 </tr>

//                             </tbody>
//                         </table>
//                         <div className="clearfix">
//                             <div className="hint-text">
//                                 Showing <b>5</b> out of <b>25</b> entries
//                             </div>
//                             <ul className="pagination">
//                                 <li className="page-item disabled">
//                                     <a href="#">Previous</a>
//                                 </li>
//                                 <li className="page-item">
//                                     <a href="#" className="page-link">
//                                         1
//                                     </a>
//                                 </li>
//                                 <li className="page-item">
//                                     <a href="#" className="page-link">
//                                         2
//                                     </a>
//                                 </li>
//                                 <li className="page-item active">
//                                     <a href="#" className="page-link">
//                                         3
//                                     </a>
//                                 </li>
//                                 <li className="page-item">
//                                     <a href="#" className="page-link">
//                                         4
//                                     </a>
//                                 </li>
//                                 <li className="page-item">
//                                     <a href="#" className="page-link">
//                                         5
//                                     </a>
//                                 </li>
//                                 <li className="page-item">
//                                     <a href="#" className="page-link">
//                                         Next
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                 </div>


//             </>

//         </div>
//     );
// }

// export default ListServicesVisteur;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/ListServices.css'
function ListServicesVisteur() {
    const [servers, setServers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/serveurs/get')
            .then(response => {
                setServers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <h1>List of servers</h1>
            <ul>
                {servers.map(server => (
                    <li key={server.id}>
                        <p>Name: {server.name}</p>
                        <p>Hostname: {server.hostname}</p>
                        <p>IP Address: {server.ip_address}</p>
                        {/* Add other server properties here */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListServicesVisteur;
