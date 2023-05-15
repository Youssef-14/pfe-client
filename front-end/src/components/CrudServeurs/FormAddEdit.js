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

    const serveur = {
      IP: form.IP,
      IPManagment: form.IPManagment,
      RAM: form.RAM,
      Model: form.Model,
      Rack: form.Rack,
      Pod: form.Pod,
      Owner: form.Owner,
      username: form.username,
      password: form.password
    }

    axios.post('http://localhost:3001/serveurs/add', serveur, {
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
        //window.location.reload(false);
      })
      .catch(err => console.log(err))


    props.addItemToState(form);
    props.toggle();
  };

  const submitFormEdit = (e) => {
    e.preventDefault();
    props.updateState(form);
    props.toggle();
  };

  useEffect(() => {
    if (props.item) {
      const { Login, Password, Model, IP, IPManagment, RAM, CPU, ConsommationRAM, ConsommationCPU, Uptime, Owner, Role, Rack } = props.item;
      setValues({ Login, Password, Model, IP, IPManagment, RAM, CPU, ConsommationRAM, ConsommationCPU, Uptime, Owner, Role, Rack });
    }
  }, [props.item]);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>

      <FormGroup>
        <Label for="first">IP</Label>
        <Input
          type="text"
          name="first"
          id="first"
          onChange={onChange}
          value={form.IP === null ? "" : form.IP}
        />
      </FormGroup>
      <FormGroup>
        <Label for="last">IPManagment</Label>
        <Input
          type="text"
          name="IPMANAGEMENT"
          id="last"
          onChange={onChange}
          value={form.Login === null ? "" : form.Login}
          placeholder="Login"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input
          type="email"
          name="email"
          id="email"
          onChange={onChange}
          value={form.Password === null ? "" : form.Password}
          placeholder="Password"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">Model</Label>
        <Input
          type="text"
          name="location"
          id="location"
          onChange={onChange}
          value={form.Model === null ? "" : form.Model}
          placeholder="Model"
        />
      </FormGroup>
      <FormGroup>
        <Label for="IP">IP</Label>
        <Input
          type="text"
          name="location"
          id="location"
          onChange={onChange}
          value={form.IP === null ? "" : form.IP}
          placeholder="IP"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Pod">Pod</Label>
        <Input
          type="text"
          name="Pod"
          id="Pod"
          onChange={onChange}
          value={form.Pod === null ? "" : form.Pod}
          placeholder="Pod"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Owner">Owner</Label>
        <Input
          type="text"
          name="location"
          id="location"
          onChange={onChange}
          value={form.Owner === null ? "" : form.Owner}
          placeholder="Owner"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">username</Label>
        <Input
          type="text"
          name="username"
          id="location"
          onChange={onChange}
          value={form.username === null ? "" : form.username}
          placeholder="username"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">Password</Label>
        <Input
          type="text"
          name="password"
          id="location"
          onChange={onChange}
          value={form.password === null ? "" : form.password}
          placeholder="password"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Uptime">Uptime</Label>
        <Input
          type="text"
          name="Uptime"
          id="Uptime"
          onChange={onChange}
          value={form.Uptime === null ? "" : form.Uptime}
          placeholder="Uptime"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">ConsommationCPU</Label>
        <Input
          type="text"
          name="location"
          id="location"
          onChange={onChange}
          value={form.ConsommationCPU === null ? "" : form.ConsommationCPU}
          placeholder="ConsommationCPU"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">ConsommationRAM</Label>
        <Input
          type="text"
          name="location"
          id="location"
          onChange={onChange}
          value={form.ConsommationRAM === null ? "" : form.ConsommationRAM}
          placeholder="ConsommationRAM"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">Role</Label>
        <Input
          type="text"
          name="Role"
          id="Role"
          onChange={onChange}
          value={form.Role === null ? "" : form.Role}
          placeholder="Role"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">Rack</Label>
        <Input
          type="text"
          name="Rack"
          id="Rack"
          onChange={onChange}
          value={form.Rack === null ? "" : form.Rack}
          placeholder="Rack"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">RAM</Label>
        <Input
          type="text"
          name="RAM"
          id="RAM"
          onChange={onChange}
          value={form.RAM === null ? "" : form.RAM}
          placeholder="RAM"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditForm;
