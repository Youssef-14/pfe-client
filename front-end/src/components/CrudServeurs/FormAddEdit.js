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
      const { _id, IP, IPManagment, RAM, Model, Rack, Pod, Owner, username, password } = props.item;
      setValues({ _id, IP, IPManagment, RAM, Model, Rack, Pod, Owner, username, password });
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
          name="last"
          id="last"
          onChange={onChange}
          value={form.IPManagment === null ? "" : form.IPManagment}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">RAM</Label>
        <Input
          type="email"
          name="email"
          id="email"
          onChange={onChange}
          value={form.RAM === null ? "" : form.RAM}
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
        <Label for="Rack">Rack</Label>
        <Input
          type="text"
          name="location"
          id="location"
          onChange={onChange}
          value={form.Rack === null ? "" : form.Rack}
          placeholder="Rack"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Pod">Pod</Label>
        <Input
          type="text"
          name="location"
          id="location"
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
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditForm;
