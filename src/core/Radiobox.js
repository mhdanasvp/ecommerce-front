import React from 'react'
import { useState, Fragment } from 'react'

const Radiobox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0)


    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)

    }



    return prices.map((p, i) => (
        <div key={i} className="list-unstyled">
            <input
                type="radio"
                className="mr-2 ml-4"
                value={`${p._id}`}
                onChange={handleChange}
                name={p}


            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ))

}

export default Radiobox
