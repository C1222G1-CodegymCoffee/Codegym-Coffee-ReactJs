import { Formik, Form, Field, ErrorMessage } from "formik"
import "../../../css/Homepage/drink.css"
import * as productService from "../../../service/ProductService"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import  {storage} from "../../../firebase";



export function CreateProduct() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [progress, setProgress] = useState(0);

    

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


    const navigate = useNavigate()
    const [productType, setProductType] = useState([])
    useEffect(() => {
        const getCategory = async () => {
            let rs = await productService.findProductType();
            setProductType(rs);
        }
        getCategory();
    }, []);

    return (
        <>

            <Formik initialValues={{
                nameProduct: "",
                image: "",
                productTypeDTO: "",
                price: "",
                ingredient: ""
            }}
                validationSchema={
                    Yup.object({
                        name: Yup.string().required("Nhập tên món")
                    })
                }
                onSubmit={(values) => {
                    const createProduct = async () => {
                        const newValue = {
                            ...values,
                            image: firebaseImg,
                        };
                        newValue.image = await handleSubmitAsync();

                        await productService.save(newValue)
                        console.log(newValue);
                    }
                    createProduct();
                }}
            >

                <div className="container my-5 form-employee">
                    <div className="container">
                        <div className="banner_image ">
                            <img src="/Homepage/img_01.png" alt="Banner Image" className="body_wrap" />
                        </div>
                        <div className="content">
                            <Form action="">
                                <div className="row">
                                    <h1 className="text-center mb-5">THÊM ĐỒ ĂN & THỨC UỐNG</h1>
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
                                            <ErrorMessage name="nameProduct" component={"p"}
                                                style={{ color: "red" }} />
                                        </div>
                                        <div className="form-group" style={{ paddingTop: 20 }}>
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
                                                name={"image"}
                                                className="form-control-plaintext d-none "
                                            />
                                            <p>
                                                <label htmlFor="image" style={{
                                                    display: "flex",
                                                    padding: "6px 12px",
                                                    border: "1px solid",
                                                    borderRadius: "4px",
                                                }}>
                                                    Chọn hình ảnh
                                                </label></p>
                                            {!selectedFile && (
                                                <span className={"mt-2 text-danger"}>Chưa có hình ảnh được chọn</span>
                                            )}
                                            {selectedFile && (
                                                <img
                                                    className={"mt-2"}
                                                    src={URL.createObjectURL(selectedFile)}
                                                    style={{ width: "100%" }}
                                                />
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
                                            <Field as='select' name='productTypeDTO' style={{ width: "100%", height: 37, }}>
                                                <option style={{ textAlign: "center" }} value="">
                                                    --Hãy chọn nhóm món--
                                                </option>
                                                {
                                                    productType.map((products, index) => (
                                                        <option key={index} value={products.idType}>
                                                            {products.nameType}
                                                        </option>
                                                    ))
                                                }
                                            </Field>
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
                                        </div>
                                        <div className="form-group" style={{ paddingTop: 24 }}>
                                            <label htmlFor="ingredient" className="fw-bold">
                                                Thành phần:
                                            </label>
                                            <label style={{ color: "red" }}>*</label>
                                            <Field as='textarea'
                                                className="form-control"
                                                name="ingredient"
                                                id="ingredient"
                                                rows={4}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex" style={{ paddingTop: 25, paddingBottom: 30 }}>
                                    <div className="col-6" style={{ textAlign: "right" }}>
                                        <button
                                            type="reset"
                                            className="btn btn-primary btn-block"
                                            style={{ background: "black", border: "none" }}
                                        >
                                            Quay về
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            style={{ background: "#f26b38", border: "none" }}
                                        >
                                            Thêm mới
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>

                </div>
            </Formik>


        </>
    )
}