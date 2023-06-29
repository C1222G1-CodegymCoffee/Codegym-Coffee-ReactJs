import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get("http://localhost:8080/menu")
    return res.data;
}

export const getAllTypeProduct = async () => {
    const res = await axios.get("http://localhost:8080/menu/type-product")
    return res.data;
}