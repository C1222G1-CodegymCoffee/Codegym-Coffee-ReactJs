import "../../css/login/login.css";
import { Formik, Form, Field } from "formik";
import { getEmail, postLogin } from "../../service/Service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleInputEmail = (e) => {
      setEmail((prev) => prev = e.target.value);
    }

    const handleEmail = (email) => {
      // let res = await getEmail(email)
      console.log(email);
    }

    return (
        <div className="container">
        <div className="content row w-500">
            <div className="content-right col-lg-6 col-md-12 col-sm-12">
            </div>
            <div className="content-left col-lg-6 col-md-12 col-sm-12 m-auto">
                    <h1 className="text-center mb-5">Đăng nhập</h1>
                    <Formik
                        initialValues={{
                            nameAccount: "",
                            password: ""
                        }}

                        onSubmit={(values) => {
                            const login = async () => {
                                await postLogin(values);
                                console.log(values);
                                navigate('/');
                            }
                            login();
                        }} 
                    >
                        {
                        <Form>
                            <div className="mb-3">
                                <Field type="text" className="form-control form-custom" placeholder="Tên đăng nhập" name="nameAccount"/>
                                {/* <div id="emailHelp" className="form-text text-danger fs-15">Trường này không được để trống</div> */}
                            </div>
                            <div className="mb-3 my-5 input-group">
                              <Field type="password" className="form-control form-custom form-pw" placeholder="Mật khẩu" name="password"/>
                              <i className="bi bi-eye-slash float-end icon-custom"></i>
                              {/* <div id="emailHelp" className="form-text text-danger col-12 fs-15">Trường này không được để trống</div> */}
    
                            </div>
                            <div className="mb-3 float-end">
                              <a className="text-forgot-password text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Quên mật khẩu?</a>
                            </div>
                            <button type="submit" className="col-12 button">Đăng nhập</button>
                        </Form>
                        }
                    </Formik>
                    
            </div>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-modal">
                <div className="modal-header">
                  <h5 className="modal-title text-dark" id="exampleModalLabel"><h3 className="text-modal">Lấy mật khẩu</h3></h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label text-secondary">Email <sup className="text-danger">*</sup></label>
                        <input type="email" className="form-control text-dark email-password" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                        {/* <span className="text-danger fs-15">Email sai định dạng</span> */}
                        <div id="emailHelp" className="form-text">Chúng tôi sẽ gửi mật khẩu qua email của bạn.</div>
                      </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn button btn-secondary bg-secondary text-capitalize" data-bs-dismiss="modal">Hủy</button>
                  <button type="button" className="btn button btn-success text-capitalize" onClick={handleEmail(email)}>Gửi</button>
                </div>
              </div>
            </div>
          </div>
    </div>
    )
}

export default Login;