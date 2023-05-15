import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'
import axios from 'axios'
import { getToken } from "../../_services/account.services";

function DataTable(props) {

  const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/serveurs/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })  .then(response => {
          props.deleteItemFromState(id);
          //refresh the page
          window.location.reload(false);
        })
        .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item._id}>
        <th scope="row">{item._id}</th>
        <td>{item.IP}</td>
        <td>{item.IPManagment}</td>
        <td>{item.RAM}</td>
        <td>{item.Model}</td>
        <td>{item.Rack}</td>
        <td>?{item.Pod}</td>
        <td>{item.Owner}</td>
        <td>{item.username}</td>
        <td>{item.password}</td>


        <td>
          <div style={{ width: "110px" }}>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item._id)}>Del</Button>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Serveur</th>
          <th>IP</th>
          <th>	IP management</th>
          <th>RAM</th>
          <th>Modèle</th>
          <th>RACK</th>
          <th>POD</th>
          <th>Owner</th>
          <th>username</th>
          <th>password</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable
