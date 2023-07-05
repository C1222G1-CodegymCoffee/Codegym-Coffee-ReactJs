import axios from 'axios'


export const findAll = async () => {
    try {
        const result = await axios.get('http://localhost:8080/api/admin/feedback/')
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const find = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/admin/feedback/${id}`)
        return res;
    } catch (error) {
        console.log(error)
    }
}
export const search = async (searchTerm, dayOfFeedback, page, size) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/feedback/search?searchTerm=${searchTerm}&dayOfFeedback=${dayOfFeedback}&page=${page}&size=${size}`)
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const getFeedbacks = async (page, size) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/admin/feedback/?page=${page}&size=${size}`);
        console.log(result)
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

export const saveFeedback = async (feedback) => {
    try {
        await axios.post(`http://localhost:8080/api/create-feedback`, {...feedback});
    } catch (e) {
        console.log(e);
    }
};