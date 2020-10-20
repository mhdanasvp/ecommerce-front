import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { createCategory } from './apiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { user, accessToken } = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setSuccess("")
        setName(e.target.value)



    }
    const clickSubmit = e => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        createCategory(user._id, accessToken, { name })
            .then(data => {
                if (data.error) {
                    setError(data.error.message)
                } else {
                    setError('')
                    setSuccess(true)
                    setName("")
                }
            })
    }




    const newCategoryForm = () => (
        <form >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />


            </div>
            <button onClick={clickSubmit} className="btn btn-outline-primary">Create</button>

        </form>

    )
    // const showSuccess=()=>{
    //     if(success){
    //         return <h3 className="text-success">created</h3>
    //     }
    // }
    // const showError=()=>{
    //     if(error){
    //         return <h3 className="text-danger">{error}</h3>
    //     }
    // }
    const showError = () => (
        error && (
            <h3 className="text-danger">{error}</h3>
        )
    )
    const showSuccess = () => (
        success && (
            <h3 className="text-success">created</h3>
        )
    )
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to DashBoard
        </Link>
        </div>
    )
    return (
        <Layout title="Add Category" description={`Admin name: ${user.name} `} className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">

                    {newCategoryForm()}
                    <div className="mt-2">
                        {showSuccess()}
                        {showError()}
                    </div>
                    {goBack()}
                </div>
            </div>

        </Layout>
    )
}

export default AddCategory

