import axios from "axios";

const addAccount = async (value) => {
    await  axios.post(`http://localhost:8080/api/admin/account`,{ ...value })
}
const findByName = async (nameAccountSearch) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/account/${nameAccountSearch}`)
        return res.data;
    } catch (e) {
        console.log(e)
    }
}
const findAllAccount = async () => {
    const res = await axios.get(`http://localhost:8080/api/admin/account`)
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
