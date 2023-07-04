import request from "../request";

const detail = () => {
    const token = localStorage.getItem('token')
    try {
        const res = request.get('/employee/detail',
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODg0NjI4NTMsImV4cCI6MTY4ODU0OTI1M30.m1Ucjy4iltn72-0HTr-j7ky3iGXbxH__aYswCVB-9kODJpAd6W7e-e1HW9zBs5fT8fZIN2E3wiK4P6yIfNMmPA'
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
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODg0NjI4NTMsImV4cCI6MTY4ODU0OTI1M30.m1Ucjy4iltn72-0HTr-j7ky3iGXbxH__aYswCVB-9kODJpAd6W7e-e1HW9zBs5fT8fZIN2E3wiK4P6yIfNMmPA'
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
                        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmhxdWFuMTIzIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODg0NjI4NTMsImV4cCI6MTY4ODU0OTI1M30.m1Ucjy4iltn72-0HTr-j7ky3iGXbxH__aYswCVB-9kODJpAd6W7e-e1HW9zBs5fT8fZIN2E3wiK4P6yIfNMmPA'
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