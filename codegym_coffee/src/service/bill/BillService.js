import axios from 'axios'


export const findAll = async () => {
    try {
        const result = await axios.get('http://localhost:8080/api/admin/bill/')
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const findBillCode = async (nameSearch) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/bill/code/${nameSearch}`)
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const search = async (searchTerm, dayOfBill) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/bill/search?searchTerm=${searchTerm}&dayOfBill=${dayOfBill}`)
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const getBills = async (page, size) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/bill/?page=${page}&size=${size}`);
        console.log(result)
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

