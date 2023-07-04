import axios from "axios";

export const save = async (news)=>{
    try {
        await axios.post(`http://localhost:8080/news/createNews`, { ...news })
    }catch (e) {
        console.log(e)
    }
}