import axios from "axios";

export const saveFeedback = async (feedback) => {
    try {
        await axios.post(`http://localhost:8080/api/public/create-feedback`, {...feedback});
    } catch (e) {
        console.log(e);
    }
};