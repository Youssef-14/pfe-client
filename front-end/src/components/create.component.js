import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [ville, setVille] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const changeHandler = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const createProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title)
        formData.append('ville', ville)
        formData.append('description', description)
        formData.append('image', image)

        console.log(formData)
        await axios.post('http://127.0.0.1:8000/api/products', formData)
            .then(({ data }) => {
                alert(data.message)
                navigate('/')
            }).catch(({ response }) => {
                if (response.status === 422) {
                    console.log(response.data.errors)
                } else {
                    console.log(response.data.message)
                }
            })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="conl-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title"> Passer commande</h3>
                            <hr></hr>
                            <div className="from-wrapper">

                                <form onSubmit={createProduct}>

                                    <div className="mb-3">
                                        <label className="form-label">Nom (الإسم)  </label>
                                        <input type="text" className="form-control"
                                            value={title}
                                            onChange={(e) => { setTitle(e.target.value) }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Ville(الإقامة)  </label>
                                        <input type="text" className="form-control"
                                            value={ville}
                                            onChange={(e) => { setVille(e.target.value) }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">lien de google earth (مسار الإحداثيات الخاصة بقطعة الأرض) </label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                            value={description}
                                            onChange={(e) => { setDescription(e.target.value) }}
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Copie de la garantie de propriété (صورة لضمان الملكية) </label>
                                        <input type="file" className="form-control"

                                            onChange={changeHandler}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary mb-3">  Save</button>

                                    </div>

                                </form>



                            </div>


                        </div>
                    </div>
                </div>

            </div>

        </div>
    )




}