import request from '../config/http'
import axios from "axios";
const findAll = async  () => {
    try {
        const result = await axios.get("http://localhost:8080/api/sale/list")
        return result.data
    }catch (e){
        console.log(e)
    }
}
const getBillDetails = async (tableId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/sale/bill-details/${tableId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bill details:', error);
        throw error;
    }
};

const sale = {
    findAll,
    getBillDetails
}

export default sale