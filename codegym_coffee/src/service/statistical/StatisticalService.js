import axios from "axios";

export const findAllSum = async (datAfter,dateBefore)=>{
    try {
        return await axios.get(`http://localhost:8080/statistic?dateAfter=${datAfter}&dateBefore=${dateBefore}`)
    }catch (e) {
        console.log(e)
    }
}