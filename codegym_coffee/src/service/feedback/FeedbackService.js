import axios from 'axios'

export const find = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/feedbacks/detail/${id}`,
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
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/feedbacks/search?searchTerm=${searchTerm}&dayOfFeedback=${dayOfFeedback}&page=${page}&size=${size}`,
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
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/feedbacks/?page=${page}&size=${size}`,
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
    try {
        await axios.post(`http://localhost:8080/api/feedbacks/create-feedback`, {...feedback},
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