import React from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from './Modal';
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../style/DC_VISUALISATION.css';
import axios from 'axios';
import { getToken } from '../../_services/account.services';

function DataTable(props) {
  const deleteItem = (id) => {
    let confirmDelete = window.confirm('Delete item forever?');
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/datacenters/${id}`,{
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
        .then((response) => {
          props.deleteItemFromState(id);
          // Refresh the page
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const items = props.items.map((item) => {
    return (
      <tr key={item._id}>
        <th scope="row">{item._id}</th>
        <td className="table-cell">{item.Rack}</td>
        <td className="table-cell">{item.Pod}</td>
        <td>
          <div className="actions-container">
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item._id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>RACK</th>
          <th>POD</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  );
}

export default DataTable;
