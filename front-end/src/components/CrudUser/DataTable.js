import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'
import axios from 'axios'
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; import { getToken } from "../../_services/account.services";

function DataTable(props) {

  const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/users/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
        .then(response => {
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
        <td>{item.Username}</td>
        <td>{item.Nom}</td>
        <td>{item.Prenom}</td>
        <td>{item.Password}</td>
        <td>{item.Role}</td>

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
          <th>ID</th>
          <th>username</th>
          <th>Name</th>
          <th>Prenom</th>
          <th>Password</th>
          <th>Privillège</th>
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
