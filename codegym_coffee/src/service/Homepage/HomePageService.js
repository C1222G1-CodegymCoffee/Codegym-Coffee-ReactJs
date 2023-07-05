import axios from "axios";

export const getTopProduct = async () => {
    try {
        const result = await axios.get("http://localhost:8080/topProduct")
        return result.data
    }catch (error) {
        console.log('error')
    }
}
export const getNewProduct = async () => {
    try {
        const result = await axios.get("http://localhost:8080/newProduct")
        return result.data
    }catch (error) {
        console.log('error')
    }
}