import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import DataTable from "../components/GetReporting/DataTable";
import "../components/style/Crud.css";
import BackgrounAN from "./BackgrounAN";
import axios from "axios";
import { getToken } from "../_services/account.services";

function Reporting(props) {
    const [items, setItems] = useState([]);

    const getItems = () => {
        axios.get("http://localhost:3001/serveurs/get", {
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
            ...items.slice(itemIndex + 1),
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
                    <h2 style={{ margin: "20px 0" }}>liste des serveurs</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{ height: "400px", overflow: "auto" }}>
                        <DataTable
                            items={items}
                            updateState={updateState}
                            deleteItemFromState={deleteItemFromState}
                        />
                    </div>
                </Col>
            </Row>
            <BackgrounAN />
        </Container>
    );
}

export default Reporting;
