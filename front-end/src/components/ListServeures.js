import React, { useState, useEffect } from "react";
import axios from "axios";
import CRUDTable, {
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm
} from "react-crud-table";

// Component's Base CSS
import "../components/style/Crud.css";

const IPRenderer = ({ field }) => <textarea {...field} />;

const service = {
    fetchItems: () => axios.get("http://localhost:3001/serveurs/get").then(res => res.data),
    create: server => Promise.resolve(server),
    update: data => Promise.resolve(data),
    delete: data => Promise.resolve(data)
};

const styles = {
    container: { margin: "auto", width: "fit-content" }
};

const ListServeures = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        service.fetchItems().then(res => setData(res));
    }, []);

    return (
        <div className="outer">
            <div style={styles.container}>
                <CRUDTable
                    caption="server List"
                    fetchItems={payload => Promise.resolve(data)}
                >
                    <Fields>


                        <Field name="_id" label="server ID" hideInCreateForm hideInUpdateForm />
                        <Field name="Login" label="Name" placeholder="Name" />
                        <Field name="IP" label="IP" />
                        <Field name="IPManagment" label="IP Management" />
                        <Field name="RAM" label="RAM" />
                        <Field name="CPU" label="CPU" />
                        <Field name="Model" label="Modèle" />
                        <Field name="Constructeur" label="Constructeur" />
                        <Field name="Rack" label="RACK" />
                        <Field name="POD" label="POD" />
                        <Field name="Owner" label="Owner" />
                        <Field name="Username" label="Username" />
                        <Field name="Password" label="Password" />



                    </Fields>

                    <CreateForm
                        name="server Creation"
                        message="Create a new server!"
                        trigger="Create server"
                        onSubmit={server => service.create(server)}
                        submitText="Create"
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = "Please, provide server's name";
                            }

                            if (!values.IP) {
                                errors.IP = "Please, provide server's IP";
                            }

                            return errors;
                        }}
                    />

                    <UpdateForm
                        name="server Update Process"
                        message="Update server"
                        trigger="Update"
                        onSubmit={server => service.update(server)}
                        submitText="Update"
                        validate={values => {
                            const errors = {};
                            if (!values.Name) {
                                errors.Name = "Please, provide server's name";
                            }

                            if (!values.IP) {
                                errors.IP = "Please, provide stundent's IP";
                            }

                            return errors;
                        }}
                    />

                    <DeleteForm
                        name="server Delete Process"
                        message="Are you sure you want to delete server?"
                        trigger="Delete"
                        onSubmit={server => service.delete(server)}
                        submitText="Delete"
                        validate={values => {
                            const errors = {};
                            if (!values.id) {
                                errors.id = "Please, provide id";
                            }
                            return errors;
                        }}
                    />
                </CRUDTable>
            </div>
        </div>
    );
};

export default ListServeures;