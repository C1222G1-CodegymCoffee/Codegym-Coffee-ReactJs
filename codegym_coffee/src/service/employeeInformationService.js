import request from "../request";

const detail = () => {
    const token = localStorage.getItem('token')
    try {
        const res = request.get('/employee/detail',
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODgzNzU5ODksImV4cCI6MTY4ODQ2MjM4OX0.EHjQE9XPgRV6VLbpgoLlUW0F0Siw7_BMAFjdAjmcGJ3IDeR21l8l0Fi9HEluqYc3XO9Em7DNUTUEeO2ucqjpmA'
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
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODgzNzU5ODksImV4cCI6MTY4ODQ2MjM4OX0.EHjQE9XPgRV6VLbpgoLlUW0F0Siw7_BMAFjdAjmcGJ3IDeR21l8l0Fi9HEluqYc3XO9Em7DNUTUEeO2ucqjpmA'
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
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODg0NTQyMTksImV4cCI6MTY4ODU0MDYxOX0.-0n-XGTkwJAkrNn1Tq5hhfonyLJsScd1QJMYAtnm-RXcQRRj3Al4lZNZyzSKjIwBi6dJNSllerGa1XyapqcJ2A'
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