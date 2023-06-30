import request from '../config/http'
import axios from "axios";

export const findAll = async  () => {
    try {
        const result = await axios.get("http://localhost:8080/api/sale/list")
        return result.data
    }catch (e){
        console.log(e)
    }
}

const sale = {
    findAll
}

export default sale