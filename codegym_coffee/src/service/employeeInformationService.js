import request from "../request";

const detail = () => {
    try {
        const res = request.get('/employee/detail',
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
    try {
        const res = request.patch('/employee/update',{...value}
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
    try {
        const res = request.put('/account/change-password',{...value}
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