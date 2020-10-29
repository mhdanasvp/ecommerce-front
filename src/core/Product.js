
import React, { useEffect, useState } from 'react'
import { read, listRelated } from './apiCore'
import Card from './Card'
import Layout from './Layout'

const Product = (props) => {


    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)

            } else {
                setProduct(data.product)
                
                listRelated(data.product._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        
                        setRelatedProduct(data.product)
                    }
                })


            }
        }).catch((err) => {

            console.log(err);
        });


    }



    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)

    }, [props])

    return (
        <Layout
            title={product && product.name}

            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid">

            <h2 className="mb-4">Single Product</h2>

            <div className="row">
                <dv className="col-8">
                {product &&
                    product.description &&
                    <Card product={product} showViewProductButton={false} />}
                </dv>
                <div className="col-4">
                    <h4>Related Products</h4>
                    {relatedProduct.map((p,i)=>(
                        <div className="mb-3" key={i}>
                        <Card product ={p} />
                        </div>
                    ))}
                   
                </div>
            </div>


        </Layout>
    )
}

export default Product
