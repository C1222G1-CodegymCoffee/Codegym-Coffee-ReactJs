import axios from "axios";

export const save = async (news)=>{
    try {
        await axios.post(`http://localhost:8080/news/createNews`, { ...news })
    }catch (e) {
        console.log(e)
    }
}

export const findAllNews = async () =>{
    try{
        const result = await axios.get(`http://localhost:8080/api/list-news`)
        return result.data
    }catch (error) {
        console.log(error)
    }
};



export const findByIdNews = async (id)=>{
    try {
        const result = await axios.get(`http://localhost:8080/api/detail-news/${id}`)
        return result.data
    }catch (e) {
        console.log(e)
    }
}
