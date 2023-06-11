import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ModalForm from "../components/CrudServeurs/Modal";
import DataTable from "../components/CrudServeurs/DataTable";
import "../components/style/Crud.css";
import axios from "axios";
import { getToken } from "../_services/account.services";

function ListServeures(props) {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    const getItems = () => {
        axios
            .get("http://localhost:3001/serveurs/get", {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
            .then((response) => {
                setItems(response.data);
                setFilteredItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addItemToState = (item) => {
        setItems([...items, item]);
        setFilteredItems([...items, item]);
    };

    const updateState = (item) => {
        const itemIndex = items.findIndex((data) => data.id === item.id);
        const newArray = [
            ...items.slice(0, itemIndex),
            item,
            ...items.slice(itemIndex + 1),
        ];
        setItems(newArray);
        setFilteredItems(newArray);
    };

    const deleteItemFromState = (id) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        setFilteredItems(updatedItems);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredItems = items.filter((item) =>
            item.Owner.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filteredItems);
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
                    <ModalForm
                        buttonLabel="Add Serveur"
                        addItemToState={addItemToState}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="search-container">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            className="search"
                            type="text"
                            placeholder="Search by Owner"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{ height: "400px", overflowY: "scroll" }}>
                        <DataTable
                            items={filteredItems}
                            updateState={updateState}
                            deleteItemFromState={deleteItemFromState}
                        />
                    </div>
                </Col>
            </Row>
            <style>
                {`
          .dataTables_scrollBody {
            overflow-y: scroll;
          }

          .search-container {
            position: relative;
            display: flex;
            align-items: center;
          }

          .search-icon {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            cursor: pointer;
          }
        `}
            </style>
        </Container>
    );
}

export default ListServeures;
