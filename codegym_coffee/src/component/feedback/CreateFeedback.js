import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import "../../css/feedback/feedback.css"
import {storage} from "../../firebase";
import {saveFeedback} from "../../service/feedback/FeedbackService";
import Swal from "sweetalert2"

export function CreateFeedback() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    const currentDate = new Date()

    useEffect(() => {
        document.title = 'Gửi phản hồi';
    }, []);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
            if (allowedExtensions.test(file.name)) {
                setSelectedFile(file);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: "File không hợp lệ. Vui lòng chọn file có đuôi là jpg, jpeg, png hoặc gif.",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    };

    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) return reject("No file selected");
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    };


    return (
        <div className='mx-auto'>
            <Formik
                initialValues={{
                    codeFeedback: "F" + randomNum,
                    dayOfFeedback: "",
                    creator: "",
                    email: "",
                    content: "",
                    image: ""
                }}
                validationSchema={Yup.object({
                    creator: Yup.string().required("Khong duoc bo trong Ho va Ten").trim()
                        .matches(
                            /^(?=.*[a-zA-Z\s])[^!@#$%^&*(),.?":{}|<>]/,
                            "Ho va Ten khong chua ky tu dac biet")
                        .min(4, "Ho va Ten phai tu 4 ky tu")
                        .max(99, "Ho va Ten khong duoc qua 99 ky tu"),

                    email: Yup.string()
                        .min(5, "Email ít nhất 5 ký tự")
                        .max(50, "Email tối đa 50 ký tự")
                        .matches(
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            "Email phai dung dinh dang xxx@gmail.com")
                        .required("Khong duoc bo trong email"),
                    content: Yup.string()
                        .required("Khong duoc bo trong noi dung phan hoi")
                        .min(5, "Noi dung phan hoi phai tu 5 ky tu")
                        .max(200, "Noi dung khong dai qua 200 ky tu"),
                })}
                onSubmit={async (values) => {
                    const img = await handleSubmitAsync();
                    const newValue = {
                        ...values,
                        image: img,
                        dayOfFeedback: currentDate,
                    };
                    await saveFeedback(newValue);
                    Swal.fire({
                        icon: 'success',
                        title: 'Gửi phản hồi thành công, xin cảm ơn',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(`/`);
                }}
            >
                {formProps => {
                    const handleReset = resetForm => {
                        resetForm();
                    };

                    return (
                        <div className="form-body" id="createFeedbackPage">
                            <div className="container">
                                {/*<div className="banner_image_feedback">*/}
                                {/*    <img src="/Homepage/img_01.png"/>*/}
                                {/*</div>*/}
                                <div className="feedback-content mx-auto">
                                    <div className="form-items">
                                        <h3 className="title">Phản hồi</h3>
                                        <p className="title-p">Điền đầy đủ thông tin ở bên dưới.</p>

                                        <Form>
                                            <div className="col-md-12">
                                                <Field className="input-feedback" type="text" name="creator"
                                                       placeholder="Họ và Tên" required=""/>
                                                <div>
                                                    <ErrorMessage name="creator" component={"p"}
                                                                  style={{color: "red"}}/>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <Field className="input-feedback" type="email"
                                                       name="email" placeholder="E-mail" required=""/>
                                                <div>
                                                    <ErrorMessage name="email" component={"p"}
                                                                  style={{color: "red"}}/>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <Field className="input-feedback" type="text"
                                                       name="content" placeholder="Nội dung phản hồi"/>
                                                <div>
                                                    <ErrorMessage name="content" component={"p"}
                                                                  style={{color: "red"}}/>
                                                </div>
                                            </div>

                                            <div className="col-md-12"
                                                 style={{marginTop: "3%", marginBottom: "3%"}}>
                                                <Field type="file" onChange={(e) => handleFileSelect(e)}
                                                       id="image" name={"image"}
                                                       className="form-control-plaintext d-none "/>
                                                <p>
                                                    <label htmlFor="image"
                                                           style={{
                                                               display: "inline-block",
                                                               padding: "6px 12px",
                                                               border: "1px solid",
                                                               borderRadius: "4px",
                                                               cursor: "pointer"
                                                           }}>
                                                        Chọn hình ảnh
                                                    </label>
                                                </p>
                                                {!selectedFile && (
                                                    <span>Chưa có hình ảnh được chọn</span>
                                                )}
                                                {selectedFile && (
                                                    <img className={"mt-2"}
                                                         src={URL.createObjectURL(selectedFile)}
                                                         style={{width: "30%"}}/>
                                                )}
                                            </div>
                                            <div>
                                                <ErrorMessage name="image" component={"p"} style={{color: "red"}}/>
                                            </div>

                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn-create-feedback"
                                                    style={{
                                                        backgroundColor: "#8C6842",
                                                        width: "15%",
                                                        color: "#ffffff",
                                                        padding: 5,
                                                        textAlign: "center",
                                                        marginRight: 10,
                                                        paddingRight: 5,
                                                        borderRadius: 10,
                                                        border: "none",
                                                        letterSpacing: '0px'
                                                    }}
                                                    onClick={handleReset.bind(null, formProps.resetForm)}
                                                >
                                                    Hủy
                                                </button>

                                                <button
                                                    type="submit"
                                                    className="btn-create-feedback"
                                                    style={{
                                                        backgroundColor: "#8C6842",
                                                        width: "26%",
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
                                                    Gửi phản hồi
                                                </button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Formik>
        </div>
    )
}
