// import React, { useState, useEffect } from "react";
// import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import axios from "axios";
// import { getToken } from "../../_services/account.services";

// function AddEditForm(props) {
//   const [form, setValues] = useState({

//   });

//   const onChange = (e) => {
//     setValues({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const submitFormAdd = (e) => {
//     e.preventDefault();

// const serveur = {
//   _id: form._id,
//   IPManagment: form.IPManagment,
//   RAM: form.RAM,
//   IP: form.IP,
//   Model: form.Model,
//   Rack: form.Rack,
//   Pod: form.Pod,
//   Owner: form.Owner,
//   serveurname: form.serveurname,
//   password: form.password
// }

//     axios.post('http://localhost:3001/serveurs/add', serveur, {
//       headers: {
//         'Authorization': `Bearer ${getToken()}`
//       }
//     })
//       .then(response => {
//         const item = response.data;
//         if (Array.isArray(item)) {
//           props.addItemToState(item[0])
//           props.toggle()
//         } else {
//           console.log('failure')
//         }
//         //refresh the page
//         //window.location.reload(false);
//       })
//       .catch(err => console.log(err))


//     props.addItemToState(form);
//     props.toggle();
//   };

//   const submitFormEdit = (e) => {
//     e.preventDefault();
//     props.updateState(form);
//     props.toggle();
//   };



//   useEffect(() => {
//     if (props.item) {
//   const { _id, Login, Password, Model, IP, IPManagment, RAM, CPU, ConsommationRAM, ConsommationCPU, Uptime, Owner, Role, Rack } = props.item;
//   setValues({ _id, Login, Password, Model, IP, IPManagment, RAM, CPU, ConsommationRAM, ConsommationCPU, Uptime, Owner, Role, Rack });
// }
//   }, [props.item]);

// return (
//   <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>

//     <FormGroup>
//       <Label for="first">ServeurID</Label>
//       <Input
//         type="text"
//         name="_id"
//         id="_id"
//         onChange={onChange}
//         value={form._id === null ? "" : form._id}

//         placeholder="315631653"
//       />
//     </FormGroup>


//     <FormGroup>
//       <Label for="IPManagment">IPManagment</Label>
//       <Input
//         type="text"
//         name="IPMANAGEMENT"
//         id="IPManagment"
//         onChange={onChange}
//         value={form.IPManagment === null ? "" : form.IPManagment}
//         placeholder="5645154"
//       />
//     </FormGroup>

//     <FormGroup>
//       <Label for="Model">Model</Label>
//       <Input
//         type="text"
//         name="Model"
//         id="Model"
//         onChange={onChange}
//         value={form.Model === null ? "" : form.Model}
//         placeholder="Model"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="IP">IP</Label>
//       <Input
//         type="text"
//         name="IP"
//         id="IP"
//         onChange={onChange}
//         value={form.IP === null ? "" : form.IP}
//         placeholder="IP"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="Pod">Pod</Label>
//       <Input
//         type="text"
//         name="Pod"
//         id="Pod"
//         onChange={onChange}
//         value={form.Pod === null ? "" : form.Pod}
//         placeholder="Pod"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="Owner">Owner</Label>
//       <Input
//         type="text"
//         name="Owner"
//         id="Owner"
//         onChange={onChange}
//         value={form.Owner === null ? "" : form.Owner}
//         placeholder="Owner"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="serveurname">serveurname</Label>
//       <Input
//         type="text"
//         name="serveurname"
//         id="serveurname"
//         onChange={onChange}
//         value={form.Login === null ? "" : form.Login}
//         placeholder="serveurname"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="Password">Password</Label>
//       <Input
//         type="text"
//         name="password"
//         id="Password"
//         onChange={onChange}
//         value={form.password === null ? "" : form.password}
//         placeholder="password"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="Uptime">Uptime</Label>
//       <Input
//         type="text"
//         name="Uptime"
//         id="Uptime"
//         onChange={onChange}
//         value={form.Uptime === null ? "" : form.Uptime}
//         placeholder="Uptime"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="ConsommationCPU">ConsommationCPU</Label>
//       <Input
//         type="text"
//         name="ConsommationCPU"
//         id="ConsommationCPU"
//         onChange={onChange}
//         value={form.ConsommationCPU === null ? "" : form.ConsommationCPU}
//         placeholder="ConsommationCPU"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="Model">ConsommationRAM</Label>
//       <Input
//         type="text"
//         name="ConsommationRAM"
//         id="ConsommationRAM"
//         onChange={onChange}
//         value={form.ConsommationRAM === null ? "" : form.ConsommationRAM}
//         placeholder="ConsommationRAM"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="Role">Role</Label>
//       <Input
//         type="text"
//         name="Role"
//         id="Role"
//         onChange={onChange}
//         value={form.Role === null ? "" : form.Role}
//         placeholder="Role"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="Rack">Rack</Label>
//       <Input
//         type="text"
//         name="Rack"
//         id="Rack"
//         onChange={onChange}
//         value={form.Rack === null ? "" : form.Rack}
//         placeholder="Rack"
//       />
//     </FormGroup>
//     <FormGroup>
//       <Label for="RAM">RAM</Label>
//       <Input
//         type="text"
//         name="RAM"
//         id="RAM"
//         onChange={onChange}
//         value={form.RAM === null ? "" : form.RAM}
//         placeholder="RAM"
//       />
//     </FormGroup>
//     <Button>Submit</Button>
//   </Form>
// );
// }

// export default AddEditForm;


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
      _id: form._id,
      IPManagment: form.IPManagment,
      RAM: form.RAM,
      IP: form.IP,
      Model: form.Model,
      Rack: form.Rack,
      Pod: form.Pod,
      Owner: form.Owner,
      serveurname: form.serveurname,
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
        window.location.reload(false);
      })
      .catch(err => console.log(err))

  };

  const submitFormEdit = (e) => {
    e.preventDefault();
    const serveur = {
      Nom: form.Nom,
      Prenom: form.Prenom,
      serveurname: form.serveurname,
      Password: form.Password
    }
    console.log(serveur);

    axios.put(`http://localhost:3001/serveurs/${form._id}`, serveur, {
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
      const { _id, Login, Password, Model, IP, IPManagment, RAM, CPU, ConsommationRAM, ConsommationCPU, Uptime, Owner, Role, Rack } = props.item;
      setValues({ _id, Login, Password, Model, IP, IPManagment, RAM, CPU, ConsommationRAM, ConsommationCPU, Uptime, Owner, Role, Rack });
    }
  }, [props.item]);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>

      <FormGroup>
        <Label for="first">ServeurID</Label>
        <Input
          type="text"
          name="_id"
          id="_id"
          onChange={onChange}
          value={form._id === null ? "" : form._id}

          placeholder="315631653"
        />
      </FormGroup>


      <FormGroup>
        <Label for="IPManagment">IPManagment</Label>
        <Input
          type="text"
          name="IPMANAGEMENT"
          id="IPManagment"
          onChange={onChange}
          value={form.IPManagment === null ? "" : form.IPManagment}
          placeholder="5645154"
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
          name="Owner"
          id="Owner"
          onChange={onChange}
          value={form.Owner === null ? "" : form.Owner}
          placeholder="Owner"
        />
      </FormGroup>
      <FormGroup>
        <Label for="serveurname">serveurname</Label>
        <Input
          type="text"
          name="serveurname"
          id="serveurname"
          onChange={onChange}
          value={form.Login === null ? "" : form.Login}
          placeholder="serveurname"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Password">Password</Label>
        <Input
          type="text"
          name="password"
          id="Password"
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
        <Label for="ConsommationCPU">ConsommationCPU</Label>
        <Input
          type="text"
          name="ConsommationCPU"
          id="ConsommationCPU"
          onChange={onChange}
          value={form.ConsommationCPU === null ? "" : form.ConsommationCPU}
          placeholder="ConsommationCPU"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Model">ConsommationRAM</Label>
        <Input
          type="text"
          name="ConsommationRAM"
          id="ConsommationRAM"
          onChange={onChange}
          value={form.ConsommationRAM === null ? "" : form.ConsommationRAM}
          placeholder="ConsommationRAM"
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
          placeholder="Role"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Rack">Rack</Label>
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
        <Label for="RAM">RAM</Label>
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


