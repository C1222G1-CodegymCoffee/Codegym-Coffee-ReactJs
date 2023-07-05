import axios from "axios";

export const save = async (news)=>{
    try {
        await axios.post(`http://localhost:8080//v2/create-news`,{...news },
            {
                headers:
                    {
                        'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
                        //   'Authorization': 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUaG9uZ0FkbWluIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODg1NDIxMDcsImV4cCI6MTY4ODYyODUwN30.HvyaQWe8aJdKeByZqB6_8nwVyoVa890IKdiFDMnH5g3YKIt1Leg9Ek8rqsrIVfrR1lDKeIEIttrnZv_mrUydDg"
                    },
            }
        );
    }catch (e) {
        console.log(e)
    }
}

export const findAllNews = async () =>{
    try{
        const result = await axios.get(`http://localhost:8080/api/admin/list-news`)
        return result.data
    }catch (error) {
        console.log(error)
    }
};



export const findByIdNews = async (id)=>{
    try {
        const result = await axios.get(`http://localhost:8080/api/detail-news/${id}`)
        return result.data
    }catch (e) {
        console.log(e)
    }
}
