import { API } from "../config"




export const getProducts=sortBy=>{
    return fetch(`${API}/product?sortBy=${sortBy}&order=desc&limit=6`,{
        methord:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}
export const getCategories=()=>{
    return fetch(`${API}/category`,{
        method:'GET'
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}