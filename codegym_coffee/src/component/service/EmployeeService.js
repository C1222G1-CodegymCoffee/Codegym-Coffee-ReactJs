import axios from "axios";

const findAll = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/employee")
    return res.data
}
export const findAllPosition = async () => {
    const res = await axios.get(`http://localhost:8080/api/admin/employee/position`);
    return res.data
}


const addEmployee = async (value) => {
    await axios.post(`http://localhost:8080/api/admin/employee/create`, {...value})
}
const findByName = async (nameSearch) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/employee/${nameSearch}`)
        return res.data;
    } catch (e) {
        console.log(e)
    }
}
const deleteByIdEmployee = async (idDelete) => {
    await  axios.post(`http://localhost:8080/api/admin/employee/${idDelete}`)
}
const findByEmployee = async (nameSearch,nameAccount,phoneNumber) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/employee/search/${nameSearch}&${nameAccount}&${phoneNumber}`)
        return res.data;
    } catch (e) {
        console.log(e)
    }
}
export const getEmployees = async (page, size) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/employee/?page=${page}&size=${size}`);
        console.log(result)
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
export const employeeService = {
    findByName,
    findAll,
    addEmployee,
    findAllPosition,
    getEmployees,
    findByEmployee,
    deleteByIdEmployee
}


