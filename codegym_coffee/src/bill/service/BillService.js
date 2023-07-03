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

export const findBillCode = async (nameSearch) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/bill/code/${nameSearch}`)
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const findBillday = async (nameSearch) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/bill/day/${nameSearch}`)
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

export const searchBill = async (searchTerm, dayOfBill, page, size) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/searchTerm=${searchTerm}&dayOfBill=${dayOfBill}&page=${page}&size=${size}`)
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

