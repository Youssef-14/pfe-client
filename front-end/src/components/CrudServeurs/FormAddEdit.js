import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { getToken } from "../../_services/account.services";

function AddEditForm(props) {
  const [form, setValues] = useState({
    IP: ""
  });
  const [validationError, setValidationError] = useState(null);
  const [dataCenters, setDataCenters] = useState([]);
  const [selectedDataCenter, setSelectedDataCenter] = useState('');
  const [pods, setPods] = useState([]);
  const [selectedPod, setSelectedPod] = useState('');
  const [racks, setRacks] = useState([]);


  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validateIP = (ip) => {
    const ipAddressRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    return ipAddressRegex.test(ip);
  };


  const submitFormAdd = (e) => {
    e.preventDefault();

    console.log(form);

    const serveur = {
      IPManagement: form.IPManagement,
      RAM: form.RAM,
      IP: form.IP,
      Model: form.Model,
      Rack: form.Rack,
      Pod: form.Pod,
      Owner: form.Owner,
      Login: form.Login,
      Password: form.Password,
      CPU: form.CPU,
      ConsommationCPU: form.ConsommationCPU,
      ConsommationRAM: form.ConsommationRAM,
      Uptime: form.Uptime,
      Role: form.Role
    }
    console.log(serveur);

    axios.post('http://localhost:3001/serveurs/add', serveur, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then(response => {
        console.log(response.data);
        //refresh the page
        window.location.reload(false);
      })
      .catch(err => console.log(err))


    props.addItemToState(form);
    props.toggle();
  };

  const fetchDataCenters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/datacenters/get', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setDataCenters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataCenterChange = (event) => {
    const selectedDataCenterId = event.target.value;
    setSelectedDataCenter(selectedDataCenterId);
    setSelectedPod('');
    setRacks([]);

    if (selectedDataCenterId) {
      fetchPods(selectedDataCenterId);
    }
  };

  const handlePodChange = (event) => {
    const selectedPodId = event.target.value;
    setSelectedPod(selectedPodId);
    setRacks([]);

    if (selectedPodId) {
      fetchRacks(selectedPodId);
    }
  };

  const fetchPods = async (dataCenterId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/pods/get/datacenter/${dataCenterId}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setPods(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRacks = async (podId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/racks/get/pod/${podId}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      setRacks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitFormEdit = (e) => {
    e.preventDefault();
    const serveur = {
      IPManagement: form.IPManagement,
      RAM: form.RAM,
      IP: form.IP,
      Model: form.Model,
      Rack: form.Rack,
      Pod: form.Pod,
      Owner: form.Owner,
      Login: form.Login,
      Password: form.Password,
      CPU: form.CPU,
      ConsommationCPU: form.ConsommationCPU,
      ConsommationRAM: form.ConsommationRAM,
      Uptime: form.Uptime,
      Role: form.Role
    }
    axios.put(`http://localhost:3001/serveurs/${form._id}`, serveur, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then(response => {
        const item = response.data;
        console.log(item);
        //refresh the page
        window.location.reload(false);
      })
      .catch(err => console.log(err))
    props.updateState(form);
    props.toggle();
  };



  useEffect(() => {
    fetchDataCenters();
    if (props.item) {
      const { _id, Login, Password, Model, IP, IPManagement, RAM, CPU, ConsommationRAM, ConsommationCPU, Uptime, Owner, Role, Rack } = props.item;
      setValues({ _id, Login, Password, Model, IP, IPManagement, RAM, CPU, ConsommationRAM, ConsommationCPU, Uptime, Owner, Role, Rack });
    }
  }, [props.item]);

  if (props.item) {
    return (
      <Form onSubmit={submitFormEdit}>

        <FormGroup>
          <Label for="IPManagement">IPManagment</Label>
          <Input
            type="text"
            name="IPManagement"
            id="IPManagement"
            onChange={onChange}
            value={form.IPManagement === null ? "" : form.IPManagement}
            placeholder="IPManagement"
            required
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
            required
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
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="CPU">CPU</Label>
          <Input
            type="text"
            name="CPU"
            id="Pod"
            onChange={onChange}
            value={form.CPU === null ? "" : form.CPU}
            placeholder="CPU"
            required
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
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="serveurname">serveurname</Label>
          <Input
            type="text"
            name="Login"
            id="serveurname"
            onChange={onChange}
            value={form.Login === null ? "" : form.Login}
            placeholder="serveurname"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            type="text"
            name="Password"
            id="Password"
            onChange={onChange}
            value={form.Password === null ? "" : form.Password}
            placeholder="password"
            required
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
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="ConsommationCPU">ConsommationCPU</Label>
          <Input
            type="number"
            name="ConsommationCPU"
            id="ConsommationCPU"
            onChange={onChange}
            value={form.ConsommationCPU === null ? "" : form.ConsommationCPU}
            placeholder="ConsommationCPU"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="Model">ConsommationRAM</Label>
          <Input
            type="number"
            name="ConsommationRAM"
            id="ConsommationRAM"
            onChange={onChange}
            value={form.ConsommationRAM === null ? "" : form.ConsommationRAM}
            placeholder="ConsommationRAM"
            required
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
            required
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
            required
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  } else {
    return (
      <Form onSubmit={submitFormAdd}>

        <FormGroup>
          <Label for="IPManagment">IPManagment</Label>
          <Input
            type="text"
            name="IPManagement"
            id="IPManagment"
            onChange={onChange}
            value={form.IPManagment === null ? "" : form.IPManagement}
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
            placeholder="xxx.xxx.xxx.xx"
          />
        </FormGroup>
        <FormGroup>
          <Label for="CPU">CPU</Label>
          <Input
            type="text"
            name="CPU"
            id="Pod"
            onChange={onChange}
            value={form.CPU === null ? "" : form.CPU}
            placeholder="CPU"
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
            name="Login"
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
            name="Password"
            id="Password"
            onChange={onChange}
            value={form.Password === null ? "" : form.Password}
            placeholder="password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="Uptime">Uptime</Label>
          <Input
            type="number"
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
          <Label for="DataCenter">DataCenter</Label>
          <br />
          <select value={selectedDataCenter} onChange={handleDataCenterChange} required>
            <option value="">Sélectionner un Data Center</option>
            {dataCenters.map((dataCenter) => (
              <option key={dataCenter._id} value={dataCenter._id}>
                {dataCenter.Libelle}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <Label for="Pod">Pod</Label>
          <br />
          <select value={selectedPod} onChange={handlePodChange} required>
            <option value="">Sélectionner un Pod</option>
            {pods.map((pod) => (
              <option key={pod._id} value={pod._id}>
                {pod.Libelle}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <Label for="Rack">Rack</Label>
          <br />
          <select name="Rack" id="Rack" onChange={onChange} required>
            <option value="">Sélectionner un Rack</option>
            {racks.map((rack) => (
              <option key={rack._id} value={rack._id}>
                {rack.Nom}
              </option>
            ))}
          </select>
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
}



export default AddEditForm;

