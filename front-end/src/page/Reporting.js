
import React, { useState } from 'react';
// import './style/DC_VISUALISATION.css'


function Reporting() {
    return (
        <div className='ManageServer'>
 
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
              
                <div className="container-xl1">

                <div className="table-wrapper1" style={{ margin: "0 auto" }}>
                        <div className="table-title1">
                            <div className="row1">
                                
                                <div className="col-sm-61">
                                    <a
                                        href="#addEmployeeModal"
                                        className="btn btn-success"
                                        data-toggle="modal"
                                    >
                                        <i className="material-icons"></i>{" "}

                                    </a>
                                    <a
                                        href="#deleteEmployeeModal"
                                        className="btn btn-danger"
                                        data-toggle="modal"
                                    >
                                        <i className="material-icons"></i>
                                        {/* <span>Delete</span> */}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover1">
                            <thead>
                                <tr>
                                    <th>
                                
                                    </th>
                                    <th>Serveur ID</th>
                                    <th>consom ram</th>
                                    <th>consom CPU</th>
                                    <th>Uptime</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="custom-checkbox">
                                            <input
                                                type="checkbox"
                                                id="checkbox1"
                                                name="options[]"
                                                defaultValue={1}
                                            />
                                            <label htmlFor="checkbox1" />
                                        </span>
                                    </td>
                                    <td>1</td>
                                    <td>12%</td>
                                    <td>11%</td>
                                    <td>aa</td>
                                   
                                    
                                       
                                </tr>

                            </tbody>
                        </table>
                        <div className="clearfix">
                            <div className="hint-text">
                                Showing <b>5</b> out of <b>25</b> entries
                            </div>
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <a href="#">Previous</a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        2
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a href="#" className="page-link">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        4
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        5
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a href="#" className="page-link">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>


           

        </div>
    );
}

export default Reporting;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './style/ListServices.css';

// function ListServicesVisteur() {
//   const [servers, setServers] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:3000/api/servers')
//       .then((response) => {
//         setServers(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div className='ManageServer'>

//       <>
//         <meta charSet='utf-8' />
//         <meta
//           name='viewport'
//           content='width=device-width, initial-scale=1, shrink-to-fit=no'
//         />

//         <link
//           rel='stylesheet'
//           href='https://fonts.googleapis.com/css?family=Roboto|Varela+Round'
//         />
//         <link
//           rel='stylesheet'
//           href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
//         />
//         <link
//           rel='stylesheet'
//           href='https://fonts.googleapis.com/icon?family=Material+Icons'
//         />
//         <link
//           rel='stylesheet'
//           href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
//         />
//         <div className='container-xl'>
//           <div className='table-wrapper'>
//             <div className='table-title'>
//               <div className='row'>
//                 <div className='col-sm-6'>
//                   <h2>
//                     Manage <b>server</b>
//                   </h2>
//                 </div>
//                 <div className='col-sm-6'>
//                   <a
//                     href='#addEmployeeModal'
//                     className='btn btn-success'
//                     data-toggle='modal'
//                   >
//                     <i className='material-icons'></i>{' '}
//                   </a>
//                   <a
//                     href='#deleteEmployeeModal'
//                     className='btn btn-danger'
//                     data-toggle='modal'
//                   >
//                     <i className='material-icons'></i>
//                     {/* <span>Delete</span> */}
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <table className='table table-striped table-hover'>
//               <thead>
//                 <tr>
//                   <th>
//                     <span className='custom-checkbox'>
//                       <input type='checkbox' id='selectAll' />
//                       <label htmlFor='selectAll' />
//                     </span>
//                   </th>
//                   <th>Serveur</th>
//                   <th>Hostname</th>
//                   <th>IP</th>
//                   <th>IP management</th>
//                   <th>RAM</th>
//                   <th>CPU</th>
//                   <th>Consommation RAM</th>
//                   <th>Consommation CPU</th>
//                   <th>Modèle</th>
//                   <th>Constructeur</th>
//                   <th>RACK</th>
//                   <th>POD</th>
//                   <th>Owner</th>
//                   <th>username</th>
//                   <th>password</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {servers.map((server) => (
//                   <tr key={server.id}>
//                     <td>
//                       <span className='custom-checkbox'>
//                         <input
//                           type='checkbox'
//                           id={`checkbox${server.id}`}
//                           name='options[]'
//                           defaultValue={1}
//                         />
//                         <label htmlFor={`checkbox${server.id}`} />
//                       </span>
//                     </td>
//                     <td>{server.name}</td>
//                     <td>{server.hostname}</td>
                   
//                     <td>{server.status}</td>
//                     <td>{server.os}</td>
//                     <td>{server.cpu}</td>
//                     <td>{server.memory}</td>
//                     <td>{server.storage}</td>
//                     <td>
//                       <button
//                         className='edit'
//                         onClick={() => handleEdit(server.id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className='delete'
//                         onClick={() => handleDelete(server.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
              