import './style/Crud.css'
import React, { useState } from 'react';
const [showAddRow, setShowAddRow] = useState(false);
const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    phone: "",
});

const handleAddRowClick = () => {
    setShowAddRow(true);
};

const handleAddClick = () => {
    if (newEmployee.name && newEmployee.department && newEmployee.phone) {
        const newEmployees = [...employees, { ...newEmployee, id: employees.length + 1 }];
        setEmployees(newEmployees);
        setNewEmployee({ name: "", department: "", phone: "" });
        setShowAddRow(false);
    }
};

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
};

const handleEditClick = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = {
        ...updatedEmployees[index],
        editing: true,
    };
    setEmployees(updatedEmployees);
};

const handleSaveClick = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = {
        ...updatedEmployees[index],
        editing: false,
    };
    setEmployees(updatedEmployees);
};

const handleDeleteClick = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
};


function EmployeeTable() {

    return (
        <div className="container-lg">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2>
                                    Employee <b>Details</b>
                                </h2>
                            </div>
                            <div className="col-sm-4">
                                <button
                                    type="button"
                                    className="btn btn-info add-new"
                                    onClick={handleAddRowClick}
                                >
                                    <i className="fa fa-plus"></i> Add New
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={employee.id}>
                                    <td>
                                        {employee.editing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={employee.name}
                                                onChange={(event) =>
                                                    setEmployees(
                                                        employees.map((emp, idx) =>
                                                            idx === index
                                                                ? { ...emp, name: event.target.value }
                                                                : emp
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            employee.name
                                        )}
                                    </td>
                                    <td>
                                        {employee.editing ? (
                                            <input
                                                type=" text"
                                                className="form-control"
                                                name="department"
                                                value={employee.department}
                                                onChange={(event) =>
                                                    setEmployees(
                                                        employees.map((emp) =>
                                                            emp.id === employee.id
                                                                ? { ...emp, department: event.target.value }
                                                                : emp
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            employee.department
                                        )}
                                    </td>
                                    <td>
                                        {employee.editing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="phone"
                                                value={employee.phone}
                                                onChange={(event) =>
                                                    setEmployees(
                                                        employees.map((emp) =>
                                                            emp.id === employee.id
                                                                ? { ...emp, phone: event.target.value }
                                                                : emp
                                                        )
                                                    )
                                                }
                                            />
                                        ) : (
                                            employee.phone
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => handleEditClick(employee.id)}
                                        >
                                            {employee.editing ? "Save" : "Edit"}
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteClick(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {showAddRow && (
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={newEmployee.name}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="department"
                                            value={newEmployee.department}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={newEmployee.phone}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-success" onClick={handleAddClick}>
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
export default EmployeeTable;
