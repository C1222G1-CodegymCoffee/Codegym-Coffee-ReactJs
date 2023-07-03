import request from "../request";
const findAll=()=>{
    // const token = localStorage.getItem('token')
    try {
        return request.get('/position')
    } catch (error) {
        console.log(error);
    }
}
const positionService = {
    findAll
}

export default positionService;