import axios from 'axios'


export const findAll = async () => {
    try {
        const result = await axios.get('http://localhost:8080/api/admin/bill/')
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const findBillDetail = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/bill/detail/${id}`)
        return result.data
    } catch (error) {
        console.log(error);
    }

}