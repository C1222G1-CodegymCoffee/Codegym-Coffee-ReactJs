import axios from 'axios'


export const findAll = async () => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get('http://localhost:8080/api/admin/list-feedback',
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                    }
            })
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const find = async (id) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/feedback/detail/${id}`,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                    }
            })
        return res;
    } catch (error) {
        console.log(error)
    }
}
export const search = async (searchTerm, dayOfFeedback, page, size) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/list-feedback/search?searchTerm=${searchTerm}&dayOfFeedback=${dayOfFeedback}&page=${page}&size=${size}`,
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

export const getFeedbacks = async (page, size) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/list-feedback/?page=${page}&size=${size}`,
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                    }
            });
        console.log("res",result.data)
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

export const saveFeedback = async (feedback) => {
    const token = localStorage.getItem('token')
    try {
        await axios.post(`http://localhost:8080/api/public/create-feedback`, {...feedback},
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN")
                    }
            });
    } catch (e) {
        console.log(e);
    }
};