import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "../components/CrudUser/Modal";
import DataTable from "../components/CrudUser/DataTable";
import "../components/CrudUser/CrudUser.css";
import axios from "axios";

function CrudUser(props) {
  const [items, setItems] = useState([
  ]);

  const getItems = () => {
    axios.get("http://localhost:3001/users/getaccounts").then((response) => {
        setItems(response.data);
        console.log(response.data);
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

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>CRUD Database</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            items={items}
            updateState={updateState}
            deleteItemFromState={deleteItemFromState}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ModalForm buttonLabel="Add Item" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  );
}

export default CrudUser
