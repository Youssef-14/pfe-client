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
    // fetch('http://localhost:3000/crud', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     first: form.first,
    //     last: form.last,
    //     email: form.email,
    //     phone: form.phone,
    //     location: form.location,
    //     hobby: form.hobby
    //   })
    // })
    //   .then(response => response.json())
    //   .then(item => {
    //     if(Array.isArray(item)) {
    //       props.addItemToState(item[0])
    //       props.toggle()
    //     } else {
    //       console.log('failure')
    //     }
    //   })
    //   .catch(err => console.log(err))
    props.addItemToState(form);
    props.toggle();
  };

  const submitFormEdit = (e) => {
    e.preventDefault();
    // fetch("http://localhost:3000/crud", {
    //   method: "put",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     id: form.id,
    //     first: form.first,
    //     last: form.last,
    //     email: form.email,
    //     phone: form.phone,
    //     location: form.location,
    //     hobby: form.hobby
    //   })
    // })
    //   .then((response) => response.json())
    //   .then((item) => {
    //     if (Array.isArray(item)) {
    //       // console.log(item[0])
    //       props.updateState(item[0]);
    //       props.toggle();
    //     } else {
    //       console.log("failure");
    //     }
    //   })
    //   .catch((err) => console.log(err));
    props.updateState(form);
    props.toggle();
  };

  useEffect(() => {
    if (props.item) {
      const { _id,Username, Nom,Prenom, Password } = props.item;
      setValues({ _id, Username,Nom,Prenom, Password });
    }
  }, [props.item]);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="first">Username</Label>
        <Input
          type="text"
          name="first"
          id="first"
          onChange={onChange}
          value={form.Username === null ? "" : form.Username}
        />
      </FormGroup>
      <FormGroup>
        <Label for="last">Name</Label>
        <Input
          type="text"
          name="last"
          id="last"
          onChange={onChange}
          value={form.Nom === null ? "" : form.Nom}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Prenom</Label>
        <Input
          type="email"
          name="email"
          id="email"
          onChange={onChange}
          value={form.Prenom === null ? "" : form.Prenom}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="text"
          name="location"
          id="location"
          onChange={onChange}
          value={form.Password === null ? "" : form.Password}
          placeholder="Password"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditForm;
