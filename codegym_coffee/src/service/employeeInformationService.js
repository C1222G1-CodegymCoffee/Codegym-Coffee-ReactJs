import request from "../request";

const detail = () => {
    // const token = localStorage.getItem('token')
    try {
        const res = request.get('/employee/detail',
            // {
            //     headers:
            //         {
            //             'Authorization': 'Bearer ' + token
            //         }
            // }
        )
        return res
    } catch (error) {
        console.log(error);
    }
}
const update = (value) => {
    // const token = localStorage.getItem('token')
    try {
        const res = request.patch('/employee',{...value}
        // ,
            // {
            //     headers:
            //         {
            //             'Authorization': 'Bearer ' + token
            //         }
            // }
        )
        return res
    } catch (error) {
        console.log(error);
    }
}
const employeeInformationService = {
    detail,
    update
}

export default employeeInformationService;