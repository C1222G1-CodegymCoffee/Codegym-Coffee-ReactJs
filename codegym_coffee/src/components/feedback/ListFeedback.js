import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import * as FeedbackService from "../../service/feedback/FeedbackService";
import {findAll} from "../../service/feedback/FeedbackService";
import {Axios as axios} from "axios";
import {Field, Form, Formik} from "formik";
import Pagination from "react-js-pagination";


export const ListFeedback = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    const pageSize = 10;
    // const totalPages = Math.ceil(feedbacks?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFeedback = feedbacks?.slice(startIndex, endIndex);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const getListFeedback = async () => {
        const listFeedback = await findAll();
        setFeedbacks(listFeedback.content);
        console.log(listFeedback)
    }

// lấy id chi tiết
    const [code, setCode] = useState('')
    const [day, setDay] = useState('')
    const [people, setPeople] = useState('')
    const [email, setEmail] = useState('')
    const [content, setContent] = useState('')
    const [img, setIMG] = useState('')

    function handleShowModal(id, codeFeedback, dayOfFeedback, creator, email, content, image) {
        setCode(codeFeedback);
        setDay(dayOfFeedback);
        setPeople(creator)
        setEmail(email)
        setContent(content)
        setIMG(image)
    }

    useEffect(() => {
        const fetchFeedbacks = async () => {
            let result = await FeedbackService.getFeedbacks(activePage);
            console.log("rss", result)
            setFeedbacks(result.content);
            console.log("1", result.content)
            setTotalItemsCount(result.totalCount);
        };
        fetchFeedbacks();
    }, [activePage]);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    useEffect(() => {
        getListFeedback();

    }, [currentPage])


    return (
        <>
            <div>
                <h2 className="text-center pt-4" style={{fontWeight: "bold"}}>DANH SÁCH PHẢN HỒI </h2>
            </div>
            <div className="row mx-0 mt-3 px-5 py-1">
                <div className="table-responsive">
                    <Formik
                        initialValues={{
                            searchTerm: "",
                            dayOfFeedback: ""
                        }}
                        onSubmit={(values) => {
                            const search = async () => {
                                let result = await FeedbackService.search(values.searchTerm, values.dayOfFeedback)
                                console.log("vl", values)
                                console.log("rs", result)
                                if (result.length === 0) {
                                    alert("không tìm thấy")
                                } else {
                                    setFeedbacks(result.content)
                                }

                                console.log("value", values)
                            }
                            search()
                        }}
                    >
                        <Form>
                            <div className="input-group mb-4" style={{width: "45%"}}>
                            <span className="input-group-text">
                            <svg className="bi bi-search-heart" fill="currentColor" style={{height: 16, width: 16}}
                                 viewBox="0 0 16 16"
                                 xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
                            <path
                                d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
                            </svg>
                            </span>
                                <Field className="form-control" placeholder="Tên/Nội dung" type="text" name='searchTerm'/>
                                <Field aria-label="Ngày feedback" className="form-control" placeholder="Ngày feedback"
                                       type="date" name='dayOfFeedback'/>
                                <button className="btn btn-success"
                                        style={{marginLeft: "1%", backgroundColor: "#8C6842"}} type="submit">
                                    Tìm kiếm
                                </button>
                            </div>
                        </Form>
                    </Formik>

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
                            return (
                                <tr key={feedback.idFeedback}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{feedback.codeFeedback}</td>
                                    <td>{feedback.dayOfFeedback}</td>
                                    <td>{feedback.creator}</td>
                                    <td>{feedback.email}</td>
                                    <td>{feedback.content.length > 15 ? feedback.content.slice(0, 15) + "..." : feedback.content}</td>
                                    <td>
                                        <button className="btn btn-primary d-none d-sm-table-cell"
                                                style={{backgroundColor: "#0074d9"}}
                                                onClick={() => handleShowModal(feedback.id, feedback.codeFeedback, feedback.dayOfFeedback, feedback.creator, feedback.email, feedback.content, feedback.image)}
                                                data-bs-target="#exampleModal" data-bs-toggle="modal" type="button">
                                            <svg className="bi bi-eye-fill" fill="currentColor"
                                                 style={{height: 16, width: 16}}
                                                 viewBox="0 0 16 16"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                <path
                                                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                            </svg>
                                        </button>
                                    </td>

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
                                        style={{fontWeight: "bold"}}>Thông tin
                                        phản hồi của <span>{people}</span></h5>
                                    <button aria-label="Close" className="btn-close" data-bs-dismiss="modal"
                                            type="button"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="d-flex justify-content-center mt-3">
                                        <form action="">
                                            <table className="">
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" style={{
                                                            paddingRight: "5rem",
                                                            paddingLeft: "5rem",
                                                            width: "20rem"
                                                        }} htmlFor="">Mã số phản
                                                            hồi: </label>
                                                    </th>
                                                    <td>
                                                        {code}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" style={{paddingLeft: "5rem"}}
                                                               htmlFor="">Ngày phản
                                                            hồi: </label>
                                                    </th>
                                                    <td>
                                                        {day}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" style={{paddingLeft: "5rem"}}
                                                               htmlFor="">Người tạo: </label>
                                                    </th>
                                                    <td>
                                                        {people}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" style={{paddingLeft: "5rem"}}
                                                               htmlFor="">Email: </label>
                                                    </th>
                                                    <td>
                                                        {email}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" style={{paddingLeft: "5rem"}}
                                                               htmlFor="">Phản hồi: </label>
                                                    </th>
                                                    <td>
                                                        {content}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <label className="fs-5" style={{paddingLeft: "5rem"}}
                                                               htmlFor="">Hình ảnh: </label>
                                                    </th>
                                                    <td>
                                                        <img style={{width: "45%"}} src={img}></img>
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

                    {/*Phân trang*/}

                    <div className=" d-flex justify-content-center">
                        <Pagination
                            activePage={activePage}
                            totalItemsCount={totalItemsCount}
                            itemsCountPerPage={10}
                            onChange={handlePageChange}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                        {/*<ReactPaginate*/}
                        {/*    previousLabel="Trước"*/}
                        {/*    nextLabel="Sau"*/}
                        {/*    pageCount={pageCount}*/}
                        {/*    onPageChange={handlePageClick}*/}
                        {/*    containerClassName="pagination"*/}
                        {/*    previousClassName="page-item"*/}
                        {/*    previousLinkClassName="page-link"*/}
                        {/*    nextClassName="page-item"*/}
                        {/*    nextLinkClassName="page-link"*/}
                        {/*    pageClassName="page-item"*/}
                        {/*    pageLinkClassName="page-link"*/}
                        {/*    activeClassName="active"*/}
                        {/*    activeLinkClassName="page-link"*/}
                        {/*    forcePage={currentPage}*/}
                        {/*    pageRangeDisplayed={2} // Hiển thị 3 trang trên mỗi lần render*/}
                        {/*    marginPagesDisplayed={1} // Hiển thị 1 trang ở đầu và cuối danh sách trang*/}
                        {/*/>*/}
                    </div>

                </div>
            </div>
        </>
    )
};
