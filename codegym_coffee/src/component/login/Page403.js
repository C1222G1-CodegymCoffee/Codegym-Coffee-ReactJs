import { getError } from "../../service/Service";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

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
      <body className="bg-dark text-white py-5">
        <div className="container py-5">
            <div className="row">
                  <div className="col-md-2 text-center">
                      <p><i className="fa fa-exclamation-triangle fa-5x text-danger"></i></p>
                  </div>
                  <div className="col-md-10">
                      <h3 className="text-dark">OPPSSS!!!!</h3>
                      <p className="text-dark">Xin lỗi bạn không có quyền truy cập trang này.</p>
                      <Link className="btn btn-danger" to="/">Trở về trang chủ</Link>
                  </div>
            </div>
        </div>
      </body>
    )
}

export default Page403;