import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, {AllHTMLAttributes as e, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import "../../css/feedback/feedback.css"
import {Header} from "../Homepage/Header";
import {toast} from "react-toastify";
import {storage} from "../../firebase";
import {saveFeedback} from "../../service/feedback/FeedbackService";


export function CreateFeedback() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const randomNum = Math.floor(Math.random() * 1000) + 1;

    useEffect(() => {
        document.title = 'Gửi phản hồi';
    }, []);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            setSelectedFile(file);
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
                    setImg(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    };


    return (
        <>
            <Formik
                initialValues={{
                    codeFeedback: ""+ randomNum,
                    dayOfFeedback:"",
                    creator: "",
                    email: "",
                    content: "",
                    image: "",

                }}
                validationSchema={Yup.object({
                    creator: Yup.string().required("Khong duoc bo trong Ho va Ten").trim()
                        .matches(
                            /^(?=.*[a-zA-Z\s])[^!@#$%^&*(),.?":{}|<>]/,
                            "Ho va Ten khong chua ky tu dac biet")
                        .min(4, "Ho va Ten phai tu 4 ky tu")
                        .max(99, "Ho va Ten khong duoc qua 99 ky tu"),

                    email: Yup.string()
                        .min(20, "Email ít nhất 10 ký tự")
                        .max(99, "Email tối đa 99 ký tự")
                        .matches(
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            "Email phai dung dinh dang xxx@gmail.com")
                        .required("Khong duoc bo trong email"),
                    content: Yup.string()
                        .required("Khong duoc bo trong noi dung phan hoi")
                        .min(5, "Noi dung phan hoi phai tu 5 ky tu")
                        .max(200, "Noi dung khong dai qua 200 ky tu"),
                })}
                onSubmit={(values, {setSubmitting}) => {
                    debugger
                    const create = async () => {
                        const newValue = {
                            ...values,
                            image: firebaseImg,
                            dayOfFeedback: currentDate,


                        };
                        newValue.image = await handleSubmitAsync();
                        await saveFeedback(newValue);
                        toast(`Thêm phản hồi thành công! `);
                        navigate(`/`);
                        setSubmitting(false);
                    };
                    create();
                }}
            >

                <div className="form-body">
                    <div className="container">
                        <div className="banner_image">
                            <img src="/Homepage/img_01.png"/>
                        </div>

                        <div className="content">
                            <div className="row">
                                <div className="form-holder">
                                    <div className="form-content">
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
                                                               style={{display: "inline-block", padding: "6px 12px",
                                                                   border: "1px solid", borderRadius: "4px",}}>
                                                            Chọn hình ảnh
                                                        </label>
                                                    </p>
                                                    {!selectedFile && (
                                                        <span>Chưa có hình ảnh được chọn</span>
                                                    )}
                                                    {selectedFile && (
                                                        <img className={"mt-2"}
                                                             src={URL.createObjectURL(selectedFile)}
                                                             style={{width: "120px"}}/>
                                                    )}
                                                </div>
                                                <div>
                                                    <ErrorMessage name="image" component={"p"} style={{color: "red"}}/>
                                                </div>

                                                <div className="form-button" id="button">
                                                    <button id="cancel" type="cancel" className="button-cancel">
                                                        Hủy
                                                    </button>

                                                    <button id="submit" type="submit" className="button-submit">
                                                        Gửi phản hồi
                                                    </button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Formik>
        </>
    )
}
