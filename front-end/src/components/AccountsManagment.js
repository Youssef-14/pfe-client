
import React, { useState } from 'react';
import './style/ListServices.css'


function
    AccountsManagment() {
    return (
        <div className='ManageServer'>




            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <div className="container-xl">

                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>
                                    Manage <b>server</b>
                                </h2>
                            </div>
                            <div className="col-sm-6">
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
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>

                                </th>
                                <th>User Name</th>
                                <th>USERID</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Mot de passe</th>
                                <th>Privillège</th>
                                <th>Actions</th>
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
                                <td>flen1234</td>
                                <td>benfoulen</td>
                                <td>flen</td>
                                <td> azerty123</td>
                                <td>admin</td>


                                <td>
                                    <a
                                        href="#editEmployeeModal"
                                        className="edit"
                                        data-toggle="modal"
                                    >
                                        <i
                                            className="material-icons"
                                            data-toggle="tooltip"
                                            title="Edit"
                                        >
                                            
                                        </i>
                                    </a>
                                    <a
                                        href="#deleteEmployeeModal"
                                        className="delete"
                                        data-toggle="modal"
                                    >
                                        <i
                                            className="material-icons"
                                            data-toggle="tooltip"
                                            title="Delete"
                                        >
                                            
                                        </i>
                                    </a>
                                </td>
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

export default AccountsManagment;

