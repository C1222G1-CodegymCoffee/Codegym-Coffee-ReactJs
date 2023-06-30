import {Header} from "../Homepage/Header";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import employeeInformationService from "../../service/employeeInformationService"
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import Swal from "sweetalert2";
import {AvatarContext} from "./AvatarContex";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../FireBase";
import positionService from "../../service/positionService"
export default function EmployeeInformation() {
    const [employeeDetail,setEmployeeDetail]= useState()
    const navigate=useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [isChangeImg, setIsChangeImg] = useState(false);
    const { setAvatar } = useContext(AvatarContext);
    const [avatarDetail, setAvatarDetail] = useState('')
    const [show403Img, setShow403Img] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [avatarErr, setAvatarErr] = useState(false)
    const [position, setPosition] = useState([]);
    const getMinDate = () => {
        const today = new Date();
        return new Date(
            today.getFullYear() - 15,
            today.getMonth(),
            today.getDate()
        );
    };
    useEffect(() => {
        const detail = async () => {
            try {
                const res = await employeeInformationService.detail()
                setEmployeeDetail(res.data)
                setShow403Img(false)
            } catch (error) {
                console.log(error)
                if (error.response.status === 403) {
                    setShow403Img(true)
                }
            }
        }
        detail()
    }, [])
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file instanceof File || file instanceof Blob) {
            const extension = file.name
            const isImage = /\.(jpg|jpeg|png|gif)$/i.test(extension);
            !isImage ? setAvatarErr(true) : setAvatarErr(false)
            setSelectedFile(file);
            setIsChangeImg(true)
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setAvatarDetail(imageUrl);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Invalid file or blob');
        }
    };
    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) return reject("No file selected");
            const extension = file.name
            const isImage = /\.(jpg|jpeg|png|gif)$/i.test(extension);
            !isImage ? setAvatarErr(true) : setAvatarErr(false)
            if(!isImage) return console.log("Wrong image format")
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImg(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    }
    useEffect(() => {
        document.title = "Thông tin tài khoản";
    }, [])
    useEffect(() => {
        setAvatar(employeeDetail?.image)
        setAvatarDetail(employeeDetail?.image)
    }, [employeeDetail?.image])
    if (!employeeDetail && show403Img === false) {
        return null
    }
    return(
        <>
            <Header/>
            {
                show403Img === false ?
                <Formik
                    initialValues={{
                        idEmployee: employeeDetail?.idEmployee,
                        nameEmployee: employeeDetail?.nameEmployee,
                        gender: employeeDetail?.gender,
                        dateOfBirth: employeeDetail?.dateOfBirth,
                        salary: employeeDetail?.salary,
                        phoneNumber: employeeDetail?.phoneNumber,
                        address: employeeDetail?.address,
                        image: employeeDetail?.image,
                        positionDTO: employeeDetail?.position?.idPosition,
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Không được bỏ trống')
                            .matches(/^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/, 'Tên phải đúng định dạng. VD: Nguyễn Văn A')
                            .min(5, 'Ký tự phải nhiều hơn 5')
                            .max(100, 'Ký tự phải ít hơn 100'),
                        dateOfBirth: Yup.date().required('Không được bỏ trống').max(getMinDate(), 'Người dùng đăng ký tài khoản phải từ 15 tuổi trở lên'),
                        gender: Yup.string().required('Không được bỏ trống'),
                        phoneNumber: Yup.string().required('Không được bỏ trống')
                            .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Nhập đúng định dạng SDT VD: 0903.XXX.XXX (X là chữ số)'),
                        address: Yup.string().required('Không được bỏ trống'),
                        email: Yup.string().required('Không được bỏ trống').email('Nhập đúng định dạng email'),
                        // avatar: Yup.string().required('Không được bỏ trống').matches(/^.{0,}(.png|.jpg|.jpeg)[?](alt=media&token=).{0,}$/, 'Sai định dạng ảnh, phải có dạng đuôi .jpg, .jpeg, .png')
                    })}
                    onSubmit={(value, { setSubmitting }) => {
                        const editEmployee = async () => {
                            try {
                                if (isChangeImg) {
                                    const newValues = { ...value, image: firebaseImg };
                                    newValues.image = await handleSubmitAsync();
                                    await employeeInformationService.update(newValues)
                                } else {
                                    await employeeInformationService.update(value)
                                    setIsChangeImg(false)
                                }
                                navigate('/employee/detail')
                                setSubmitting(false)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Chỉnh sửa thông tin thành công',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } catch (error) {
                                console.log(error);
                                if (error) {
                                    setSubmitting(false)
                                }
                            }
                        }
                        editEmployee()
                    }}
                >
                    {({ values, isSubmitting }) => (
                        <Form>
                <div className="container" style={{marginTop: "10%"}}>
                    <div className="row row-no-gutters col-xs-12 col-md-12">
                        <div className="col-xs-4 col-md-4" id="a">
                            <p className="text-center" style={{marginTop: 10}}>
                                {
                                    avatarErr ? <div>
                                            <h5 className="text-danger"  width='100%' height='100%'>Sai định dạng ảnh, phải có dạng đuôi .jpg, .jpeg, .png</h5>
                                        </div> :
                                        <div className="avatar">
                                            <img src={avatarDetail}
                                                 className="border-avatar rounded-circle " width='300%' height='300%' alt="image" />
                                        </div>
                                }
                                <div className={!avatarErr && "border-camera"}>
                                    <label htmlFor="avatar" type='button' className="bi bi-camera-fill fs-2"></label>
                                    <input type="file"
                                           onChange={handleFileSelect}
                                           className='d-none' id='image' name='image' />
                                </div>
                                {/*<img*/}
                                {/*    src="https://haycafe.vn/wp-content/uploads/2021/11/hinh-anh-hoat-hinh-de-thuong-cute-dep-nhat-600x600.jpg"*/}
                                {/*    className="rounded-circle avatar"*/}
                                {/*    style={{width: 300}}*/}
                                {/*    height="300px"*/}
                                {/*/>*/}
                            </p>
                            <h3 style={{textAlign: "center"}}>{employeeDetail?.acount.nameAccount}</h3>
                            <div className="mt-3" style={{textAlign: "center"}}>
                                <i className="bi bi-emoji-smile"/>
                                Chào mừng bạn trở lại
                            </div>
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
                        </div>
                        <div className="col-xs-7 col-sm-7 col-md-7" id="b">
                            <div className="border-form">
                                <h2 style={{textAlign: "center"}}>Thông tin tài khoản</h2>
                                <br/>

                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Họ và tên <span style={{color: "red"}}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <Field
                                            type="text"
                                            style={{width: "100%"}} name="nameEmployee" id="nameEmployee"
                                        />
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
                                            <Field
                                                type="radio" name="gender" id="inlineRadio1" value="false"
                                                checked={values.gender === false ? true : null}
                                            />
                                            &nbsp; <label htmlFor="nam">Nam</label>
                                        </div>
                                        <div className="col-4">
                                            <Field
                                                type="radio" name="gender" id="inlineRadio2" value="true"
                                                checked={values.gender === true ? true : null}
                                            />
                                            &nbsp; <label htmlFor="nữ">Nữ</label>
                                        </div>
                                        {/*<div className="col-4">*/}
                                        {/*    <input*/}
                                        {/*        type="radio"*/}
                                        {/*        id="khác"*/}
                                        {/*        name="fav_language"*/}
                                        {/*        defaultValue="khác"*/}
                                        {/*    />*/}
                                        {/*    &nbsp; <label htmlFor="khác">Khác</label>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Số điện thoại <span style={{color: "red"}}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <Field type="text" name="phoneNumber" id="phoneNumber"
                                            style={{width: "100%"}}
                                        />
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Ngày sinh:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <Field type="date" className="input-login" name="dateOfBirth" id="dateOfBirth"
                                            style={{width: "100%"}}
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
                                        <Field type="text" name="salary" id="salary"
                                            style={{width: "100%"}}
                                        />
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Vị trí <span style={{color: "red"}}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
                                        <Field
                                            as="select"
                                            name="positionDTO"
                                            id="positionDTO"
                                            className="form-control"
                                        >
                                            {position.map((positionList, index) => (
                                                <option key={index} value={positionList.idPosition}>
                                                    {positionList.namePosition}
                                                </option>
                                            ))}
                                        </Field>

                                        {/*<select*/}
                                        {/*    name="lang"*/}
                                        {/*    id="lang-select"*/}
                                        {/*    style={{width: "100%", height: "120%"}}*/}
                                        {/*>*/}
                                        {/*    <option value="">--Hãy chọn một vị trí--</option>*/}
                                        {/*    <option value="csharp">Nhân viên</option>*/}
                                        {/*    <option value="csharp">Quản lý</option>*/}
                                        {/*</select>*/}
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: "3%"}}>
                                    <div className="col-4" style={{textAlign: "left"}}>
                                        <label className="fw-bold" style={{marginRight: "2%"}}>
                                            Địa chỉ <span style={{color: "red"}}>(*)</span>:
                                        </label>
                                    </div>
                                    <div className="col-7">
            <Field as="textarea" type="text"name="address" id="address"
                   style={{width: "100%"}}
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
                        </Form>
                    )}
                </Formik>
                    :
                    <div>
                        <img src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png" width={'100%'} height={'100%'} />
                    </div>
            }
            </>
    )

}