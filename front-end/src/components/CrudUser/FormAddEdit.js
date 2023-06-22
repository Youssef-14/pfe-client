import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { getToken } from "../../_services/account.services";

function AddEditForm(props) {
  const [validationErrors, setValidationErrors] = useState(null);
  const [form, setValues] = useState({

  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitFormAdd = (e) => {
    e.preventDefault();    
    
    const validations = [
      { field: "Username", minLength: 3, message: "Username trop court" },
      { field: "Nom", minLength: 3, message: "Nom trop court" },
      { field: "Prenom", minLength: 3, message: "Prenom trop court" },
      { field: "Password", minLength: 5, message: "Mot de passe trop court" },
    ];    
    
    for (const validation of validations) {
      if (form[validation.field].length < validation.minLength) {
        setValidationErrors(validation.message);
        return;
      }
    }

    if (!["admin", "utilisateur"].includes(form.Role.toLowerCase())) {
      setValidationErrors("Role doit être admin ou user");
      return;
    }
    

    const user = {
      Nom: form.Nom, //form.Nom,
      Prenom: form.Prenom,
      Username: form.Username,
      Password: form.Password,
      Role: form.Role
    }
    


    axios.post('http://localhost:3001/users/signup', user, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then(response => {
        const item = response.data;
        if (Array.isArray(item)) {
          props.addItemToState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
        //refresh the page
        window.location.reload(false);
      })
      .catch(err => console.log(err))
  };

  const submitFormEdit = (e) => {
    e.preventDefault();

    const validations = [
      { field: "Username", minLength: 3, message: "Username trop court" },
      { field: "Nom", minLength: 3, message: "Nom trop court" },
      { field: "Prenom", minLength: 3, message: "Prenom trop court" },
      { field: "Password", minLength: 5, message: "Mot de passe trop court" },
    ];    
    
    for (const validation of validations) {
      if (form[validation.field].length < validation.minLength) {
        setValidationErrors(validation.message);
        return;
      }
    }

    if (!["admin", "utilisateur"].includes(form.Role.toLowerCase())) {
      setValidationErrors("Role doit être admin ou user");
      return;
    }
    
    
    const user = {
      Nom: form.Nom,
      Prenom: form.Prenom,
      Username: form.Username,
      Password: form.Password,
      Role: form.Role
    }

    axios.put(`http://localhost:3001/users/update/${form._id}`, user, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then((response) => {
        const item = response.data;
        if (Array.isArray(item)) {
          props.updateState(item[0]);
          props.toggle();
        } else {
          console.log("failure");
        }
        //refresh the page
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.item) {
      const { _id, Username, Nom, Prenom, Password, Role } = props.item;
      setValues({ _id, Username, Nom, Prenom, Password ,Role });
    }
  }, [props.item]);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      {validationErrors != null && (
        <div className="alert alert-danger" role="alert">
          {validationErrors}
        </div>
      )}
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="text"
          name="Username"
          id="username"
          onChange={onChange}
          value={form.Username === null ? "" : form.Username}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="nom">Nom</Label>
        <Input
          type="text"
          name="Nom"
          id="nom"
          onChange={onChange}
          value={form.Nom == null ? "" : form.Nom}
          required
        />

      </FormGroup>
      <FormGroup>
        <Label for="prenom">Prenom</Label>
        <Input
          type="text"
          name="Prenom"
          id="prenom"
          onChange={onChange}
          value={form.Prenom === null ? "" : form.Prenom}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="text"
          name="Password"
          id="password"
          onChange={onChange}
          value={form.Password === null ? '' : form.Password}
          placeholder="Password"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="Role">Role</Label>
        <br />
        <input type="radio" name="Role" id="Admin" value="Admin" onChange={onChange}  checked={form.Role === "Admin"} required  />
        <label htmlFor="Admin" style={{marginRight:"10px" }}>Admin</label>

        <input type="radio" name="Role" id="User" value="Utilisateur" onChange={onChange} checked={form.Role === "Utilisateur"} required />
        <label htmlFor="User">User</label>

        {/* <Input
       

        <Input
          type="text"
          name="Role"
          id="Role"
          onChange={onChange}
          value={form.Role === null ? "" : form.Role}
          placeholder="user/admin"
        />
      </FormGroup> */}
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditForm;