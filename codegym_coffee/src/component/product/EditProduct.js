import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import {useNavigate, useParams} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "../../css/Homepage/drink.css";
import { storage } from "../../firebase";
import * as productService from "../../service/ProductService";

export function EditProduct() {
    let param = useParams();
    const [product, setProduct] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState("");
    const [progress, setProgress] = useState(0);
    const [flag, setFlag] = useState(false)
    const [imgErr, setImgErr] = useState('')
    const [productTypeDTO, setProductTypeDTO] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {
        const getproductTypeDTO = async () => {
            let rs = await productService.findProductTypeDTO();
            setProductTypeDTO(rs);
        }
        getproductTypeDTO();
    }, []);

    useEffect(() => {
        const getId = async () => {
            let rs = await productService.findProductById(param.idProduct);
            setProduct(rs)
        }
        getId();
    }, [param.idProduct]);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setFlag(true)
        if (file) {
            setSelectedFile(file)
        }
    }
    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) {
                return reject("Chưa có file ảnh được chọn")
            }
            const storageRef = ref(storage, `files/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                "state_changed", (snapshot => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                }, (error) => {
                    reject(error)
                }, async () => {
                    try {
                        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        setImg(downloadUrl);
                        resolve(downloadUrl);
                    } catch (e) {
                        setImgErr(e.response.data[0].defaultMessage)
                    }
                }
            )
            )
        })
    };


    if (!product) {
        return null;
    }

    return (
        <>
            <Formik initialValues={{
                idProduct: product?.idProduct,
                ingredient: product?.ingredient,
                nameProduct: product?.nameProduct,
                price: product?.price,
                image: product?.image,
                productTypeId: product?.productType?.idType

            }}
                validationSchema={
                    Yup.object({
                        ingredient: Yup.string().required("Vui lòng nhập thành phần")
                            .matches(/^[^0-9]*$/, "Thành phần không được chứa số"),

                        nameProduct: Yup.string().required("Vui lòng nhập tên món").min(5, "Tên món phải nhiều hơn 5 từ")
                            .max(20, "Tên món không dài quá 20 từ"),
                        price: Yup.string().required("Vui lòng nhập giá"),

                    })
                }

                onSubmit={(values, { setSubmitting }) => {
                    debugger
                    const edit = async () => {
                        const newValue = {
                            ...values,
                            image: firebaseImg,
                        };
                        try {
                            newValue.productTypeDTO = {
                                idType: parseInt(values.productTypeId),
                            };


                            delete values.idType;
                            if (flag) {
                                newValue.image = await handleSubmitAsync();
                            } else if (!newValue.image) {
                                newValue.image = product.image;
                            }
                            await productService.updateProduct(newValue);
                            Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật món thành công'
                            })
                            setSubmitting(false)
                            navigate('/menu')
                        } catch (error) {
                            console.log(error);
                        }

                    }
                    edit();
                }}

            >

                {({ isSubmitting }) => (
                    <div className="container" style={{marginTop:"120px"}}>
                        <div className="container my-5 form-product" style={{ maxWidth: 1000 }}>
                            <div className="container">
                                <div className="content" style={{ maxWidth: 1000 }}>
                                    <h1 className="text-center mb-2 mb-3">CHỈNH SỬA ĐỒ ĂN & THỨC UỐNG</h1>
                                    <Form action="">
                                        <Field name="idProduct" type="hidden" />

                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="fa"></i>
                                                        <label htmlFor="nameProduct" className="fw-bold ms-2">
                                                            Tên món:
                                                        </label>
                                                        <label style={{ color: "red" }}>*</label>
                                                    </div>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="nameProduct"
                                                        id="nameProduct"
                                                        required=""
                                                    />
                                                    <ErrorMessage name="nameProduct" component={"p"} style={{ color: "red" }} />
                                                </div>
                                                <div className="form-group" style={{ paddingTop: 14 }}>
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="far"></i>
                                                        <label htmlFor="image" className="fw-bold ms-2">
                                                            Ảnh
                                                        </label>
                                                        <label style={{ color: "red" }}>*</label>
                                                    </div>
                                                    <Field
                                                        type="file"
                                                        onChange={(e) => handleFileSelect(e)}
                                                        id="image"
                                                        name={"firebaseImg"}
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
                                                            style={{ width: "100%" }}
                                                            alt=""
                                                        />
                                                    )}
                                                    {!selectedFile && product && (
                                                        <img className={"mt-2"} src={product.image} style={{ width: "100%" }} alt="" />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="fa-solid fa-bars" />
                                                        <label htmlFor="productTypeDTO" className="fw-bold ms-2">
                                                            Nhóm món:
                                                        </label>
                                                        <label style={{ color: "red" }}>*</label>
                                                    </div>
                                                    <Field
                                                        as="select"
                                                        name="productTypeId"
                                                        style={{ width: "100%", height: 37, border: "none" }}
                                                    >
                                                        <option style={{ textAlign: "center" }} value="">
                                                            --Hãy chọn nhóm món--
                                                        </option>
                                                        {productTypeDTO.map((listType, index) => (
                                                            <option key={index} value={listType.idType}>
                                                                {listType.nameType}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="image" component={"p"} style={{ color: "red" }} />
                                                </div>
                                                <div className="form-group" style={{ paddingTop: 20 }}>
                                                    <div className="d-flex align-items-center mb-1">
                                                        <i className="fas fa-money-check-alt fa-lg" />
                                                        <label htmlFor="price" className="fw-bold ms-2">
                                                            Giá (VNĐ):
                                                        </label>
                                                        <label style={{ color: "red" }}>*</label>
                                                    </div>
                                                    <Field
                                                        type="text"
                                                        className="form-control"
                                                        name="price"
                                                        id="price"
                                                        required=""
                                                    />
                                                    <ErrorMessage name="price" component={"p"} style={{ color: "red" }} />
                                                </div>
                                                <div className="form-group" style={{ paddingTop: 24 }}>
                                                    <div className="d-flex align-items-center mb-1">
                                                        <label htmlFor="ingredient" className="fw-bold">
                                                            Mô tả:
                                                        </label>
                                                        <label style={{ color: "red" }}>*</label>
                                                    </div>
                                                    <Field as="textarea" className="form-control" name="ingredient" id="ingredient" rows={4} />
                                                    <ErrorMessage name="ingredient" component={"p"} style={{ color: "red" }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row d-flex" style={{ paddingTop: 25, paddingBottom: 30 }}>
                                            <div className="col-md-6 text-md-end mb-3 mb-md-0">
                                                <button
                                                    type="reset"
                                                    className="btn btn-primary btn-block"
                                                    style={{ border: "none" }}
                                                >
                                                    Quay về
                                                </button>
                                            </div>
                                            <div className="col-md-6">
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
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block"
                                                        style={{ background: "#f26b38", border: "none" }}
                                                    >
                                                        Lưu

                                                    </button>
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
