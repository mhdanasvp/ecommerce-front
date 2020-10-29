import React, { useEffect, useState } from 'react'

const Checkbox = ({ categories,handleFilters }) => {

    const [checked, setChecked] = useState([])

    const handleToggle=c=>()=>{
        const curretCategoryId=checked.indexOf(c)
        const newCheckedCategoryId=[...checked]
        if(curretCategoryId===-1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(curretCategoryId,1)
        }
        // console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }





    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input type="checkbox" className="form-check-input" value={checked.indexOf(c._id===-1)} onChange={handleToggle(c._id)}/>
            <label className="form-check-label">{c.name}</label>
        </li>
    ))
}

export default Checkbox
