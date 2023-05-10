import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListeProducts from "./listProduitUser";
// import ListServiceUser from "./listServicesUser";

export default function ProductList() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetchProducts();
    }, [])

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


    return (
        <>
            <div id="list">
                {/* <ListServiceUser /> */}
                <ListeProducts />
            </div>
            <div className="container">
                <div className="row">
                    <div className="conl-12">
                        <Link className="btn btn-primary mb-2 float-end" to={"/product/create"}>Create</Link>
                        <div className="col-12">


                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">nom</th>
                                        <th scope="col">ville</th>
                                        <th scope="col">path</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.length > 0 && (
                                            products.map((row, key) => (
                                                <tr key={key}>
                                                    <td>{row.title}</td>
                                                    <td>{row.ville}</td>


                                                    <td><a href={row.description} target="_blank" rel="noreferrer"><h4>{row.description}</h4></a></td>

                                                    <td>
                                                        <img width="100px" src={`127.0.0.1:8000/api/products?image=${row.image}`} />
                                                    </td>
                                                    <td>
                                                        <Link className="btn btn-success mb-2 float-end" to={`/product/edit/${row.id}`}>Edit</Link>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger mb-2 float-end" onClick={() => deleteProduct(row.id)}>Delete</button>
                                                    </td>
                                                </tr>

                                            ))
                                        )
                                    }

                                </tbody>
                            </table>



                        </div>
                    </div>

                </div>

            </div>
        </>
    )




}
