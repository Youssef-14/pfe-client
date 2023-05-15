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
      Libelle: form.Libelle, //form.Libelle,
      Description: form.Description,
      Capacite: form.Capacite
    }

    axios.post('http://localhost:3001/datacenters/add', user,{
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
      Libelle: form.Libelle,
      Description: form.Description,
      Capacite: form.Capacite

    }
    console.log(user);

    axios.put(`http://localhost:3001/datacenters/${form._id}`, user,{
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
      const { _id, Capacite, Libelle, Description, } = props.item;
      setValues({ _id, Capacite, Libelle, Description, });
    }
  }, [props.item]);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="Capacite">Capacite</Label>
        <Input
          type="text"
          name="Capacite"
          id="Capacite"
          onChange={onChange}
          value={form.Capacite === null ? "" : form.Capacite}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Libelle">Libelle</Label>
        <Input
          type="text"
          name="Libelle"
          id="Libelle"
          onChange={onChange}
          value={form.Libelle == null ? "" : form.Libelle}
        />

      </FormGroup>
      <FormGroup>
        <Label for="Description">Description</Label>
        <Input
          type="text"
          name="Description"
          id="Description"
          onChange={onChange}
          value={form.Description === null ? "" : form.Description}
        />
      </FormGroup>

      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditForm;