import React from 'react'
import { Table } from 'reactstrap';


function DataTable(props) {

  const items = props.items.map(item => {
    return (
      <tr key={item._id}>
        <th scope="row">{item.n}</th>
        <td>{item.IP}</td>
        <td>{item.ConsommationRAM}</td>
        <td>{item.ConsommationCPU}</td>
        <td>{item.Uptime}s</td>



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
          <th>Consommation RAM</th>
          <th>Consommation CPU</th>
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
