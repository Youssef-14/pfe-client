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

const apiUrl = "http://localhost:3001/racks/get";

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

const DC_VISUALISATION = () => {
    const [racks, setRacks] = useState([]);

    useEffect(() => {
        axios.get(apiUrl).then((response) => {
            setRacks(response.data);

        });
    }, []);

    const service = {
        fetchItems: (payload) => {
            let result = Array.from(racks);
            result = result.sort(getSorter(payload.sort));
            return Promise.resolve(result);
        },
        create: (rack) => {
            const newRack = { ...rack };
            axios.post(apiUrl, newRack).then((response) => {
                setRacks([...racks, response.data]);
            });
            return Promise.resolve(newRack);
        },
        update: (data) => {
            const updatedRack = { ...data };
            axios.put(`${apiUrl}/${data.id}`, updatedRack).then((response) => {
                const updatedRacks = [...racks];
                const index = updatedRacks.findIndex((r) => r.id === response.data.id);
                updatedRacks[index] = response.data;
                setRacks(updatedRacks);
            });
            return Promise.resolve(updatedRack);
        },
        delete: (data) => {
            axios.delete(`${apiUrl}/${data.id}`).then(() => {
                setRacks(racks.filter((r) => r.id !== data.id));
            });
            return Promise.resolve(data);
        },
    };

    const styles = {
        container: { margin: "auto", width: "fit-content" },
    };

    return (
        <div style={styles.container}>
            <CRUDTable caption="Racks List" fetchItems={(payload) => service.fetchItems(payload)}>
                <Fields>
                    <Field name="id" label="Rack ID" hideInCreateForm hideInUpdateForm />
                    <Field name="name" label="Name" placeholder="Name" />
                    <Field name="description" label="Description" placeholder="Description" />
                </Fields>
                <CreateForm
                    name="Rack Creation"
                    message="Create a new rack!"
                    trigger="Create Rack"
                    onSubmit={(rack) => {
                        axios.post("http://localhost:3001/racks/add", rack)
                            .then((response) => {
                                // Add the new rack to the local array
                                const newRack = response.data;
                                racks.push(newRack);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}
                    submitText="Create"
                    validate={(values) => {
                        const errors = {};
                        if (!values.rack_number) {
                            errors.rack_number = "Please, provide rack number";
                        }
                        return errors;
                    }}
                />    <UpdateForm
                    name="Rack Update Process"
                    message="Update Rack"
                    trigger="Update"
                    onSubmit={(rack) => {
                        axios.put(`http://localhost:3001/racks/put/${rack.id}`, rack)
                            .then((response) => {
                                // Update the local array with the updated rack
                                const updatedRack = response.data;
                                const index = racks.findIndex((r) => r.id === updatedRack.id);
                                racks[index] = updatedRack;
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}
                    submitText="Update"
                    validate={(values) => {
                        const errors = {};
                        if (!values.rack_number) {
                            errors.rack_number = "Please, provide rack number";
                        }
                        return errors;
                    }}
                />

                <DeleteForm
                    name="Rack Delete Process"
                    message="Are you sure you want to delete Rack?"
                    trigger="Delete"
                    onSubmit={(rack) => {
                        axios.delete(`http://localhost:3001/racks/delete/${rack.id}`)
                            .then((response) => {
                                // Remove the deleted rack from the local array
                                racks = racks.filter((r) => r.id !== rack.id);
                            })
                            .catch((error) => {
                                console.error(error);
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

export default DC_VISUALISATION;
