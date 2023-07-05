import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get("http://localhost:8080/v2/menu")
    return res.data;
}

export const getAllTypeProduct = async () => {
    const res = await axios.get("http://localhost:8080/v2/menu/type-product")
    return res.data;
}

export const getAllProductByType = async (type) => {
    const res = await axios.get(`http://localhost:8080/v2/menu/product-by-type?type=${type}`)
    return res.data;
}
export const getProductByName = async (nameProduct) => {
    const res = await axios.get(`http://localhost:8080/v2/menu/product-by-name?nameProduct=${nameProduct}`)
    return res.data;
}
export const addToBill = async (products) => {
    await axios.post("http://localhost:8080/v2/menu/add-to-bill",products)
}