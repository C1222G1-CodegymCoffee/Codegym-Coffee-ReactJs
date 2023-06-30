import axios from "axios";

const findAll = async () => {
    const res = await axios.get("http://localhost:8080/home/admin/employee")
    return res.data
}
export const findAllPosition = async () => {
    const res = await axios.get(`http://localhost:8080/home/admin/employee/position`);
    return res.data
}
const findAllAccount = async () => {
    const res = await axios.get(`http://localhost:8080/home/admin/employee/account`)
    return res.data
}

const addEmployee = async (value) => {
    await  axios.post(`http://localhost:8080/home/admin/employee`,{ ...value })
}
const findByName = async (nameSearch) => {
    const res = await axios.get(`http://localhost:8080/home/admin/employee/${nameSearch}`,)
    return res.data;
}
export const employeeService = {
    findByName,
    findAll,
    addEmployee,
    findAllPosition,
    findAllAccount

}


