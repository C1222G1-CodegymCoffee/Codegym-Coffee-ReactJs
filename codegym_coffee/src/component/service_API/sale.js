
import axios from "axios";
const findAll = async  () => {
    try {
        const result = await axios.get("http://localhost:8080/api/sale/list", {
            headers:
            {
                'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
            }
        })
        return result.data
    }catch (e){
        console.log(e)
    }
}
const getBillDetails = async (tableId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/sale/bill-details/${tableId}`, {
            headers:
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching bill details:', error);
        throw error;
    }
};
const updateSale = async (billId) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/sale/update/${billId}`, null, {
            headers:
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                }
        });
    } catch (error) {
        console.error(error);
    }
}

const sale = {
    findAll,
    getBillDetails,
    updateSale
}

export default sale