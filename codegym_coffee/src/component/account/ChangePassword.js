import "./accountStyle.css"
import {Header} from "../Homepage/Header";
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router";
import employeeInformationService from "../../service/employeeInformationService";
import {NavLink} from "react-router-dom";

export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const navigate = useNavigate()
    const params = useParams();
    const [employeeDetail,setEmployeeDetail] = useState()
    useEffect(() => {
        document.title = "Đổi mật khẩu";
    }, [])
    useEffect(() => {
        const detail = async () => {
            try {
                const res = await employeeInformationService.detail()
                setEmployeeDetail(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        detail()
    }, [])
    if(!employeeDetail){
        return null
    }
    return (
        <>
            <Header/>
            {
                <div className="container" style={{ marginTop: "16%",paddingBottom: 30}}>
                <div className="row row-no-gutters col-xs-12 col-md-12 pt-5">
                    <div className="col-xs-4 col-md-4" id="a">
                        <p className="text-center" style={{ marginTop: 10 }}>
                            <img
                                src={employeeDetail?.image}
                                className="rounded-circle avatar"
                                style={{ width: 200 }}
                                height="200px"
                            />
                        </p>
                        <h3 style={{ textAlign: "center" }}>{employeeDetail?.account.nameAccount}</h3>
                        <div className="mt-3" style={{ textAlign: "center" }}>
                            <i className="bi bi-emoji-smile" />
                            Chào mừng bạn trở lại
                        </div>
                        <hr />
                        <div className="col-12">
                            <ul className="quynh-app-menu">
                                <li className="quynh-li">
                                    <NavLink to={`/`} className="quynh-app-menu__item " href="AccountInformation.html">
                                        <i className="bi bi-person-bounding-box" />
                                        <span className="quynh-app-menu__label">Thông tin tài khoản</span>
                                    </NavLink>
                                </li>
                                {/*                    <li><a class="quynh-app-menu__item " href="ChangePassword.html"><i class="bi bi-file-lock"></i><span*/}
                                {/*                          class="quynh-app-menu__label">Đổi mật khẩu</span></a></li>*/}
                            </ul>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmPasswore: ''
                        }}
                        onSubmit={(value) => {
                            const changePassword = async () => {
                                try {
                                    await employeeInformationService.updatePassword(value)
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    localStorage.clear()
                                    navigate('/login')
                                } catch (error) {
                                    const err = error.response.data
                                    console.log(err);
                                    if (err === "Mật khẩu hiện tại không đúng") {
                                        document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu hiện tại không đúng"
                                    } else if (err.oldPassword === "Không được bỏ trống") {
                                        document.getElementById("oldPasswordErr").innerHTML = "Không được bỏ trống"
                                    } else if (err.oldPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                        document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                    } else {
                                        document.getElementById("oldPasswordErr").innerHTML = ""
                                    }

                                    if (err === "Mật khẩu mới không được trùng với mật khẩu cũ") {
                                        document.getElementById("newPasswordErr").innerHTML = "Mật khẩu mới không được trùng với mật khẩu cũ"
                                    } else if (err.newPassword === "Không được bỏ trống") {
                                        document.getElementById("newPasswordErr").innerHTML = "Không được bỏ trống"
                                    } else if (err.newPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                        document.getElementById("newPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                    } else {
                                        document.getElementById("newPasswordErr").innerHTML = ""
                                    }


                                    if (err === "Mật khẩu xác nhận không trùng khớp") {
                                        document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu xác nhận không trùng khớp"
                                    } else if (err.confirmPassword === "Không được bỏ trống") {
                                        document.getElementById("confirmPasswordErr").innerHTML = "Không được bỏ trống"
                                    } else if (err.confirmPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                        document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                    } else {
                                        document.getElementById("confirmPasswordErr").innerHTML = ""
                                    }

                                }
                            }
                            changePassword()
                        }}
                    >
                        {/*<Form className="container">*/}
                            <Form className="col-xs-7 col-sm-7 col-md-7" id="b">
                                <div className="border-form">
                                    <h2 style={{textAlign: "center"}} className="bg-coffe py-2 text-white">Thay đổi mật
                                        khẩu</h2>
                                    <br/>
                                    <div className="row" style={{marginBottom: "3%"}}>
                                        <div className="col-4" style={{textAlign: "left"}}>
                                            <label className="fw-bold" style={{marginRight: "2%"}}>
                                                Mật khẩu cũ <span style={{color: "red"}}>(*)</span>:
                                            </label>
                                        </div>
                                        <div className="col-7 m-auto position-relative">
                                            <Field
                                                type={showPassword ? "text" : "password"}
                                                 className="form-control"
                                                name="oldPassword"/>
                                            {
                                                showPassword ? <span type='button' onClick={() => {
                                                        setShowPassword(!showPassword)
                                                    }}
                                                                     className="bi bi-eye-slash me-2 eye-password"></span> :
                                                    <span type='button' onClick={() => {
                                                        setShowPassword(!showPassword)
                                                    }}
                                                          className="bi bi-eye me-2 eye-password"></span>
                                            }
                                        </div>
                                        {/*<div className="row">*/}
                                        {/*    <div className="col-3 m-auto"></div>*/}
                                        {/*    <div className="col-7 m-auto">*/}
                                        {/*        <span className="text-danger fs-6" id="oldPasswordErr"></span>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className="row" style={{marginBottom: "3%"}}>
                                        <div className="col-4" style={{textAlign: "left"}}>
                                            <label className="fw-bold" style={{marginRight: "2%"}}>
                                                Mật khẩu mới <span style={{color: "red"}}>(*)</span>:
                                            </label>
                                        </div>
                                        <div className="col-7 m-auto position-relative">
                                            <Field
                                                type={showNewPassword ? "text" : "password"}
                                                 className="form-control"
                                                name="newPassword"/>
                                            {
                                                showNewPassword ? <span type='button' onClick={() => {
                                                        setShowNewPassword(!showNewPassword)
                                                    }}
                                                                        className="bi bi-eye-slash me-2 eye-password"></span> :
                                                    <span type='button' onClick={() => {
                                                        setShowNewPassword(!showNewPassword)
                                                    }}
                                                          className="bi bi-eye me-2 eye-password"></span>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-3 m-auto"></div>
                                            <div className="col-7 m-auto">
                                                <span className="text-danger fs-6" id="newPasswordErr"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{marginBottom: "3%"}}>
                                        <div className="col-4" style={{textAlign: "left"}}>
                                            <label className="fw-bold" style={{marginRight: "2%"}}>
                                                Mật khẩu xác nhận <span style={{color: "red"}}>(*)</span>:
                                            </label>
                                        </div>
                                        <div className="col-7 m-auto position-relative">
                                            <Field
                                                type={showPasswordConfirm ? "text" : "password"}
                                                className="form-control"
                                                name="confirmPassword"/>
                                            {
                                                showPasswordConfirm ? <span type='button' onClick={() => {
                                                        setShowPasswordConfirm(!showPasswordConfirm)
                                                    }}
                                                                            className="bi bi-eye-slash me-2 eye-password"></span> :
                                                    <span type='button' onClick={() => {
                                                        setShowPasswordConfirm(!showPasswordConfirm)
                                                    }}
                                                          className="bi bi-eye me-2 eye-password"></span>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-3 m-auto"></div>
                                            <div className="col-7 m-auto">
                                                <span className="text-danger fs-6" id="confirmPasswordErr"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="row mt-4"
                                    >
                                        <div className="col-6 text-end">
                                            <buton
                                                type="button"
                                                onClick={() => {
                                                    navigate('/')
                                                }}
                                                style={{
                                                    backgroundColor: "#B29A81",
                                                    width: 80,
                                                    color: "#ffffff",
                                                    padding: 5,
                                                    textAlign: "center",
                                                    marginRight: 10,
                                                    paddingRight: 5,
                                                    borderRadius: 10
                                                }}
                                            >
                                                Quay về
                                            </buton>
                                        </div>
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                style={{
                                                    backgroundColor: "#8C6842",
                                                    width: 80,
                                                    color: "#ffffff",
                                                    padding: 5,
                                                    textAlign: "center",
                                                    marginRight: 10,
                                                    paddingRight: 5,
                                                    borderRadius: 10
                                                }}
                                            >
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                    </Formik>
                </div>
                </div>
            }
        </>
    )

}