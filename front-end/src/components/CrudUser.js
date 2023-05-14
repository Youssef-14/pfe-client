import React, { useState, useEffect } from "react";
import axios from "axios";
import CRUDTable, {
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm,
} from "react-crud-table";

// Component's Base CSS
import "../components/style/Crud.css";

const SORTERS = {
    NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: (mapper) => (a, b) =>
        mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: (mapper) => (a, b) =>
        mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
    const mapper = (x) => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);

    if (data.field === "id") {
        sorter =
            data.direction === "ascending"
                ? SORTERS.NUMBER_ASCENDING(mapper)
                : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
        sorter =
            data.direction === "ascending"
                ? SORTERS.STRING_ASCENDING(mapper)
                : SORTERS.STRING_DESCENDING(mapper);
    }

    return sorter;
};

const service = {
    fetchItems: () =>
        axios.get("http://localhost:3001/users/getaccounts").then((response) => {
            return Promise.resolve(response.data);
        }),
    create: (User) => {
        // Implement create operation
        return Promise.resolve(User);
    },
    update: (data) => {
        // Implement update operation
        return Promise.resolve(data);
    },
    delete: (data) => {
        // Implement delete operation
        return Promise.resolve(data);
    },
};



const styles = {
    container: { margin: "auto", width: "fit-content" },
};

const CrudUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        service.fetchItems().then((data) => {
            setUsers(data);
        });
    }, []);

    return (
        <div style={styles.container}>
            <CRUDTable
                caption="Users List"
                fetchItems={() => Promise.resolve(users)}
            >
                <Fields>
                    <Field name="_id" label="USERID" hideInCreateForm hideInUpdateForm />
                    <Field name="Nom" label="Nom" placeholder="Nom" />
                    <Field name="Prenom" label="Prénom" placeholder="Prénom" />
                    <Field name="Password" label="Mot de passe" />
                    <Field name="Role" label="Privillège" />
                </Fields>
                <CreateForm
                    name="User Creation"
                    message="Create a new User!"
                    trigger="Create User"
                    onSubmit={(User) => service.create(User)}
                    submitText="Create"
                    validate={(values) => {
                        const errors = {};
                        if (!values.Nom) {
                            errors.Nom = "Please, provide User's Nom";
                        }

                        if (!values.Prénom) {
                            errors.Prénom = "Please, provide User's Prénom";
                        }

                        if (!values["Mot de passe"]) {
                            errors["Mot de passe"] = "Please, provide User's Mot de passe";
                        }

                        if (!values.Privillège) {
                            errors.Privillège = "Please, provide the user's Privillège";
                        } return errors;
                    }}
                />

                <UpdateForm
                    name="User Update Process"
                    message="Update User"
                    trigger="Update"
                    onSubmit={(user) => {
                        const { id, ...updatedUser } = user;
                        return axios
                            .put(`http://localhost:3001/users/getaccounts/${id}`, updatedUser)
                            .then((response) => {
                                const { data } = response;
                                const updatedItem = {
                                    id: data.id,
                                    name: data.Nom,
                                    Prénom: data.Prénom,
                                    "Mot de passe": data["Mot de passe"],
                                    Privillège: data.Privillège,
                                };
                                const index = users.findIndex((user) => user.id === data.id);
                                if (index !== -1) {
                                    users.splice(index, 1, updatedItem);
                                }
                                return data;
                            });
                    }}
                    submitText="Update"
                    validate={(values) => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = "Please, provide User's name";
                        }

                        if (!values.Prénom) {
                            errors.Prénom = "Please, provide the user's Prénom";
                        }

                        if (!values["Mot de passe"]) {
                            errors["Mot de passe"] = "Please, provide the user's Mot de passe";
                        }

                        if (!values.Privillège) {
                            errors.Privillège = "Please, provide the user's Privillège";
                        }

                        return errors;
                    }}
                />

                <DeleteForm
                    name="User Delete Process"
                    message="Are you sure you want to delete User?"
                    trigger="Delete"
                    onSubmit={(user) => {
                        return axios
                            .delete(`http://localhost:3001/users/getaccounts/${user.id}`)
                            .then((response) => {
                                const { data } = response;
                                const index = users.findIndex((user) => user.id === data.id);
                                if (index !== -1) {
                                    users.splice(index, 1);
                                }
                                return data;
                            });
                    }}
                    submitText="Delete"
                    validate={(values) => {
                        const errors = {};
                        if (!values.id) {
                            errors.id = "Please, provide id";
                        }
                        return errors;
                    }}
                />
            </CRUDTable>
        </div>
    );
};

export default CrudUser;
