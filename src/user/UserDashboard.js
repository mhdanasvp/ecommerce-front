import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'

const Dashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated()

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">UserLinks</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>Profile Update</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">UserInformation</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === "1" ? "Admin" : "User"}</li>
                </ul>
            </div>
        )
    }
    const purchaseHistory = () => {
        return (
            <div className="card">
                <h3 className="card-header">Purchase History</h3>
                <ul className="list-group">
                    <li className="list-group-item">abcd</li>
                    <li className="list-group-item">abcd</li>
                    <li className="list-group-item">abcd</li>
                    <li className="list-group-item">abcd</li>
                </ul>
            </div>
        )
    }



    return (
        <Layout title="User Dashboard"
            description={`welcome Mr. ${name}`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>


        </Layout>
    )
}

export default Dashboard
