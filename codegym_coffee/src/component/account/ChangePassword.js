import "./accountStyle.css"
import { Header } from "../Homepage/Header";
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import employeeInformationService from "../../service/employeeInformationService";
import { NavLink } from "react-router-dom";
export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const navigate = useNavigate()
    return (
        <>
            <Header />
            {
                <div className="row row-no-gutters col-xs-12 col-md-12 pt-5">
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
                        <Form className="container">
                            <div className=" col-7" id="b">
                                <div>
                                    <h2 style={{ textAlign: "center" }} className="bg-coffe py-2 text-white">Thay đổi mật khẩu</h2>
                                    <br />
                                    <div className="row" >
                                        <div className="col-3 m-auto" style={{ textAlign: "left" }}>
                                            <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                Mật khẩu cũ <span style={{ color: "red" }}>(*)</span>:
                                            </label>
                                        </div>
                                        <div className="col-5 m-auto position-relative">
                                            <Field
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Nhập mật khẩu hiện tại" className="form-control" name="oldPassword" />
                                            {
                                                showPassword ? <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                    className="bi bi-eye-slash me-2 eye-password"></span> :
                                                    <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                        className="bi bi-eye me-2 eye-password"></span>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-3 m-auto"></div>
                                            <div className="col-5 m-auto">
                                                <span className="text-danger fs-6" id="oldPasswordErr"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4" >
                                        <div className="col-3 m-auto" style={{ textAlign: "left" }}>
                                            <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                Mật khẩu mới <span style={{ color: "red" }}>(*)</span>:
                                            </label>
                                        </div>
                                        <div className="col-5 m-auto position-relative">
                                            <Field
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Nhập mật khẩu mới" className="form-control" name="newPassword" />
                                            {
                                                showNewPassword ? <span type='button' onClick={() => { setShowNewPassword(!showNewPassword) }}
                                                    className="bi bi-eye-slash me-2 eye-password"></span> :
                                                    <span type='button' onClick={() => { setShowNewPassword(!showNewPassword) }}
                                                        className="bi bi-eye me-2 eye-password"></span>
                                            }

                                        </div>
                                        <div className="row">
                                            <div className="col-3 m-auto"></div>
                                            <div className="col-5 m-auto">
                                                <span className="text-danger fs-6" id="newPasswordErr"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-3 m-auto" style={{ textAlign: "left" }}>
                                            <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                Mật khẩu xác nhận <span style={{ color: "red" }}>(*)</span>:
                                            </label>
                                        </div>
                                        <div className="col-5 m-auto position-relative" style={{ marginRight: "2%" }}>
                                            <Field
                                                type={showPasswordConfirm ? "text" : "password"}
                                                placeholder="Nhập mật khẩu xác nhận" className="form-control" name="confirmPassword" />
                                            {
                                                showPasswordConfirm ? <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                    className="bi bi-eye-slash me-2 eye-password"></span> :
                                                    <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                        className="bi bi-eye me-2 eye-password"></span>
                                            }

                                        </div>
                                        <div className="row">
                                            <div className="col-3 m-auto"></div>
                                            <div className="col-5 m-auto">
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
                                                onClick={()=>{navigate('/')}}
                                                className="button-movie"
                                                style={{ background: "#B29A81" }}
                                            >
                                                Quay về
                                            </buton>
                                        </div>
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                className="button-movie"
                                                style={{ background: "#8C6842" }}
                                            >
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            }
        </>
    )

}