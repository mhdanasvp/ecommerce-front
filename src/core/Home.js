import React, { useState } from 'react'
import { getProducts } from './apiCore'
import Card from './Card'
import Layout from './Layout'

const Home = () => {
    const [productBySell, setProductBySell] = useState([])
    const [productByArrival, setProductByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductBySell = () => {

        getProducts('sold').then(data => {

            if (data.error) {
                setError(data.error.message)
            } else {
                setProductBySell(data.product)
            }

        })
    }
    const loadProductByArrival = () => {
        getProducts("createdAt").then(data => {

            if (data.error) {
                setError(data.error.message)
            } else {
                setProductByArrival(data.product)
            }
        })
    }
    useState(() => {
        loadProductByArrival();
        loadProductBySell()

    }, [])


    return (
        <Layout title="Home Page" description="MERN App" className="container-fluid">
        <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                
                {productBySell.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                
                {productByArrival.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        </Layout>
    )
}
export default Home