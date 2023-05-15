import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

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
    console.log(props.item);
    e.preventDefault();

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
        <Label for="last">Login</Label>
        <Input
          type="text"
          name="last"
          id="last"
          onChange={onChange}
          value={form.Login === null ? "" : form.Login}
          placeholder="Login"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input
          type="Password"
          name="Password"
          id="Password"
          onChange={onChange}
          value={form.Password === null ? "" : form.Password}
          placeholder="Password"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">Model</Label>
        <Input
          type="text"
          name="Model"
          id="Model"
          onChange={onChange}
          value={form.Model === null ? "" : form.Model}
          placeholder="Model"
        />
      </FormGroup>
      <FormGroup>
        <Label for="IP">IP</Label>
        <Input
          type="text"
          name="IP"
          id="IP"
          onChange={onChange}
          value={form.IP === null ? "" : form.IP}
          placeholder="IP"
        />
      </FormGroup>
      <FormGroup>
        <Label for="IPManagment">IPManagment</Label>
        <Input
          type="text"
          name="IPManagment"
          id="IPManagment"
          onChange={onChange}
          value={form.Pod === null ? "" : form.Pod}
          placeholder="IPManagment"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Owner">Owner</Label>
        <Input
          type="text"
          name="Owner"
          id="Owner"
          onChange={onChange}
          value={form.Owner === null ? "" : form.Owner}
          placeholder="Owner"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">username</Label>
        <Input
          type="text"
          name="location"
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
          name="location"
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
