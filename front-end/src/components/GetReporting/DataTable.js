import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal'
import axios from 'axios'

function DataTable(props) {

  const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/serveurs/delete/${id}`)
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
        <td>{item._id}</td>
        <td>{item.ConsommationRAM}</td>
        <td>{item.ConsommationCPU}</td>
        <td>{item.Uptime}</td>



        <td>
          <div >
            <br /><br /><br />
          </div>
        </td>
      </tr>
    )
  })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Serveur ID</th>
          <th>IP</th>
          <th>	consom ram</th>
          <th>onsom CPU</th>
          <th>Uptime</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable
