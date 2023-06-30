import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get("http://localhost:8080/menu")
    return res.data;
}

export const getAllTypeProduct = async () => {
    const res = await axios.get("http://localhost:8080/menu/type-product")
    return res.data;
}

export const getAllProductByType = async (type) => {
    const res = await axios.get(`http://localhost:8080/menu/type-product?type=${type}`)
    return res.data;
}
export const addToBill = async (products) => {
    await axios.post("http://localhost:8080/menu/add-to-bill",products)
}