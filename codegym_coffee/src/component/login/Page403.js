import { getError } from "../../service/Service";
import { useState, useEffect } from "react";

function Page403() {
    const [message, setMessage] = useState("");

    const handleDisplay = async () => {
        const res = await getError();
        setMessage(res);
      };

      useEffect(() => {
        handleDisplay();
      }, []);

    return (
        <h1>Bạn ko có quyền truy cập trang này</h1>
    )
}

export default Page403;