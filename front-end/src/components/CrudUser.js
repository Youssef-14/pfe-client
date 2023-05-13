import React from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm
} from "react-crud-table";

// Component's Base CSS
import "../components/style/Crud.css";



let Users = [
    {
        id: 1,
        name: "Tran Manh Cuong",
        description: "User from class SE1604"
    },
    {
        id: 2,
        name: "Tran Van Nhan",
        description: "User from class SE1602"
    },
];

const SORTERS = {
    NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
    const mapper = x => x[data.field];
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

let count = Users.length;
const service = {
    fetchItems: payload => {
        let result = Array.from(Users);
        result = result.sort(getSorter(payload.sort));
        return Promise.resolve(result);
    },
    create: User => {
        count += 1;
        Users.push({
            ...User,
            id: count
        });
        return Promise.resolve(User);
    },
    update: data => {
        const User = Users.find(t => t.id === data.id);
        User.name = data.name;
        User.description = data.description;
        return Promise.resolve(User);
    },
    delete: data => {
        const User = Users.find(t => t.id === data.id);
        Users = Users.filter(t => t.id !== User.id);
        return Promise.resolve(User);
    }
};

const styles = {
    container: { margin: "auto", width: "fit-content" }
};

const CrudUser = () => (
    <div style={styles.container}>
        <CRUDTable
            caption="Users List"
            fetchItems={payload => service.fetchItems(payload)}
        >
            <Fields>
                <Field name="id" label="USERID" hideInCreateForm hideInUpdateForm />
                <Field name="name" label="Nom" placeholder="Name" />

                <Field name="Prénom" label="Prénom" placeholder="Prénom" />
                <Field name="Mot de passe" label="Mot de passe" />
                <Field name="Privillège" label="Privillège" />

            </Fields>
            <CreateForm
                name="User Creation"
                message="Create a new User!"
                trigger="Create User"
                onSubmit={User => service.create(User)}
                submitText="Create"
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = "Please, provide User's name";
                    }

                    if (!values.description) {
                        errors.description = "Please, provide User's description";
                    }

                    return errors;
                }}
            />

            <UpdateForm
                name="User Update Process"
                message="Update User"
                trigger="Update"
                onSubmit={User => service.update(User)}
                submitText="Update"
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = "Please, provide User's name";
                    }

                    if (!values.description) {
                        errors.description = "Please, provide stundent's description";
                    }

                    return errors;
                }}
            />

            <DeleteForm
                name="User Delete Process"
                message="Are you sure you want to delete User?"
                trigger="Delete"
                onSubmit={User => service.delete(User)}
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
); export default CrudUser

