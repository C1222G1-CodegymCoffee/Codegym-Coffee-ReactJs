import { Formik, Form, Field, ErrorMessage } from "formik"
import "../../css/Homepage/drink.css"
import * as productervice from "../../service/ProductService"
import "react-toastify/dist/ReactToastify.css"
// import { ToastContainer, toast } from "react-toastify"
import * as Yup from "yup";
import { useEffect, useState } from "react"
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from "../../firebase";
export function EditProduct() {
    const [product, setProduct] = useState();
    const param = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState("");
    const [flag, setFlag] = useState(false)
    const [progress, setProgress] = useState(0);
    const [imgErr, setImgErr] = useState('')

    useEffect(() => {
        const updateProduct = async () => {
            const res = await productervice.findProductById(param.id)
            setProduct(res)
        }
        updateProduct()
    }, [])


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
                nameProduct: product?.nameProduct,
                image: product?.image,
                ingredient: product?.ingredient,
                price: product?.price,
                productTypeDTO:{
                    idType:product?.productTypeDTO?.idType,
                    nameType:product?.productTypeDTO?.nameType
                }
            }}
                validationSchema={
                    Yup.object({
                        name: Yup.string().required("Nhập tên món")
                    })
                }
                onSubmit={(values) => {
                    const editProduct = async () => {
                        console.log(values);
                        await productervice.updateProduct(values)
                        navigate('/');
                    };
                    editProduct();
                }}
            >

                <div className="container my-5 form-employee">
                    <Form action="">
                        <div className="row">
                            <h1 className="text-center mb-5">THÊM ĐỒ ĂN & THỨC UỐNG</h1>
                            <div className="col-lg-6 col-md-12">
                                <div className="form-group">

                                    <Field type="hidden" name="id" />

                                    <div className="d-flex align-items-center mb-1">
                                        <i className="fa"></i>
                                        <label htmlFor="name" className="fw-bold ms-2">
                                            Tên món:
                                        </label>
                                        <label style={{ color: "red" }}>*</label>
                                    </div>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        required=""
                                    />
                                    <ErrorMessage name="name" component={"p"}
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
                                    <Field type="file" className="form-control" name="image" id="image" required="" />
                                    <img
                                        src="https://trivietphat.net/wp-content/uploads/2021/09/cach-lam-tra-dao-hat-chia.webp"
                                        alt=""
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-1">
                                        <i className="fa-solid fa-bars" />
                                        <label htmlFor="category" className="fw-bold ms-2">
                                            Nhóm món:
                                        </label>
                                        <label style={{ color: "red" }}>*</label>
                                    </div>
                                    <select
                                        name="category"
                                        id="category"
                                        style={{ width: "100%", height: 37 }}
                                    >
                                        <option style={{ textAlign: "center" }} value="">
                                            --Hãy chọn nhóm món--
                                        </option>
                                        <option value="cafe">Cà phê</option>
                                        <option value="tra">Trà</option>
                                        <option value="sua chua">Sữa chua</option>
                                        <option value="kombucha">Kombucha</option>
                                        <option value="mon nong">Món nóng</option>
                                        <option value="banh">Bánh</option>
                                    </select>
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
                                    <textarea
                                        className="form-control"
                                        name="ingredient"
                                        id="ingredient"
                                        rows={4}
                                        required=""
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex" style={{ paddingBottom: 50 }}>
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
            </Formik>

        </>
    )
}