import axios from 'axios';

export const postLogin = async (request) => {
    const res = await axios.post("http://localhost:8080/auth/login", request);
    return res.data;
}

export const getEmail = async (genericRequest) => {
    try {
        const res = await axios.post(`http://localhost:8080/forgot_password`, genericRequest);
        console.log(res);
        return res;
        // return res;
    } catch(error){
        console.error("loi hien thi");
    }
}

export const postResetPassword = async (genericRequest) => {
    try {
        const res = await axios.post(`http://localhost:8080/reset_password`, genericRequest);
        console.log(res);
        return res;
        // return res;
    } catch(error){
        console.error("loi hien thi");
    }
}

export const getError = async () => {
    try {
        const res = await axios.post(`http://localhost:8080/403`);
        console.log(res);
        return res;
        // return res;
    } catch(error){
        console.error("loi hien thi");
    }
}

