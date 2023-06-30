import axios from "axios";

export const getTopProduct = async () => {
    try {
        const result = await axios.get("http://localhost:8080/homepage/topProduct")
        return result.data
    }catch (error) {
        console.log('error')
    }
}