import {Formik, Form, Field, ErrorMessage} from "formik"
import "../../css/Homepage/drink.css"
import * as productService from "../../service/ProductService"
import * as Yup from "yup";
import React, {useEffect, useState} from "react"
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import {storage} from "../../firebase";
import {ColorRing} from "react-loader-spinner";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2"
import {Link} from "react-router-dom";


export function CreateProduct() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [progress, setProgress] = useState(0);

    const [productTypeDTO, setproductTypeDTO] = useState([])
    useEffect(() => {
        const getproductTypeDTO = async () => {
            let rs = await productService.findProductTypeDTO();
            setproductTypeDTO(rs);
        }
        getproductTypeDTO();
    }, []);


    const handleFileSelect = (event) => {
        const file = event.target.files[0];

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
            <Formik initialValues={{
                ingredient: "",
                nameProduct: "",
                price: "",
                productTypeDTO: {
                    idType: 0,
                    nameType: ""
                }

            }}
                    validationSchema={
                        Yup.object({
                            ingredient: Yup.string().required("Vui lòng nhập thành phần")
                                .matches(/^[^0-9]*$/, "Thành phần không được chứa số")
                                .min(5, "Thành phần phải nhiều hơn 5 từ")
                                .max(30, "Thành phần không dài quá 30 từ"),
                            nameProduct: Yup.string().required("Vui lòng nhập tên món").min(5, "Tên món phải nhiều hơn 5 từ")
                                .max(20, "Tên món không dài quá 20 từ").matches(/^[^0-9]*$/, "Tên món không được chứa số"),
                            price: Yup.string().required("Vui lòng nhập giá").matches(/^[0-9]+$/, "Giá không được chứa chữ cái"),

                        })
                    }
                    onSubmit={async (values, {resetForm, setSubmitting}) => {
                        const newValue = {
                            ...values,
                            image: firebaseImg,

                        };
                        newValue.image = await handleSubmitAsync();
                        newValue.productTypeDTO.idType = parseInt(values.idType);
                        delete newValue.idType;
                        await productService.saveProduct(newValue);
                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm món thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        resetForm();
                        setSubmitting(false);

                    }}

            >
                {({isSubmitting}) => (
                    <div className="container">
                        <div className="container my-5 form-product" style={{ maxWidth: 1000 }}>
                            <div className="container" style={{ marginTop: "120px" }}>
                                <div className="content" style={{ maxWidth: 1000 }}>
                                    <h1 className="text-center mb-5">THÊM ĐỒ ĂN & THỨC UỐNG</h1>
                                    <Form action="">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="fa"></i>
                                                        <label htmlFor="nameProduct" className="fw-bold ms-2">
                                                            Tên món:
                                                        </label>
                                                        <label style={{color: "red"}}>*</label>
                                                    </div>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="nameProduct"
                                                        id="nameProduct"
                                                        required=""
                                                    />
                                                    <ErrorMessage name="nameProduct" component={"p"}
                                                                  style={{color: "red"}}/>
                                                </div>
                                                <div className="form-group" style={{paddingTop: 12}}>
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="far"></i>
                                                        <label htmlFor="image" className="fw-bold ms-2">
                                                            Ảnh
                                                        </label>
                                                        <label style={{color: "red"}}>*</label>
                                                    </div>
                                                    <Field
                                                        type="file"
                                                        onChange={(e) => handleFileSelect(e)}
                                                        id="image"
                                                        name={"image"}
                                                        className="form-control-plaintext d-none"
                                                    />
                                                    <label
                                                        htmlFor="image"
                                                        style={{
                                                            display: "flex",
                                                            padding: "6px 12px",
                                                            border: "1px ",
                                                            borderRadius: "4px",
                                                            backgroundColor: "white",
                                                            height: "40px"
                                                        }}
                                                    >
                                                        Chọn hình ảnh
                                                    </label>
                                                    {selectedFile && (
                                                        <img
                                                            className={"mt-2"}
                                                            src={URL.createObjectURL(selectedFile)}
                                                            style={{width: "100%"}}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="fa-solid fa-bars"/>
                                                        <label htmlFor="productTypeDTO" className="fw-bold ms-2">
                                                            Nhóm món:
                                                        </label>
                                                        <label style={{color: "red"}}>*</label>
                                                    </div>
                                                    <Field as="select" name="idType"
                                                           style={{width: "100%", height: 37}}>
                                                        <option style={{textAlign: "center"}} value="">
                                                            --Hãy chọn nhóm món--
                                                        </option>
                                                        {productTypeDTO.map((listType, index) => (
                                                            <option key={index} value={listType.idType}>
                                                                {listType.nameType}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="productTypeDTO" component={"p"}
                                                                  style={{color: "red"}}/>
                                                </div>
                                                <div className="form-group" style={{paddingTop: 20}}>
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="fas fa-money-check-alt fa-lg"/>
                                                        <label htmlFor="price" className="fw-bold ms-2">
                                                            Giá (VNĐ):
                                                        </label>
                                                        <label style={{color: "red"}}>*</label>
                                                    </div>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="price"
                                                        id="price"
                                                        required=""
                                                    />
                                                    <ErrorMessage name="price" component={"p"} style={{color: "red"}}/>
                                                </div>
                                                <div className="form-group" style={{paddingTop: 24}}>
                                                    <div className="d-flex align-items-center mb-1">
                                                        <label htmlFor="ingredient" className="fw-bold">
                                                            Thành phần:
                                                        </label>
                                                        <label style={{color: "red"}}>*</label>
                                                    </div>
                                                    <Field as="textarea" className="form-control" name="ingredient"
                                                           id="ingredient" rows={4}/>
                                                    <ErrorMessage name="ingredient" component={"p"}
                                                                  style={{color: "red"}}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row d-flex mx-auto" style={{paddingTop: 25, paddingBottom: 30}}>
                                            <div className="col-lg-2 col-md-3 col-4 mx-auto">
                                                {isSubmitting ? (
                                                    <ColorRing
                                                        visible={true}
                                                        height="80"
                                                        width="80"
                                                        ariaLabel="blocks-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass="blocks-wrapper"
                                                        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                                                    />
                                                ) : (
                                                    <>
                                                        <button
                                                            type="reset"
                                                            className="btn btn-primary btn-block"
                                                            style={{border: "none"}}
                                                        >
                                                            <Link to="/menu">Quay về</Link>

                                                        </button>

                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary btn-block"
                                                            style={{background: "#f26b38", border: "none", width: 120}}
                                                        >
                                                            Thêm mới
                                                        </button>
                                                    </>

                                                )}
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>


        </>
    )
}