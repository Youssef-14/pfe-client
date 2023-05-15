import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "../components/CrudUser/Modal";
import DataTable from "../components/CrudUser/DataTable";
import '../components/style/Crud.css';
import { getToken ,getUserRole } from "../_services/account.services";

import axios from "axios";

function CrudUser(props) {

  const [items, setItems] = useState([]);

  const getItems = () => {
    axios.get("http://localhost:3001/users/getaccounts",{
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }).then((response) => {
      setItems(response.data);

    }
    )
      .catch((error) => {
        console.log(error);
      });
  };

  const addItemToState = (item) => {
    setItems([...items, item]);
  };

  const updateState = (item) => {
    const itemIndex = items.findIndex((data) => data.id === item.id);
    const newArray = [
      ...items.slice(0, itemIndex),
      item,
      ...items.slice(itemIndex + 1)
    ];
    setItems(newArray);
  };

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    getItems();
  }, []);

  if (getUserRole() === "Admin") {
    
  return (
    <div>
      <Container className="App">
        <Row>
          <Col>
            <h2 style={{ margin: "20px 0" }}> Accounts management</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add User" addItemToState={addItemToState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ height: "500px", overflowY: "scroll" }}>
              <DataTable
                items={items}
                updateState={updateState}
                deleteItemFromState={deleteItemFromState}
              />
            </div>
          </Col>
        </Row>

        <style>
          {`
        td {
          max-width: 10%;
        }
      `}
        </style>
      </Container>
    </div>
  );}
  else{
    //Redirect to home page
    window.location.href = "/home";
  }
}

export default CrudUser;
