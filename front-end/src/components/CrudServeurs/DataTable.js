import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'

function DataTable(props) {
  const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      fetch('http://localhost:3000/crud', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          props.deleteItemFromState(id)
        })
        .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item._id}>
        <th scope="row">{item._id}</th>
        <td>{item.__v}</td>
        <td>{item.IP}</td>
        <td>{item.RAM}</td>
        <td>{item.Password}</td>

        <td>
          <div style={{ width: "110px" }}>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.id)}>Del</Button>
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
          <th>Hostname</th>
          <th>IP</th>
          <th>IP management</th>
          <th>RAM</th>
          <th>Modèle</th>
          <th>Constructeur</th>
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