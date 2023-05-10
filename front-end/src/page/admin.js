
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../components/style/admin.css'


export default function Admin() {
    const [products, setProducts] = useState([]);
    // const [contacts, setContacts] = useState([]);
    const [produits, setProduits] = useState([]);
    const [services, setServices] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermVille, setSearchTermVille] = useState("");

    //product
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        await axios.get('http://127.0.0.1:8000/api/products').then(({ data }) => { setProducts(data) })
    }

    const deleteProduct = async (id) => {
        await axios.delete('http://127.0.0.1:8000/api/products/' + id)
            .then(({ data }) => {
                console.log(data.message)
                fetchProducts();
            }).catch(({ response: { data } }) => {
                console.log(data.message)
            })
    }

    async function acceptProduct(id) {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'accepted'
            })
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            console.log(updatedProduct);
        } else {
            console.error(response.statusText);
        }
    }


    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };
    const handleSearchVille = e => {
        setSearchTermVille(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.ville.toLowerCase().includes(searchTermVille.toLowerCase())
    );
    //contact
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios.get('http://localhost:8000/api/contacts');
    //         setContacts(result.data);
    //     };
    //     fetchData();
    // }, []);
    //produits
    useEffect(() => {
        const fetchProduits = async () => {
            const res = await axios.get('http://localhost:8000/api/produits');
            setProduits(res.data);

        };
        fetchProduits();

    }, []);
    //services 
    useEffect(() => {
        const fetchServices = async () => {
            const res = await axios.get('http://localhost:8000/api/services');
            setServices(res.data);
            console.log(res.data)
        };
        fetchServices();

    }, []);
    return (
        <>
            <div id="list">

            </div>
            <div className="list">
                <div className="row">
                    <div >
                        <input
                            className="searchAdmin"
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <input
                            className="searchAdmin"
                            type="text"
                            placeholder="Search by ville"
                            value={searchTermVille}
                            onChange={handleSearchVille}
                        />


                        <div className="col-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col"><h1>nom</h1></th>
                                        <th scope="col"><h1>ville</h1></th>
                                        <th scope="col"><h1>path</h1></th>
                                        <th scope="col"><h1>produis</h1></th>
                                        <th scope="col"><h1>service</h1></th>


                                    </tr>
                                </thead>
                                <tbody>


                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((row, key) => (
                                            <tr key={key}>
                                                <td>{row.title}</td>

                                                <td>{row.ville}</td>

                                                <td><a href={row.description} target="_blank" rel="noreferrer"><h4>{row.description}</h4></a></td>
                                                {/* <td>
                                                    <img width="100px" src={`127.0.0.1:8000/api/products/?image=${row.image}`} />
                                                </td> */}
                                                <td>  {produits.map(produit => (
                                                    <tr key={produit.id}>
                                                        <td className="pP">{produit.title}</td>
                                                        <td className="pP">{produit.price}</td>
                                                    </tr>
                                                ))}</td>
                                                <td>  {services.map(service => (
                                                    <tr key={service.id}>
                                                        <td className="pP">{service.NomS}</td>
                                                        <td className="pP">{service.Prix}</td>
                                                    </tr>
                                                ))}</td>
                                                <td>
                                                    <button className="btn btn-sucsses mb-2 float-end" onClick={() => acceptProduct(row.id)}>accept</button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger mb-2 float-end" onClick={() => deleteProduct(row.id)}>Delete</button>
                                                </td>


                                            </tr>


                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3}>No data found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
            <h1>Contact</h1>
            <div className="col-12" id="contact-outer">


                <table id="contact-inner">
                    <thead>
                        <tr>
                            <th scope="col"><h1>Name</h1></th>
                            <th scope="col"><h1>Email</h1></th>
                            <th scope="col"><h1>phone</h1></th>
                            <th scope="col"><h1>message</h1></th>

                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.Name}</td>
                                <td>{contact.Email}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.Message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </>
    )
}
