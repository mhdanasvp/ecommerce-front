import React from 'react'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { signin,authenticate, isAuthenticated } from '../auth'
import Layout from "../core/Layout"



const Signin = () => {
    const [values, setValues] = useState({
        'email': "anas@gmail.com",
        'password': "anas",
        'error': "",
        'loading': false,
        'redirectToReferrer': false
    })
    const { email, password, error, loading, redirectToReferrer } = values
    const {user}=isAuthenticated()



    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })

    }
    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error.message, loading: false })
            } else {
                authenticate(data,()=>{
                    setValues({...values,redirectToReferrer:true})
                })
            }
        })

    }
    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange("email")} className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange("password")} className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Login</button>
        </form>
    )
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    )
    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading.....</h2>
            </div>
        )
    )
    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user&&user.role==="1"){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
            
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    return (
        <Layout title="Signin page"
            description="MERN App Sign in"
            className="container col-md-8 offset-md-2">
            {showError()}
            {showLoading()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    )
}





export default Signin