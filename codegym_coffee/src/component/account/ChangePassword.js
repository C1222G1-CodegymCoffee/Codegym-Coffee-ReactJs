import "./accountStyle.css"
import {Header} from "../Homepage/Header";
import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [showFormChangePassword, setShowFormChangePassword] = useState(false)
    return(
        <>
            <Header/>
            {
                <div className="container" style={{ marginTop: "15%" }}>
                    <div className="row row-no-gutters col-xs-12 col-md-12">
                        <div className="col-xs-4 col-md-4" id="a">
                            {/*            <h2 style="font-size: 24px">Quản lý tài khoản</h2>*/}
                            <p className="text-center" style={{ marginTop: 10 }}>
                                <img
                                    src="https://www.w3schools.com/Bootstrap/bandmember.jpg"
                                    className="rounded-circle avatar"
                                    style={{ width: 300 }}
                                    height="300px"
                                />
                            </p>
                            <h3 style={{ textAlign: "center" }}>Admin1</h3>
                            <div className="mt-3" style={{ textAlign: "center" }}>
                                <i className="bi bi-emoji-smile" />Chào mừng bạn trở lại
                            </div>
                            <hr />
                            <div className="col-12" style={{ marginTop: "10%" }}>
                                <ul className="quynh-app-menu">
                                    <li>
                                        <a className="quynh-app-menu__item " href="AccountInformation.html">
                                            <i className="bi bi-person-bounding-box " />
                                            <span className="quynh-app-menu__label">Thông tin tài khoản</span>
                                        </a>
                                    </li>
                                    {/*<li>*/}
                                    {/*    <a className="quynh-app-menu__item " href="ChangePassword.html">*/}
                                    {/*        <i className="bi bi-file-lock" />*/}
                                    {/*        <span className="quynh-app-menu__label">Đổi mật khẩu</span>*/}
                                    {/*    </a>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>
                            {/* <div class="mt-3" style="text-align: center">
          <button type="button" class="button-movie" style="width: 110px;background-color: #B29A81">
             <i class="bi bi-arrow-right-circle"></i>
              Đăng xuất
          </button>
      </div> */}
                            {/* <div class="mt-2">
          <hr>
          <a href="AccountInformation.html" style="font-size: 16px;text-decoration: none;color: black">
          <i class="bi bi-person-bounding-box"></i>
          Thông tin tài khoản</a>
          <hr>
      </div>

      <div class="mt-2">

          <a href="ChangePassword.html" style="font-size: 16px;text-decoration: none;color: black">
          <i class="bi bi-file-lock"></i>
          Đổi mật khẩu</a>
          <hr>
      </div> */}
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
                                        await loginService.changePassword(value)
                                        localStorage.removeItem('token')
                                        localStorage.removeItem('avatar')
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        navigate('/login')
                                    } catch (error) {
                                        const err = error.response.data
                                        console.log(err);
                                        if (err.message === "Mật khẩu hiện tại không đúng") {
                                            document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu hiện tại không đúng"
                                        } else if (err.oldPassword === "Không được bỏ trống") {
                                            document.getElementById("oldPasswordErr").innerHTML = "Không được bỏ trống"
                                        } else if (err.oldPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                            document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                        } else {
                                            document.getElementById("oldPasswordErr").innerHTML = ""
                                        }

                                        if (err.message === "Mật khẩu mới không được trùng với mật khẩu cũ") {
                                            document.getElementById("newPasswordErr").innerHTML = "Mật khẩu mới không được trùng với mật khẩu cũ"
                                        } else if (err.newPassword === "Không được bỏ trống") {
                                            document.getElementById("newPasswordErr").innerHTML = "Không được bỏ trống"
                                        } else if (err.newPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                            document.getElementById("newPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                        } else {
                                            document.getElementById("newPasswordErr").innerHTML = ""
                                        }


                                        if (err.message === "Mật khẩu xác nhận không trùng khớp") {
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
                            <Form>
                        <div className="col-xs-7 col-sm-7 col-md-7" id="b">
                            <div className="border-form" style={{ marginTop: "10%" }}>
                                <h2 style={{ textAlign: "center" }}>Thay đổi mật khẩu</h2>
                                <br />
                                <div className="row" style={{ marginBottom: "3%" }}>
                                    <div className="col-4" style={{ textAlign: "left" }}>
                                        <label className="fw-bold" style={{ marginRight: "2%" }}>
                                            Mật khẩu cũ <span style={{ color: "red" }}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <Field type={showPassword ? "text" : "password"}
                                               placeholder="Nhập mật khẩu hiện tại" className="input-login" name="oldPassword" style={{ width: "100%" }} />
                                        {
                                            showPassword ? <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                                 className="bi bi-eye-slash me-2 "></span> :
                                                <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                      className="bi bi-eye me-2"></span>
                                        }
                                        {/*<span className="mt-2 text-danger">Mật khẩu cũ không đúng</span>*/}
                                    </div>
                                </div>
                                <div className="row" style={{ marginBottom: "3%" }}>
                                    <div className="col-4" style={{ textAlign: "left" }}>
                                        <label className="fw-bold" style={{ marginRight: "2%" }}>
                                            Mật khẩu mới <span style={{ color: "red" }}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <input type="password" style={{ width: "100%" }} />
                                        <span className="mt-2 text-danger">
              Mật khẩu mới không ít hơn 5 kí tự và không nhiều hơn 20 kí tự
            </span>
                                    </div>
                                </div>
                                <div className="row" style={{ marginBottom: "3%" }}>
                                    <div className="col-4" style={{ textAlign: "left" }}>
                                        <label className="fw-bold" style={{ marginRight: "2%" }}>
                                            Nhập lại mật khẩu mới <span style={{ color: "red" }}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <input type="password" style={{ width: "100%" }} />
                                        <span className="mt-2 text-danger">
              Nhập lại mật khẩu mới phải trùng với mật khẩu bạn vừa thay đổi
            </span>
                                    </div>
                                </div>
                                <div
                                    className="row"
                                    style={{ marginBottom: "5%", float: "right", paddingRight: "5%" }}
                                >
                                    <div className="col-4" style={{ textAlign: "right" }}>
            <span
                type="button"
                className="button-movie"
                style={{ background: "#B29A81" }}
            >
              Quay về
            </span>
                                    </div>
                                    <div className="col-7">
            <span
                type="button"
                className="button-movie"
                style={{ background: "#8C6842", width: "100%" }}
            >
              Đổi mật khẩu
            </span>
                                    </div>
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