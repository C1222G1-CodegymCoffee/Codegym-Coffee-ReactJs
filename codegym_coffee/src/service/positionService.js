import request from "../request";

const findAll = () => {
    try {
        return request.get('/position', {
            headers:
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
                },
        })
    } catch (error) {
        console.log(error);
    }
}
const positionService = {
    findAll
}

export default positionService;