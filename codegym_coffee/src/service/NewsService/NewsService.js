import axios from "axios";

export const save = async (news) => {
    try {
        await axios.post(`http://localhost:8080/news`, {...news},
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
                    },
            }
        );
    } catch (e) {
        console.log(e)
    }
}

export const findAllNews = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/news/list`)
        return result.data
    } catch (error) {
        console.log(error)
    }
};


export const findByIdNews = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/detail-news/${id}`)
        return result.data
    } catch (e) {
        console.log(e)
    }
}
