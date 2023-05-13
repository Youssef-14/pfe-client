import './style/ListServices.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { getUserRole } from "../_services/account.services";
const Table = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/users/getaccounts')
            .then(response => {
                setEmployees(response.data);
                setLoading(false);

            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const addEmployeeRow = () => {
        setEmployees([
            ...employees,
            { name: '', department: '', phone: '', password: '', privillege: '' },
        ]);
    };

    const editEmployeeRow = (index, event) => {
        const values = [...employees];
        values[index][event.target.name] = event.target.value;
        setEmployees(values);
    };

    const deleteEmployeeRow = (index) => {
        const values = [...employees];
        axios.delete(`http://localhost:3001/users/delete/${values[index]._id}`)
            .then(() => {
                values.splice(index, 1);
                setEmployees(values);
            })
            .catch(error => console.error(error));
    };

    const updateEmployeeRow = (index) => {
        const values = [...employees];
        const updatedEmployee = values[index];
        axios.put(`http://localhost:3001/users/update/${updatedEmployee._id}`, updatedEmployee)
            .then(() => {
                setEmployees(values);
            })
            .catch(error => console.error(error));
    };
    

    const submitEmployeeRow = (index) => {
        const values = [...employees];
        const inputFields = document
            .querySelectorAll(`#employee-${index} input[type="text"]`);
        const empty = Array.from(inputFields)
            .some((input) => !input.value);
        if (!empty) {
            inputFields.forEach((input) => {
                values[index][input.name] = input.value;
            });
            axios.post(`http://localhost:3001/users/signup`)
                .then(() => setEmployees(values))
                .catch(error => console.error(error));
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="table-wrapper">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round|Open+Sans" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <div className="table-title">
                <h2>users management</h2>
                <button
                    type="button"
                    className="btn btn-primary add-new"
                    onClick={addEmployeeRow}
                >
                    <i className="fa fa-plus" />
                    Add New
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>USERID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Mot de passe</th>
                        <th>Privillège</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={`employee-${index}`} id={`employee-${index}`}>
                            <td>
                                <input
                                    type="text"
                                    name="USERID"
                                    className="form-control"
                                    value={employee._id}
                                    disabled
                                />
                            </td>
                            <td><input
                                type="text"
                                name="Nom"
                                className="form-control"
                                value={employee.Nom}
                                onChange={(event) => editEmployeeRow(index, event)}
                            />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="Prénom"
                                    className="form-control"
                                    value={employee.Prenom}
                                    onChange={(event) => editEmployeeRow(index, event)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="Motdepasse"
                                    className="form-control"
                                    value={employee.Password}
                                    onChange={(event) => editEmployeeRow(index, event)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="Privillège"
                                    className="form-control"
                                    value={employee.IsAdmin ? "Admin" : "User"}
                                    onChange={(event) => editEmployeeRow(index, event)}
                                    disabled
                                />
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-success add"
                                    onClick={() => submitEmployeeRow(index)}
                                >
                                    <i className="fa fa-check" />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary edit"
                                    onClick={() => { updateEmployeeRow(index, employee._id) }}
                                >
                                    <i className="fa fa-pencil" />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger delete"
                                    onClick={() => deleteEmployeeRow(index, employee._id)}
                                >
                                    <i className="fa fa-trash" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default Table;