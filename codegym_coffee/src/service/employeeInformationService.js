import request from "../request";

const detail = () => {
    const token = localStorage.getItem('token')
    try {
        const res = request.get('/employee/detail',
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + 'token'
                    }
            }
        )
        return res
    } catch (error) {
        console.log(error);
    }
}
const update = (value) => {
    const token = localStorage.getItem('token')
    try {
        const res = request.patch('/employee/update',{...value}
        ,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + 'token'
                    }
            }
        )
        return res
    } catch (error) {
        console.log(error);
    }
}
const updatePassword = (value) => {
    const token = localStorage.getItem('token')
    try {
        const res = request.put('/account/change-password',{...value}
        ,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + 'token'
                    }
            }
        )
        return res
    } catch (error) {
        console.log(error);
    }
}
const employeeInformationService = {
    detail,
    update,
    updatePassword
}

export default employeeInformationService;