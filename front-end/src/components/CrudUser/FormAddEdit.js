import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { getToken } from "../../_services/account.services";

function AddEditForm(props) {
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

    const user = {
      Nom: form.Nom, //form.Nom,
      Prenom: form.Prenom,
      Username: form.Username,
      Password: form.Password
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
    const user = {
      Nom: form.Nom,
      Prenom: form.Prenom,
      Username: form.Username,
      Password: form.Password
    }
    console.log(user);

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
      const { _id, Username, Nom, Prenom, Password, } = props.item;
      setValues({ _id, Username, Nom, Prenom, Password });
    }
  }, [props.item]);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="text"
          name="Username"
          id="username"
          onChange={onChange}
          value={form.Username === null ? "" : form.Username}
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
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="text"
          name="Password"
          id="password"
          onChange={onChange}
          value={form.Password === null ? "" : form.Password}
          placeholder="Password"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Role">Role</Label>
        <Input
          type="text"
          name="Role"
          id="Role"
          onChange={onChange}
          value={form.Role === null ? "" : form.Role}
          placeholder="user/admin"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditForm;