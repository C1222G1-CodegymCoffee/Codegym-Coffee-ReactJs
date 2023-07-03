import request from "../request";

const detail = () => {
    const token = localStorage.getItem('token')
    try {
        const res = request.get('/employee/detail',
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODgxOTk4ODgsImV4cCI6MTY4ODI4NjI4OH0.Df60len5XIBst0bF6I0aoNV_5Ofmeu11MleICt2FCPOzctkkXuLKMQKEeK1PgCWbME6FzwbPAEdTP8JDnU7Ubg'
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
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODgxOTk4ODgsImV4cCI6MTY4ODI4NjI4OH0.Df60len5XIBst0bF6I0aoNV_5Ofmeu11MleICt2FCPOzctkkXuLKMQKEeK1PgCWbME6FzwbPAEdTP8JDnU7Ubg'
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
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODgxOTk4ODgsImV4cCI6MTY4ODI4NjI4OH0.Df60len5XIBst0bF6I0aoNV_5Ofmeu11MleICt2FCPOzctkkXuLKMQKEeK1PgCWbME6FzwbPAEdTP8JDnU7Ubg'
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