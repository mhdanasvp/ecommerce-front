import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './cartHelpers'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        insatnce: "",
        address: ""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().accessToken


    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            console.log("data",data);
            if (data.error) {
                setData({ ...data, error: data.error })
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken })
            }
        })
    }


    useEffect(() => {
        getToken(userId, token)
    }, [])

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentvalue, nextvalue) => {
            return currentvalue + nextvalue.count * nextvalue.price
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (

                <Link to='/signin'>
                    <button className="btn btn-primary">Sign in to Checkout</button>

                </Link>
            )
    }

    let deliveryAddress = data.address;


    const buy = () => {
        setData({ loading: true })
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce
                // console.log('send nonce and total', nonce, getTotal(products));
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }
                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);


                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address:deliveryAddress

                        }
                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setData({ ...data, success: response.success })
                                    emptyCart(() => {
                                        setRun(!run); // run useEffect in parent Cart
                                        console.log('payment success and empty cart');
                                        setData({
                                            loading: false,
                                            success: true
                                        });
                                    });
                                })

                            })



                    })
                    .catch(err => {
                        console.log(err)
                        setData({ loading: false })
                    })

            })
            .catch(err => {
                console.log(err);
                setData({ ...data, error: err.message })
            })
    }


    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {
                data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <div className="gorm-group mb-3">
                            <label className="text-muted">Delivery address:</label>
                            <textarea
                                onChange={handleAddress}
                                className="form-control"
                                value={data.address}
                                placeholder="Type your delivery address here..."
                            />
                        </div>
                        <DropIn
                            options={{
                                authorization: data.clientToken,
                                paypal: {
                                    flow: 'vault'
                                }


                            }}
                            onInstance={instance => data.instance = instance}
                        />
                        <button onClick={buy} className="btn btn-success btn-block">PAY</button>
                    </div>
                ) : null
            }
        </div>
    )


    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>{error}</div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? "" : "none" }}>Thanks ! your payament was successful !</div>
    )
    const showLoading = loading => loading && <h2 className="text-info">Loading....</h2>

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
}

export default Checkout
