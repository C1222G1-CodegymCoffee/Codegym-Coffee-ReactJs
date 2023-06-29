import {Header} from "../Homepage/Header";
import React from "react";

export default function EmployeeInformation() {
    return(
        <>
            <Header/>
            {
                <div className="container" style={{marginTop: "10%"}}>
                    <div className="row row-no-gutters col-xs-12 col-md-12">
                        <div className="col-xs-4 col-md-4" id="a">
                            {/*            <h2 style="font-size: 24px">Quản lý tài khoản</h2>*/}
                            <p className="text-center" style={{marginTop: 10}}>
                                <img
                                    src="https://haycafe.vn/wp-content/uploads/2021/11/hinh-anh-hoat-hinh-de-thuong-cute-dep-nhat-600x600.jpg"
                                    className="rounded-circle avatar"
                                    style={{width: 300}}
                                    height="300px"
                                />
                            </p>
                            <h3 style={{textAlign: "center"}}>Employee1</h3>
                            <div className="mt-3" style={{textAlign: "center"}}>
                                <i className="bi bi-emoji-smile"/>
                                Chào mừng bạn trở lại
                            </div>
                            {/* <div class="mt-3" style="text-align: center">
          <button type="button" class="button-movie" style="width: 110px;background-color: #B29A81">
             <i class="bi bi-arrow-right-circle"></i>
              Đăng xuất
          </button>
      </div> */}
                            <hr/>
                            <div className="col-9">
                                <ul className="quynh-app-menu">
                                    {/*                    <li><a class="app-menu__item " href="AccountInformation.html"><i class="bi bi-person-bounding-box"></i>*/}
                                    {/*                        <span class="app-menu__label">Thông tin tài khoản</span></a></li>*/}
                                    <li>
                                        <a className="quynh-app-menu__item " href="ChangePassword.html">
                                            <i className="bi bi-file-lock"/>
                                            <span className="quynh-app-menu__label">Đổi mật khẩu</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* <hr>
      <div class="mt-2">
          <a href="AccountInformation.html" style="font-size: 16px;text-decoration: none;color: black">
          <i class="bi bi-person-bounding-box"></i>
          Thông tin tài khoản</a>
      </div>
      <hr>
      <div class="mt-2">
          <a href="ChangePassword.html" style="font-size: 16px;text-decoration: none;color: black">
          <i class="bi bi-file-lock"></i>
          Đổi mật khẩu</a>
      </div>
      <hr> */}
                        </div>
                        <div className="col-xs-7 col-sm-7 col-md-7" id="b">
                            <div className="border-form">
                                <h2 style={{textAlign: "center"}}>Thông tin tài khoản</h2>
                                <br/>
                                {/*<div className="row" style={{marginBottom: "3%"}}>*/}
                                {/*    <div className="col-4" style={{textAlign: "left"}}>*/}
                                {/*        <label className="fw-bold">Tên tài khoản:</label>*/}
                                {/*    </div>*/}
                                {/*    <div className="col-7">*/}
                                {/*        <input*/}
                                {/*            type="text"*/}
                                {/*            style={{width: "100%"}}*/}
                                {/*            defaultValue="Employee1"*/}
                                {/*            readOnly=""*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Họ và tên <span style={{color: "red"}}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            style={{width: "100%"}}
                                            defaultValue="Nguyễn Ngọc Hoa"
                                        />
            {/*                            <span className="mt-2 text-danger">*/}
            {/*  Độ dài của họ và tên lớn hơn 3 và phải nhỏ hơn hoặc bằng 100 và*/}
            {/*  không có kí tự đặc biệt. Ví dụ: Nguyễn Văn A*/}
            {/*</span>*/}
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Giới tính:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <div className="col-4">
                                            <input
                                                type="radio"
                                                id="nam"
                                                name="fav_language"
                                                defaultValue="nam"
                                            />
                                            &nbsp; <label htmlFor="nam">Nam</label>
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="radio"
                                                id="nữ"
                                                name="fav_language"
                                                defaultValue="nữ"
                                                defaultChecked=""
                                            />
                                            &nbsp; <label htmlFor="nữ">Nữ</label>
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="radio"
                                                id="khác"
                                                name="fav_language"
                                                defaultValue="khác"
                                            />
                                            &nbsp; <label htmlFor="khác">Khác</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Số điện thoại <span style={{color: "red"}}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="number"
                                            style={{width: "100%"}}
                                        />
            {/*                            <span className="mt-2 text-danger">*/}
            {/*  Vui lòng nhập đúng định dạng. VD: 0xxxxxxxxx (x: là số)*/}
            {/*</span>*/}
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Ngày sinh:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            style={{width: "100%"}}
                                            defaultValue="10/09/1998"
                                        />
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Lương (VND):
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            style={{width: "100%"}}
                                            defaultValue="50.000.000"
                                            readOnly=""
                                        />
                                        {/*                        <span class="mt-2 text-danger">Lương phải nhập đúng định dạng, lương phải lớn hơn 50000 và bé hơn 50000000. VD: 1xxxxxxx (Với x là số)</span>*/}
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Vị trí <span style={{color: "red"}}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        {/*                        <input type="text" style="width: 100%" value="Nhân viên">*/}
                                        {/*                        <span class="mt-2 text-danger">Vui lòng nhập đúng định dạng. VD: Quản lý</span>*/}
                                        <select
                                            name="lang"
                                            id="lang-select"
                                            style={{width: "100%", height: "120%"}}
                                        >
                                            <option value="">--Hãy chọn một vị trí--</option>
                                            <option value="csharp">Nhân viên</option>
                                            <option value="csharp">Quản lý</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Địa chỉ <span style={{color: "red"}}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
            <textarea
                name="address"
                id="address"
                rows={2}
                style={{width: "100%"}}
                defaultValue={"23 Nguyễn Hoàng - Thanh Khê- Đà Nẵng"}
            />
            {/*                            <span className="mt-2 text-danger">*/}
            {/*  Địa chỉ nhập theo đúng định dạng "Tên đường - quận/huyện -*/}
            {/*  tỉnh/thành phố"*/}
            {/*</span>*/}
                                    </div>
                                </div>
                                <div className="row" style={{float: "right", paddingRight: "1%"}}>
                                    <div className="col-4">
            <span
                type="button"
                className="button-movie"
                style={{backgroundColor: "#B29A81"}}
            >
              Quay về
            </span>
                                    </div>
                                    <div className="col-3">
            <span
                type="button"
                className="button-movie"
                style={{backgroundColor: "#8C6842"}}
            >
              Cập nhật
            </span>
                                    </div>
                                    <div className="col-4">
            <span
                type="button"
                className="button-movie"
                style={{width: 100, backgroundColor: "#8C6842"}}
            >
              Đổi mật khẩu
            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </>
    )

}