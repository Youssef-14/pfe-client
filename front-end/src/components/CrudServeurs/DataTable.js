import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      }).then(response => {
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
        <th scope="row">{item.n}</th>
        <td>{item.IP}</td>
        <td>{item.IPManagement}</td>
        <td>{item.RAM}</td>
        <td>{item.Model}</td>
        <td>{item.rack}</td>
        <td>{item.pod}</td>
        <td>{item.Owner}</td>
        <td>{item.Login}</td>
        <td>{item.Password}</td>


        <td>

          <div style={{ width: "100px" }}>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item._id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
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
          <th>IP management</th>
          <th>RAM</th>
          <th>Modèle</th>
          <th>RACK</th>
          <th>POD</th>
          <th>Owner</th>
          <th>username</th>
          <th>password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable
