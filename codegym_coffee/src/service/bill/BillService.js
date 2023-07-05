import axios from 'axios'


// export const findAll = async () => {
//     try {
//         const result = await axios.get('http://localhost:8080/api/admin/list-bill/')
//         return result.data
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const findBillCode = async (nameSearch) => {
//     try {
//         const result = await axios.get(`http://localhost:8080/api/admin/bill/code/${nameSearch}`)
//         return result.data
//     } catch (error) {
//         console.log(error);
//     }
// }

export const search = async (searchTerm, dayOfBill) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/bill/search?searchTerm=${searchTerm}&dayOfBill=${dayOfBill}`,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                    }
            })
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const getBills = async (page, size) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/list-bill/?page=${page}&size=${size}`, {
            headers:
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                }
        });
        console.log(result)
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

