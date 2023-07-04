import axios from "axios";
import {log10} from "chart.js/helpers";

const addAccount = async (value) => {
    await  axios.post(`http://localhost:8080/home/admin/employee/account`,{ ...value })
}
const findByName = async (nameAccountSearch) => {
    try {
        const res = await axios.get(`http://localhost:8080/home/admin/employee/account/${nameAccountSearch}`)
        return res.data;
    } catch (e) {
        console.log(e)
    }
}
const findAllAccount = async () => {
    const res = await axios.get(`http://localhost:8080/home/admin/employee/account`)
    let arr =  res.data
    let ids = [];
    for (let i = 0; i < arr.length; i++) {
        ids.push(arr[i].idAccount);
    }
    console.log(Math.max(...ids))

}
export const accountService = {
    addAccount,
    findAllAccount,
    findByName
}
