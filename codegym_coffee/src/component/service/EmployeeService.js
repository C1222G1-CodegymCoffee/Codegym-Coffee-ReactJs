import axios from "axios";

export const findAllPosition = async () => {
    const res = await axios.get(`http://localhost:8080/position`, {
        headers:
            {
                'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
            }
    });
    return res.data
}


const addEmployee = async (value) => {
    await axios.post(`http://localhost:8080/api/admin/employee/create`, {...value}, {
        headers:
            {
                'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
            }
    })
}
const findByName = async (nameSearch) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/employee/${nameSearch}`, {
            headers:
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                }
        })
        return res.data;
    } catch (e) {
        console.log(e)
    }
}
const deleteByIdEmployee = async (idDelete) => {
    await axios.delete(`http://localhost:8080/api/admin/employee/${idDelete}`, {
        headers:
            {
                'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
            }
    })
}
const findByEmployee = async (nameSearch, nameAccount, phoneNumber) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/employee/search?nameEmployee=${nameSearch}&nameAccount=${nameAccount}&phoneNumber=${phoneNumber}`,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                    }
            })
        return res.data;
    } catch (e) {
        console.log(e)
    }
}
export const getEmployees = async (page, size) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/employee/?page=${page}${size ? `&size=${size}` : ''}`, {
            headers:
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                }
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
export const employeeService = {
    findByName,
    addEmployee,
    findAllPosition,
    getEmployees,
    findByEmployee,
    deleteByIdEmployee
}


