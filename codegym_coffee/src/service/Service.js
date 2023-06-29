import axios from 'axios';

export const postLogin = async (request) => {
    try {
        const res = await axios.post("http://localhost:8080/api/login", request);
        return res;
    } catch(error){
        console.error("loi hien thi");
    }
}