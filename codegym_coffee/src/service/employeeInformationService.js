import request from "../request";

const detail = () => {
    const token = localStorage.getItem('token')
    try {
        const res = request.get('/v2/employee/detail',
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
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
        const res = request.patch('/v2/employee/update',{...value}
        ,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' +  sessionStorage.getItem("TOKEN")
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
        const res = request.put('/v2/account/change-password',{...value}
        ,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' +  sessionStorage.getItem("TOKEN")
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