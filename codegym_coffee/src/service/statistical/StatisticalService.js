import axios from "axios";

export const findAllSum = (dateAfter,dateBefore)=>{
        return axios.get(`http://localhost:8080/api/admin/statistical?dateAfter=${dateAfter}&dateBefore=${dateBefore}`,
            {
                headers:
                    {
                            'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
                        // 'Authorization': 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUaG9uZ0FkbWluIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODg1NDIxMDcsImV4cCI6MTY4ODYyODUwN30.HvyaQWe8aJdKeByZqB6_8nwVyoVa890IKdiFDMnH5g3YKIt1Leg9Ek8rqsrIVfrR1lDKeIEIttrnZv_mrUydDg"
                    },
                }
        );
}