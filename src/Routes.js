import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Orders from './admin/Orders'
import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'
import Cart from './core/Cart'
import Home from './core/Home'
import Product from './core/Product'
import Shop from './core/Shop'
import AdminDashboard from './user/AdminDashboard'

import Signin from './user/Signin'
import Signup from './user/Signup'
import Dashboard from './user/UserDashboard'




const Routes = () => {
    
    return (
        <BrowserRouter>
        
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/product/:productId" exact component={Product}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                
                

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
