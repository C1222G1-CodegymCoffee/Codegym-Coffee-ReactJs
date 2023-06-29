import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {findAll} from "../../service/feedback/FeedbackService";
import {Field} from "formik";

export const ListFeedback = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState(null);

    const getListFeedback = async () => {
        const listFeedback = await findAll();
        setFeedbacks(listFeedback.content);
        console.log(listFeedback)
    }

    useEffect(() => {
        getListFeedback();

    }, [])
    return (
        <>
            <div>
                <h2 className="text-center pt-4" style={{fontWeight: "bold"}}>DANH SÁCH PHẢN HỒI </h2>
            </div>
            <div className="row mx-0 mt-3 px-5 py-1">
                <div className="table-responsive">
                    {/*<formik>*/}
                    {/*    <div className="input-group mb-4" style={{width: "45%"}}>*/}
                    {/*    <span className="input-group-text">*/}
                    {/*        <svg className="bi bi-search-heart" fill="currentColor" style={{height: 16, width: 16}}viewBox="0 0 16 16"*/}
                    {/*             xmlns="http://www.w3.org/2000/svg">*/}
                    {/*            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>*/}
                    {/*            <path*/}
                    {/*                d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>*/}
                    {/*        </svg>*/}
                    {/*    </span>*/}
                    {/*        <Field className="form-control" placeholder="Tên/Nội dung" type="text"/>*/}
                    {/*        <Field aria-label="Server" className="form-control" placeholder="Server" type="date"/>*/}
                    {/*        <button className="btn btn-success" style={{marginLeft: "1%", backgroundColor:"#8C6842"}}*/}
                    {/*                type="button">*/}
                    {/*            Tìm kiếm*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</formik>*/}


                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã số phản hồi</th>
                            <th>Ngày phản hồi</th>
                            <th>Người tạo</th>
                            <th>Email</th>
                            <th>Phản hồi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {feedbacks?.map((feedback, index) => {
                            return(
                                <tr key={feedback.idFeedback}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{feedback.codeFeedback}</td>
                                    <td>{feedback.dayOfFeedback}</td>
                                    <td>{feedback.creator}</td>
                                    <td>{feedback.email}</td>
                                    <td>{feedback.content.length > 15 ? feedback.content.slice(0,15) + "..." : feedback.content}</td>
                                    <button className="btn btn-primary d-none d-sm-table-cell"
                                            data-bs-target="#exampleModal" data-bs-toggle="modal" type="button">
                                        <svg className="bi bi-eye-fill" fill="currentColor" style={{height: 16, width: 16}}
                                             viewBox="0 0 16 16"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                            <path
                                                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                        </svg>
                                    </button>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <div aria-hidden="true" aria-labelledby="exampleModalLabel" className="modal fade"
                         id="exampleModal"
                         tabIndex="-1">
                        <div className="modal-dialog" style={{maxWidth: "50%"}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel"
                                        style = {{fontWeight: "bold"}}>Thông tin
                                        phản hồi</h5>
                                    <button aria-label="Close" className="btn-close" data-bs-dismiss="modal"
                                            type="button"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="d-flex justify-content-center mt-3">
                                        <form action="">
                                            <table className="">
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" htmlFor="">STT: </label>
                                                    </th>
                                                    <td scope="row">
                                                        {index + 1}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" htmlFor="">Mã số phản
                                                            hồi: </label>
                                                    </th>
                                                    <td>
                                                        {feedback.codeFeedback}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" htmlFor="">Ngày phản
                                                            hồi: </label>
                                                    </th>
                                                    <td>
                                                        20/10/2021
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" htmlFor="">Người tạo: </label>
                                                    </th>
                                                    <td>
                                                        Nguyễn Văn A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" htmlFor="">Email: </label>
                                                    </th>
                                                    <td>
                                                        abc@gmail.com
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" htmlFor="">Phản hồi: </label>
                                                    </th>
                                                    <td>
                                                        Đồ uống ngon
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" htmlFor="">Hình ảnh: </label>
                                                    </th>
                                                    <td>

                                                    </td>
                                                </tr>
                                            </table>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" data-bs-dismiss="modal"
                                            type="button">Đóng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
