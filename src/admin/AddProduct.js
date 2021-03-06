import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { createProduct, getCategories } from './apiAdmin'

const AddProduct = () => {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    })


    const { user, accessToken } = isAuthenticated()

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    const init = () => {
        getCategories().then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error.message })
            } else {
                
                setValues({
                    ...values,
                    categories:data.category,
                    
                    formData: new FormData()
                })
            }

        })
    }


    useEffect(() => {
        init()
    }, [])



    const handleChange = name => event => {
        const value =
            name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, error: false, createdProduct: "" });
    };
    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })

        createProduct(user._id, accessToken, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error.message })
            } else {

                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    category:"",
                    shipping:"",
                    
                    loading: false,
                    createdProduct: data.product.name


                })
            }
        })
    }




    const newPostForm = () => (
        <form className="mb-3">
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" onChange={handleChange("photo")} name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">description</label>
                <textarea onChange={handleChange("description")} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" onChange={handleChange("price")} className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange("category")} className="form-control">
                    <option>Please Select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                        ))}



                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please Select</option>
                    <option value="0">yes</option>
                    <option value="1">no</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" onChange={handleChange("quantity")} className="form-control" value={quantity} />
            </div>
            <button onClick={clickSubmit} className="btn btn-outline-primary">Create</button>


        </form>

    )
    const showError = () => {
        return <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>{error}</div>
    }
    const showSuccess = () => {
        return <div className="alert alert-info" style={{ display: createdProduct ? "" : "none" }}>
        <h2>{`${createdProduct} is created`}</h2>
        </div>
    }
    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )


    return (
        <Layout title="Add Product" description={`Admin : ${user.name}`} className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showLoading()}
                    {showSuccess()}
                    {newPostForm()}


                </div>
            </div>

        </Layout>
    )
}

export default AddProduct;
