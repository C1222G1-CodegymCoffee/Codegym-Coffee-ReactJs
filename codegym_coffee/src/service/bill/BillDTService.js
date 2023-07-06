import axios from "axios";

export const findBillDT = async () => {
    try {
        const result = await axios.get('http://localhost:8080/ListBillDetail')
        return result.data
    } catch (error) {
        console.log(error);
    }
}