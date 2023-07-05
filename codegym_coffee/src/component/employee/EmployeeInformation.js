import React, {useEffect, useState} from "react";
import {NavLink, useNavigate,Link} from "react-router-dom";
import employeeInformationService from "../../service/employeeInformationService"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import Swal from "sweetalert2";
import '../account/accountStyle.css'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import positionService from "../../service/positionService"
import {RotatingLines} from "react-loader-spinner";

export default function EmployeeInformation() {
    const [employeeDetail, setEmployeeDetail] = useState()
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [isChangeImg, setIsChangeImg] = useState(false);
    const [avatarDetail, setAvatarDetail] = useState('')
    const [avatarErr, setAvatarErr] = useState(false)
    const [position, setPosition] = useState([]);
    const [showErr, setShowErr] = useState(false)
    const [isAuth,setIsAuth] = useState(false);
    const findAllPosition = async () => {
        const res = await positionService.findAll();
        setPosition(res.data);
    };
    useEffect(() => {
        findAllPosition();
    }, []);


    const getMinDate = () => {
        const today = new Date();
        return new Date(
            today.getFullYear() - 15,
            today.getMonth(),
            today.getDate()
        );
    };
    const getMaxDate = () => {
        const today = new Date();
        return new Date(
            today.getFullYear() - 100,
            today.getMonth(),
            today.getDate()
        );
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await employeeInformationService.detail()
                setEmployeeDetail(res.data)
                if(res.data.account.accountRoles[0].role.nameRole === 'ROLE_ADMIN'){
                    setIsAuth(true)
                }
            } catch (error) {
                console.log(error)
            }
        })()
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
            if (!isImage) return console.log("Wrong image format")
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
        setAvatarDetail(employeeDetail?.image)
    }, [employeeDetail?.image])

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    idEmployee: employeeDetail?.idEmployee,
                    nameEmployee: employeeDetail?.nameEmployee,
                    gender: employeeDetail?.gender,
                    dateOfBirth: employeeDetail?.dateOfBirth,
                    salary: isAuth ? employeeDetail?.salary : employeeDetail?.salary.toLocaleString(),
                    phoneNumber: employeeDetail?.phoneNumber,
                    email: employeeDetail?.email,
                    address: employeeDetail?.address,
                    image: employeeDetail?.image,
                    positionDTO: employeeDetail?.position?.idPosition,
                }}
                validationSchema={Yup.object({
                    nameEmployee: Yup.string().required('Không được bỏ trống')
                        .matches(/^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/, 'Tên phải đúng định dạng. VD: Nguyễn Văn A')
                        .min(5, 'Ký tự phải nhiều hơn 5')
                        .max(100, 'Ký tự phải ít hơn 100'),
                    dateOfBirth: Yup.date().required('Không được bỏ trống').max(getMinDate(), 'Người dùng phải từ 15 tuổi trở lên').min(getMaxDate(),'Người dùng không được quá 100 tuổi'),
                    gender: Yup.string().required('Không được bỏ trống'),
                    salary: Yup.number().typeError("Số lương phải là một số").required("Không được bỏ trống").positive("Số lương phải là số dương").min(1000000, "Số lương không được dưới 1 triệu").max(100000000, "Số lương không được quá 100 triệu"),
                    phoneNumber: Yup.string().required('Không được bỏ trống')
                        .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Nhập đúng định dạng SDT VD: 0903.XXX.XXX (X là chữ số)'),
                    address: Yup.string().required('Không được bỏ trống'),
                    email: Yup.string().required('Không được bỏ trống').email('Nhập đúng định dạng email'),
                    positionDTO: Yup.string().required('Không được bỏ trống')
                })}
                onSubmit={(value, { setSubmitting }) => {
                    const editEmployee = async () => {
                        try {
                            if (isChangeImg) {
                                const newValues = { ...value, image: firebaseImg };
                                newValues.image = await handleSubmitAsync();
                                await employeeInformationService.update({
                                    ...newValues,
                                    positionDTO: {
                                        idPosition: value.positionDTO
                                    }
                                })
                            } else {
                                await employeeInformationService.update({
                                    ...value,
                                    positionDTO: {
                                        idPosition: value.positionDTO
                                    }
                                })
                                setIsChangeImg(false)
                            }
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
                            if (error.response.data.message === 'Email đã tồn tại') {
                                setShowErr(true)
                            } else {
                                setShowErr(false)
                            }
                        }
                    }
                    editEmployee()
                }}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <div className="container " style={{ marginTop: "10%" }}>
                            <div className="row row-no-gutters col-xs-12 col-md-12">
                                <div className="col-xs-4 col-md-4" id="a">
                                    <p className="text-center avatar" style={{ marginTop: 10 }}>
                                        {
                                            avatarErr ? <div>
                                                <h5 className="text-danger" width='100%' height='100%'>Sai định dạng ảnh, phải có dạng đuôi .jpg, .jpeg, .png</h5>
                                            </div> :
                                                <div>
                                                    <img
                                                        src={avatarDetail}
                                                        className="border-avatar rounded-circle" width='200px' height='200px' alt="image" />
                                                </div>
                                        }
                                        {
                                            isAuth && <div className={!avatarErr && "border-camera"} >
                                                <label htmlFor="avatar" type='button' className="bi bi-camera-fill fs-2"></label>
                                                <input
                                                    type="file"
                                                    onChange={handleFileSelect}
                                                    className='d-none' id='avatar' name='image'/>
                                            </div>
                                        }
                                        
                                    </p>
                                    <h3 style={{ textAlign: "center" }}>{employeeDetail?.account.nameAccount}</h3>
                                    <div className="mt-3" style={{ textAlign: "center" }}>
                                        <i className="bi bi-emoji-smile me-1" />
                                        Chào mừng bạn trở lại
                                    </div>
                                    <hr />
                                    <div className="col-12">
                                        <ul className="quynh-app-menu">
                                            <li className="quynh-li">
                                                <NavLink to={`/account/change-password`} className="quynh-app-menu__item " href="ChangePassword.html">
                                                    <i className="bi bi-file-lock" />
                                                    <span className="quynh-app-menu__label">Đổi mật khẩu</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xs-7 col-sm-7 col-md-7" id="b">
                                    <div className="border-form">
                                        <h2 className="bg-coffe text-white text-center py-2">Thông tin tài khoản</h2>
                                        <br />

                                        <div className="row" style={{ marginBottom: "3%" }}>
                                            <div className="col-4" style={{ textAlign: "left" }}>
                                                <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                    Họ và tên <span style={{ color: "red" }}>(*)</span>:
                                                </label>
                                            </div>
                                            <div className="col-7">
                                                <Field
                                                    disabled={isAuth ? false : true}
                                                    type="text"
                                                    style={{ width: "100%" }} className="form-control" name="nameEmployee" id="nameEmployee"
                                                />
                                                <ErrorMessage component='span' className="text-danger" name="nameEmployee" />
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: "3%" }}>
                                            <div className="col-4" style={{ textAlign: "left" }}>
                                                <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                    Giới tính <span style={{ color: "red" }}>(*)</span>:
                                                </label>
                                            </div>
                                            <div className="col-7">
                                                <div className="col-4">
                                                    <Field
                                                        disabled={isAuth ? false : true}
                                                        type="radio" name="gender" id="inlineRadio1" value="false"
                                                        checked={values.gender === false ? true : null}
                                                    />
                                                    &nbsp; <label htmlFor="inlineRadio1">Nam</label>
                                                    <Field
                                                        disabled={isAuth ? false : true}
                                                        type="radio" name="gender" className='ms-3' id="inlineRadio2" value="true"
                                                        checked={values.gender === true ? true : null}
                                                    />
                                                    &nbsp; <label htmlFor="inlineRadio2" >Nữ</label>
                                                </div>
                                                <ErrorMessage component='span' className="text-danger" name="gender" />

                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: "3%" }}>
                                            <div className="col-4" style={{ textAlign: "left" }}>
                                                <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                    Số điện thoại <span style={{ color: "red" }}>(*)</span>:
                                                </label>
                                            </div>
                                            <div className="col-7">
                                                <Field
                                                    disabled={isAuth ? false : true}
                                                    type="text" name="phoneNumber" className="form-control" id="phoneNumber"
                                                    style={{ width: "100%" }}
                                                />
                                                <ErrorMessage component='span' className="text-danger" name="phoneNumber" />
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: "3%" }}>
                                            <div className="col-4" style={{ textAlign: "left" }}>
                                                <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                    Email <span style={{ color: "red" }}>(*)</span>:
                                                </label>
                                            </div>
                                            <div className="col-7">
                                                <Field
                                                    disabled={isAuth ? false : true}
                                                    type="text" name="email" className="form-control" id="email"
                                                    style={{ width: "100%" }}
                                                />
                                                {
                                                    showErr ? <span className="text-danger">Email đã tồn tại</span> : <ErrorMessage component='span' className="text-danger" name='email' />
                                                }
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: "3%" }}>
                                            <div className="col-4" style={{ textAlign: "left" }}>
                                                <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                    Ngày sinh <span style={{ color: "red" }}>(*)</span>:
                                                </label>
                                            </div>
                                            <div className="col-7">
                                                <Field
                                                    disabled={isAuth ? false : true}
                                                    type="date" className="input-login form-control" name="dateOfBirth" id="dateOfBirth"
                                                    style={{ width: "100%" }}
                                                />
                                                <ErrorMessage component='span' className="text-danger" name="dateOfBirth" />
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: "3%" }}>
                                            <div className="col-4" style={{ textAlign: "left" }}>
                                                <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                    Lương (VND) <span style={{ color: "red" }}>(*)</span>:
                                                </label>
                                            </div>
                                            <div className="col-7">
                                                <Field
                                                    disabled={isAuth ? false : true}
                                                    type="text" name="salary"
                                                    className="form-control" id="salary"
                                                    style={{ width: "100%" }}
                                                />
                                                <ErrorMessage component='span' className="text-danger" name="salary" />
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: "3%" }}>
                                            <div className="col-4" style={{ textAlign: "left" }}>
                                                <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                    Vị trí <span style={{ color: "red" }}>(*)</span>:
                                                </label>
                                            </div>
                                            <div className="col-7">
                                                <Field
                                                    disabled={isAuth ? false : true}
                                                    as="select"
                                                    name="positionDTO"
                                                    id="positionDTO"
                                                    className="form-control"
                                                >
                                                    {position.map((positionList, index) => (
                                                        <option key={index} value={positionList.idPosition}>
                                                            {positionList.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage component='span' className="text-danger" name="positionDTO" />
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginBottom: "3%" }}>
                                            <div className="col-4" style={{ textAlign: "left" }}>
                                                <label className="fw-bold" style={{ marginRight: "2%" }}>
                                                    Địa chỉ <span style={{ color: "red" }}>(*)</span>:
                                                </label>
                                            </div>
                                            <div className="col-7">
                                                <Field disabled={isAuth ? false : true}
                                                    as="textarea" type="text" className="form-control" name="address" id="address"
                                                    style={{ width: "100%" }}
                                                />
                                                <ErrorMessage component='span' className="text-danger" name="address" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            {
                                                isSubmitting
                                                    ?
                                                    <div className="d-flex justify-content-center mt-4 ms-4">
                                                        <RotatingLines
                                                            strokeColor="grey"
                                                            strokeWidth="5"
                                                            animationDuration="0.75"
                                                            width="30"
                                                            visible={true}
                                                        />
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="col-12" style={{textAlign: "center"}}>
                                                            <Link
                                                                to={"/"}
                                                                className={"btn-quynh"}
                                                                type="button"
                                                                style={{
                                                                    backgroundColor: "#B29A81",
                                                                    width: 80,
                                                                    color: "#ffffff",
                                                                    padding: 5,
                                                                    textAlign: "center",
                                                                    marginRight: 10,
                                                                    paddingRight: 5,
                                                                    borderRadius: 10,
                                                                    border: "none",
                                                                    letterSpacing: '0px',
                                                                    textDecoration:"none"
                                                                }}
                                                            >
                                                                Quay về
                                                            </Link>
                                                            <button
                                                                className={"btn-quynh"}
                                                                type={avatarErr || !isAuth ? "button" : "submit"}
                                                                style={{
                                                                    backgroundColor: "#8C6842",
                                                                    width: 80,
                                                                    color: "#ffffff",
                                                                    padding: 5,
                                                                    textAlign: "center",
                                                                    marginRight: 10,
                                                                    paddingRight: 5,
                                                                    borderRadius: 10,
                                                                    border: "none",
                                                                    letterSpacing: '0px'
                                                                }}
                                                            >
                                                                Cập nhật
                                                            </button>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}