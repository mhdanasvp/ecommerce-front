import React, { useState } from 'react'
import { signup } from '../auth'
import Layout from '../core/Layout'
import { Link } from "react-router-dom"

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })
    const { email, name, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }






    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })

        signup({ name, email, password })
            .then(data => {
               
                if (data.error) {
                    setValues({ ...values, error: data.error.message, success: false })
                } else {
                    setValues({ ...values, name: "", email: "", password: "", error: "", success: true })
                }
            })

    }



    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange("email")} className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange("password")} className="form-control" value={password} />
            </div>
            <button className="btn btn-primary" onClick={clickSubmit} >Submit</button>

        </form>
    )
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
            new account created.please<Link to="/signin">Signin</Link>
        </div>
    )



    return (
        <Layout title="Signup page" description="MERN App Sign in" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}

            {signUpForm()}


        </Layout>
    )
}
export default Signup