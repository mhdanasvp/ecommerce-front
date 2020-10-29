import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'
import Dashboard from "../user/UserDashboard"
import { itemTotal } from './cartHelpers'





const Menu = ({ history }) => {

    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return { color: "#ff9900" }
        } else {
            return { color: "#fff" }
        }
    }

    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">

                    <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
                </li>
                <li className="nav-item">

                    <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">Shop</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/cart")} to="/cart">
                    Cart {" "}
                    <sup>
                    <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                    </Link>
                </li>
                {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">

                                <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup</Link>
                            </li>
                            <li className="nav-item">

                                <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Signin</Link>
                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === "0" && (
                        <li className="nav-item">

                            <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                        </li>

                    )}
                    {isAuthenticated() && isAuthenticated().user.role === "1" && (
                        <li className="nav-item">

                            <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
                        </li>

                    )}
                    {isAuthenticated() && (
                        <Fragment>

                            <li className="nav-item">

                                <span className="nav-link" style={{ cursor: "pointer", color: "#fff" }} onClick={() => signout(() => {
                                    history.push("/")
                                })}>Signout</span>
                            </li>
                        </Fragment>
                    )}
            </ul>
        </div>
    )
}

export default withRouter(Menu)
