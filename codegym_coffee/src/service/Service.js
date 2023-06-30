import axios from 'axios';

export const postLogin = async (request) => {
    try {
        const res = await axios.post("http://localhost:8080/api/login", request);
        console.log(res);
        // return res;
    } catch(error){
        console.error("loi hien thi");
    }
}

export const getEmail = async (email) => {
    try {
        const res = await axios.get(`http://localhost:8080/reset_password?email=${email}`);
        console.log(res);
        // return res;
    } catch(error){
        console.error("loi hien thi");
    }
}