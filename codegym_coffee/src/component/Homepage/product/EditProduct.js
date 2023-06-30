// import React, { useEffect, useState } from 'react';
// import { Form, Field, Formik,ErrorMessage } from 'formik';
// import * as productService from '../../../service/ProductService'
// import { useNavigate, useParams } from "react-router";
// import * as Yup from "yup";
// export function EditProduct() {
//     let param = useParams()

//     let navigate = useNavigate();

//     const [products, setProduct] = useState();

//     useEffect(() => {
//         const updateProduct = async () => {
//             const res = await productService.findProductById(param.id)
//             setProduct(res)
//         }
//         updateProduct()
//     }, [])

//     if (!products) {
//         return null;
//     }
//     return (
//         <>
//             <Formik initialValues={{
//                 id: products?.id,
//                 name: products?.name,
//                 image: products?.image,
//                 category: products?.category,
//                 price: products?.price,
//                 ingredient: products?.ingredient
//             }}
//                 validationSchema={
//                     Yup.object({
//                         name: Yup.string().required("Nhập tên món")
//                     })
//                 }
//                 onSubmit={(values) => {
//                     const editProduct = async () => {
//                         console.log(values);
//                         await productService.updateProduct(values)
//                         navigate('/');
//                     };
//                     editProduct();
//                 }}
//             >

//                 <div className="container my-5 form-employee">
//                     <Form action="">
//                         <div className="row">
//                             <h1 className="text-center mb-5">THÊM ĐỒ ĂN & THỨC UỐNG</h1>
//                             <div className="col-lg-6 col-md-12">
//                                 <div className="form-group">

//                                     <Field type="hidden" name="id" />

//                                     <div className="d-flex align-items-center mb-1">
//                                         <i className="fa"></i>
//                                         <label htmlFor="name" className="fw-bold ms-2">
//                                             Tên món:
//                                         </label>
//                                         <label style={{ color: "red" }}>*</label>
//                                     </div>
//                                     <Field
//                                         type="text"
//                                         className="form-control"
//                                         name="name"
//                                         id="name"
//                                         required=""
//                                     />
//                                     <ErrorMessage name="name" component={"p"}
//                                         style={{ color: "red" }} />
//                                 </div>
//                                 <div className="form-group" style={{ paddingTop: 20 }}>
//                                     <div className="d-flex align-items-center mb-1">
//                                         <i className="far"></i>
//                                         <label htmlFor="image" className="fw-bold ms-2">
//                                             Ảnh
//                                         </label>
//                                         <label style={{ color: "red" }}>*</label>
//                                     </div>
//                                     <Field type="file" className="form-control" name="image" id="image" required="" />
//                                     <img
//                                         src="https://trivietphat.net/wp-content/uploads/2021/09/cach-lam-tra-dao-hat-chia.webp"
//                                         alt=""
//                                         className="img-fluid"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-12">
//                                 <div className="form-group">
//                                     <div className="d-flex align-items-center mb-1">
//                                         <i className="fa-solid fa-bars" />
//                                         <label htmlFor="category" className="fw-bold ms-2">
//                                             Nhóm món:
//                                         </label>
//                                         <label style={{ color: "red" }}>*</label>
//                                     </div>
//                                     <select
//                                         name="category"
//                                         id="category"
//                                         style={{ width: "100%", height: 37 }}
//                                     >
//                                         <option style={{ textAlign: "center" }} value="">
//                                             --Hãy chọn nhóm món--
//                                         </option>
//                                         <option value="cafe">Cà phê</option>
//                                         <option value="tra">Trà</option>
//                                         <option value="sua chua">Sữa chua</option>
//                                         <option value="kombucha">Kombucha</option>
//                                         <option value="mon nong">Món nóng</option>
//                                         <option value="banh">Bánh</option>
//                                     </select>
//                                 </div>
//                                 <div className="form-group" style={{ paddingTop: 20 }}>
//                                     <div className="d-flex align-items-center mb-1">
//                                         <i className="fas fa-money-check-alt fa-lg" />
//                                         <label htmlFor="price" className="fw-bold ms-2">
//                                             Giá (VNĐ):
//                                         </label>
//                                         <label style={{ color: "red" }}>*</label>
//                                     </div>
//                                     <Field
//                                         type="text"
//                                         className="form-control"
//                                         name="price"
//                                         id="price"
//                                         required=""
//                                     />
//                                 </div>
//                                 <div className="form-group" style={{ paddingTop: 24 }}>
//                                     <label htmlFor="ingredient" className="fw-bold">
//                                         Thành phần:
//                                     </label>
//                                     <label style={{ color: "red" }}>*</label>
//                                     <textarea
//                                         className="form-control"
//                                         name="ingredient"
//                                         id="ingredient"
//                                         rows={4}
//                                         required=""
//                                         defaultValue={""}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row d-flex" style={{ paddingBottom: 50 }}>
//                             <div className="col-6" style={{ textAlign: "right" }}>
//                                 <button
//                                     type="reset"
//                                     className="btn btn-primary btn-block"
//                                     style={{ background: "black", border: "none" }}
//                                 >
//                                     Quay về
//                                 </button>
//                             </div>
//                             <div className="col-6">
//                                 <button
//                                     type="submit"
//                                     className="btn btn-primary btn-block"
//                                     style={{ background: "#f26b38", border: "none" }}
//                                 >
//                                     Thêm mới
//                                 </button>
//                             </div>
//                         </div>
//                     </Form>
//                 </div>
//             </Formik>

//         </>
//     )
// }