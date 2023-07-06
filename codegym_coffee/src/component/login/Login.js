import "../../css/login/login.css";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {getEmail, postLogin} from "../../service/Service";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [failedAccount, setFailedAccount] = useState(null);

    const handlePassword = () => {
        const formPw = document.querySelector(".form-pw");

        if (showPassword) {
            formPw.setAttribute("type", "password");
        } else {
            formPw.setAttribute("type", "text");

        }

        setShowPassword((pre) => !pre);
    }

    const handleEmail = async () => {
        const email = document.querySelector(".email-password").value;
        let genenicRequest = {
            emailConfirm: email,
            location: window.location.origin,
        }
        getEmail(genenicRequest)
            .then((e) => {
                document.cookie = "token=" + e.data.token;
                console.log(e.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Gửi email thành công',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(() => {
                setFailedAccount("Email không hợp lệ")
            })
    }

    if (!!sessionStorage.getItem("TOKEN")) {
        navigate('/');
        return null;
    }

    return (
        <div className="container" id="loginPage">
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

                        validationSchema={Yup.object().shape({
                            nameAccount: Yup.string().required("trường này không được để trống"),

                            password: Yup.string()
                                .required("trường này không được để trống")
                                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, "mật khẩu phải có ít nhất 1 chữ hoa,ít nhất 1 chữ thường, có 1 ký tự và số"),
                        })}

                        onSubmit={(values) => {
                            postLogin(values)
                                .then((e) => {
                                    sessionStorage.setItem('TOKEN', e.accessToken);
                                    sessionStorage.setItem('USERNAME', e.nameAccount);
                                    sessionStorage.setItem('ROLES', e.roles[0].authority)
                                    window.location.href = '/';
                                })
                                .catch(() => {
                                        setFailedAccount("Tên tài khoản hoặc mật khẩu không đúng")
                                    }
                                );
                        }}
                    >
                        <Form>
                            <div className="mb-3 input-group">
                                <Field type="text" className="form-control form-custom" placeholder="Tên đăng nhập"
                                       name="nameAccount"/>
                                <ErrorMessage name="nameAccount" className="text-danger col-12" component="span"/>

                            </div>
                            <div className="mb-3 my-5 input-group">
                                <Field type="password" className="form-control form-custom form-pw"
                                       placeholder="Mật khẩu" name="password"/>
                                <span className="password-icon" onClick={() => handlePassword()}>
                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}/>
                                    </span>

                                <ErrorMessage name="password" className="text-danger col-12" component="span"/>
                                {failedAccount && (
                                    <span className="text-danger col-12">{failedAccount}</span>
                                )}
                            </div>
                            <div className="mb-3 float-end">
                                <a className="text-forgot-password text-decoration-none" data-bs-toggle="modal"
                                   data-bs-target="#exampleModal">Quên mật khẩu?</a>
                            </div>
                            <button type="submit" className="col-12 button">Đăng nhập</button>
                        </Form>
                    </Formik>

                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-modal">
                        <div className="modal-header">
                            <h5 className="modal-title text-dark" id="exampleModalLabel"><h3 className="text-modal">Lấy
                                mật khẩu</h3></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1"
                                       className="form-label text-secondary">Email <sup className="text-danger">*</sup></label>
                                <input type="email" className="form-control text-dark email-password"
                                       id="exampleFormControlInput1" placeholder="nhập email..."/>
                                <div id="emailHelp" className="form-text">Chúng tôi sẽ gửi mật khẩu qua email của bạn.
                                </div>
                                {failedAccount && (
                                    <span className="text-danger col-12">{failedAccount}</span>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn button btn-secondary bg-secondary text-capitalize"
                                    data-bs-dismiss="modal">Hủy
                            </button>
                            <button type="button" className="btn button btn-success text-capitalize" onClick={() => {
                                handleEmail()
                            }}>Gửi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;