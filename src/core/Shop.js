import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import Layout from './Layout'
import { prices } from './FixedPrices'
import Radiobox from './Radiobox'
import Card from "./Card"
import Search from './Search'


const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredresults, setFilteredresults] = useState([])



    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error.message)
            } else {
                setCategories(data.category)
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const loadFiltersResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {

                setFilteredresults(data.product)
                setSize(data.size)
                setSkip(0)

            }
        }).catch(err => console.log(err))

    }

    const loadMore = () => {

        let toSkip = skip + limit

        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {

                setFilteredresults([...filteredresults, ...data.product])
                setSize(data.size)
                setSkip(toSkip)

            }
        }).catch(err => console.log(err))

    }
    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    LoadMore
                </button>
            )
        )
    }


    useEffect(() => {
        init();
        loadFiltersResults(skip, limit, myFilters.filters);
    }, [])




    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP",filters,filterBy);
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters


        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFiltersResults(myFilters.filters)
        setMyFilters(newFilters)

    }
    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }



    return (
        <Layout title="Shop Page" description="qwerty" className="container-fluid">

            <div className="row">
                <div className="col-4">
                    <h4>filter by category</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={
                            filters => handleFilters(filters, "category")
                        } />
                    </ul>
                    <h4>filter by price</h4>
                    <div>
                        <Radiobox prices={prices} handleFilters={
                            filters => handleFilters(filters, "price")
                        } />
                    </div>
                </div>
                <div className="col-8">

                    <h2 className="mb-4">Products</h2>

                    <div className="row">
                        {filteredresults.map((product, i) => (


                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>


                        ))}

                    </div>
                    <hr />
                    {loadMoreButton()}

                </div>
            </div>

        </Layout>
    )
}

export default Shop
