import { useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import * as FeedbackService from "../../service/feedback/FeedbackService";
import { getFeedbacks } from "../../service/feedback/FeedbackService";
import { Field, Form, Formik } from "formik";
import ReactPaginate from "react-paginate";
import "../../css/feedback/listFeedback.css";

export const ListFeedback = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const pageSize = 10;

  // lấy id chi tiết
  const [code, setCode] = useState("");
  const [day, setDay] = useState("");
  const [people, setPeople] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [img, setIMG] = useState("");

  function handleShowModal(
    id,
    codeFeedback,
    dayOfFeedback,
    creator,
    email,
    content,
    image
  ) {
    setCode(codeFeedback);
    setDay(dayOfFeedback);
    setPeople(creator);
    setEmail(email);
    setContent(content);
    setIMG(image);
  }

  const getListFeedbacks = async () => {
    const listFeedback = await getFeedbacks(currentPage, pageSize);
    setTotalPage(listFeedback.totalPages);
    setFeedbacks(listFeedback.content);
  };

  const search = async (searchTerm, dayOfFeedback) => {
    let result = await FeedbackService.search(
      searchTerm,
      dayOfFeedback,
      currentPage,
      pageSize
    );
    if (result.length === 0) {
      setFeedbacks([]);
    } else {
      setFeedbacks(result.content);
      setTotalPage(result.totalPages);
    }
  };

  useEffect(() => {
    if (
      formRef.current.values.dayOfFeedback !== "" ||
      formRef.current.values.searchTerm !== ""
    ) {
      search(
        formRef.current.values.searchTerm,
        formRef.current.values.dayOfFeedback
      );
    } else {
      getListFeedbacks();
    }
  }, [currentPage]);

  let state = {
    pagedResponse: {},
    users: [],
    showLoading: false,
  };

  function handleClickPage(page) {
    setCurrentPage(page.selected);
  }

  function handleChangePage(pageable) {
    if (currentPage + 1 === totalPage && pageable.isNext === true) return false;
    if (pageable.isNext === true) {
      setCurrentPage(pageable.selected + 1);
    } else {
      setCurrentPage(pageable.selected - 1);
    }
  }

  return (
    <>
      <div className="row mx-0 mt- px-5 py-1" id="listFeedback">
        <div>
          <h2 className="text-center pt-4">DANH SÁCH PHẢN HỒI </h2>
        </div>

        <div className="table-responsive">
          <Formik
            initialValues={{
              searchTerm: "",
              dayOfFeedback: "",
            }}
            innerRef={formRef}
            onSubmit={(values) => {
              if (currentPage === 0) {
                search(values.searchTerm, values.dayOfFeedback);
              }
              setCurrentPage(0);
            }}
          >
            <Form>
              <div className="input-group mb-12">
                <span className="input-group-text">
                  <svg
                    className="bi bi-search-heart"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
                    <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
                  </svg>
                </span>
                <Field
                  className="form-control me-3"
                  placeholder="Người tạo/Phản hồi"
                  type="text"
                  name="searchTerm"
                />
                <Field
                  aria-label="Ngày feedback"
                  className="form-control me-3"
                  type="date"
                  name="dayOfFeedback"
                />
                <button
                  className="btn btn-light"
                  type="submit"
                  style={{
                    backgroundColor: "gainsboro",
                    border: "1px solid gainsboro",
                  }}
                >
                  <img
                    width={20}
                    height={20}
                    src="https://img.icons8.com/ios-filled/50/search--v1.png"
                    alt="search--v1"
                  />
                </button>
              </div>
            </Form>
          </Formik>

          <table className="table table-striped">
            <thead>
              <tr>
                <th className="content-title">STT</th>
                <th className="content-title">Mã số phản hồi</th>
                <th className="content-title">Ngày phản hồi</th>
                <th className="content-title">Người tạo</th>
                <th className="content-title">Email</th>
                <th className="content-title">Phản hồi</th>
                <th className="content-title">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks?.map((feedback, index) => {
                const date = new Date(feedback.dayOfFeedback);
                const formattedDate = date.toLocaleDateString("vi-VN");
                return (
                  <tr key={feedback.idFeedback}>
                    <td className="content-feedback" scope="row">
                      {index + 1}
                    </td>
                    <td className="content-feedback">
                      {feedback.codeFeedback}
                    </td>
                    <td className="content-feedback">{formattedDate}</td>
                    <td className="content-feedback">{feedback.creator}</td>
                    <td className="content-feedback">{feedback.email}</td>
                    <td className="content-feedback">
                      {feedback.content.length > 30
                        ? feedback.content.slice(0, 30) + "..."
                        : feedback.content}
                    </td>
                    <td>
                      <button
                        className="btn btn-light d-none d-sm-table-cell"
                        onClick={() =>
                          handleShowModal(
                            feedback.id,
                            feedback.codeFeedback,
                            feedback.dayOfFeedback,
                            feedback.creator,
                            feedback.email,
                            feedback.content,
                            feedback.image
                          )
                        }
                        data-bs-target="#exampleModal"
                        data-bs-toggle="modal"
                        type="button"
                      >
                        <img
                          width="20"
                          height="20"
                          src="https://img.icons8.com/color/48/bulleted-list.png"
                          alt="bulleted-list"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {feedbacks?.length === 0 && (
                <tr className="text-center">
                  <td colSpan={7} style={{ fontSize: "20px" , color: "red"}}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div
            aria-hidden="true"
            aria-labelledby="exampleModalLabel"
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Thông tin phản hồi của{" "}
                    <span className="name-title">{people}</span>
                  </h5>
                  <hr />
                  <button
                    aria-label="Close"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    type="button"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-center mt-3">
                    <form action="">
                      <table className="table-detail">
                        <tr className="detail-content">
                          <th>
                            <label className="fs-5" htmlFor="">
                              Mã số phản hồi:{" "}
                            </label>
                          </th>
                          <td className="content">{code}</td>
                        </tr>
                        <tr className="detail-content">
                          <th>
                            <label className="fs-5" htmlFor="">
                              Ngày phản hồi:{" "}
                            </label>
                          </th>
                          <td className="content">{day}</td>
                        </tr>
                        <tr className="detail-content">
                          <th>
                            <label className="fs-5" htmlFor="">
                              Email:{" "}
                            </label>
                          </th>
                          <td className="content">{email}</td>
                        </tr>
                        <tr className="detail-content">
                          <th>
                            <label className="fs-5" htmlFor="">
                              Phản hồi:{" "}
                            </label>
                          </th>
                          <td className="content">{content}</td>
                        </tr>
                        <tr className="detail-content">
                          <th>
                            <label className="fs-5" htmlFor="">
                              Hình ảnh:{" "}
                            </label>
                          </th>
                          <td>
                            {img ? (
                              <img className="content-img" src={img} />
                            ) : (
                              <p className="content">Không có hình ảnh</p>
                            )}
                          </td>
                        </tr>
                      </table>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    type="button"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*Phân trang*/}

          {totalPage > 0 && (
            <div className=" d-flex justify-content-center">
              <ReactPaginate
                previousLabel="Trước"
                nextLabel="Sau"
                pageCount={totalPage}
                onPageChange={handleClickPage}
                onClick={handleChangePage}
                containerClassName="pagination"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                activeLinkClassName="page-link"
                forcePage={currentPage}
                pageRangeDisplayed={2} // Hiển thị 2 trang trên mỗi lần render
                marginPagesDisplayed={1} // Hiển thị 1 trang ở đầu và cuối danh sách trang
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
