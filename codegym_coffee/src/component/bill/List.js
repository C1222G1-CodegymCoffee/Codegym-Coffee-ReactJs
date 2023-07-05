import {Field, Form, Formik} from "formik";
import React, {useEffect, useRef, useState} from 'react';
import {findAll, findBillCode, getBills, search} from "../service_API/bill/BillService";
import {useNavigate} from "react-router-dom";
import moment from 'moment';
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../../css/bill/styleBill.css";
import * as BillService from "../service_API/bill/BillService";

function List() {
    const navigate = useNavigate();
    const [bill, setBill] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const formRef = useRef();

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const pageSize = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBill = bill?.slice(startIndex, endIndex);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const fetchData = async (page) => {
        try {
            const result = await axios.get(`http://localhost:8080/api/admin/bill?page=${page}&size=${itemsPerPage}`);
            setData(result.data.content);
            console.log("fdfd", result.data)
            setTotalPages(result.data.totalPages);
            setTotalElements(result.data.totalElements);
        } catch (error) {
            console.log(error);
        }
    };

    const getListBills = async () => {
        const listBill = await getBills(currentPage, pageSize);
        if (listBill) {
            setTotalPages(listBill.totalPages)
            setBill(listBill.content);
        }
    }


    let state = {
        pagedResponse: {},
        users: [],
        showLoading: false
    };

    function handleClickPage(page) {
        setCurrentPage(page.selected)
    }

    const search = async (searchTerm, dayOfBill) => {
        let result = await BillService.search(searchTerm, dayOfBill, currentPage, pageSize);
        console.log("rs", result);
        if (result.length === 0) {
            setBill([]);
        } else {
            setBill(result.content);
            setTotalPages(result.totalPages);
        }
    }

    function handleChangePage(pageable) {
        if (currentPage + 1 === totalPages && pageable.isNext === true) return false
        if (pageable.isNext === true) {
            setCurrentPage(pageable.selected + 1);
        } else {
            setCurrentPage(pageable.selected - 1);
        }
    }

    useEffect(() => {
        getListBills();

    }, [currentPage])

// lấy id chi tiết *
    const [creatorr, setCreator] = useState('')
    const [table, setTable] = useState('')
    const [content, setContent] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [salary, setSalary] = useState('')
    const [emailFeedback, setEmailFeedback] = useState('')

    const formattedPrice = new Intl.NumberFormat().format(salary);

// *
    function handleShowModal(nameCreator, tableBill, contentBill, salary, phoneNumberBill, emailFeedback) {
        setCreator(nameCreator);
        setTable(tableBill);
        setContent(contentBill);
        setPhoneNumber(phoneNumberBill);
        setSalary(salary);
        setEmailFeedback(emailFeedback);

    }

    return (
        <div>
            <div className="element mx-0 mt- px-5 py-1">
                <div>
                    <h2 className="text-center pt-4">DANH SÁCH HOÁ ĐƠN </h2>
                </div>
                <div className="row" style={{paddingLeft:"0px"}}>
                    {/*<div className="col-md-1"/>*/}
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <Formik
                                initialValues={{
                                    searchTerm: "", dayOfBill: ""
                                }}
                                onSubmit={async (values) => {
                                    if (currentPage === 0) {
                                        search(values.searchTerm, values.dayOfBill)
                                    }
                                    setCurrentPage(0)

                                }}
                            >
                                <Form>
                                    <div className="input-group mb-12" style={{margin: "0 auto"}}>
        <span className="input-group-text">
            <img width="25" height="25" src="https://img.icons8.com/windows/32/password-book.png" alt="password-book"/>
        </span>
                                        <Field className="form-control" placeholder="Mã hoá đơn" type="text"
                                               name='searchTerm'/>
                                        <span className="input-group-text" style={{marginLeft:"20px"}}>
            <img width="25" height="25" src="https://img.icons8.com/ios/50/calendar-app.png" alt="calendar-app"/>
        </span>
                                        <Field aria-label="Ngày tạo" className="form-control" type="date"
                                               name='dayOfBill'/>
                                        <div className="input-group-append">
                                            <button className="btn btn-light" type="submit" style={{marginLeft: "20px"}}>
                                                <img
                                                    width={20}
                                                    height={20}
                                                    src="https://img.icons8.com/ios-filled/50/search--v1.png"
                                                    alt="search--v1"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </Form>

                            </Formik>
                        </div>
                        <table className="table table-striped mt-3" style={{border: "none"}}>
                            <thead>
                            <tr>
                                <th className="content-title" style={{background: "#f26b38", color: "white"}}>STT</th>
                                <th className="content-title" style={{background: "#f26b38", color: "white"}}>Mã hoá
                                    đơn
                                </th>
                                <th className="content-title" style={{background: "#f26b38", color: "white"}}>Ngày tạo
                                </th>
                                <th className="content-title" style={{background: "#f26b38", color: "white"}}>Tên Nhân
                                    Viên
                                </th>
                                <th className="content-title" style={{background: "#f26b38", color: "white"}}>Email</th>
                                <th className="content-title" style={{background: "#f26b38", color: "white"}}>Tổng
                                    tiền
                                </th>
                                <th className="content-title" style={{background: "#f26b38", color: "white"}}>Chi tiết
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {bill &&
                                bill.map((bills, index) => (
                                    <tr key={index}>
                                        <td className="content-bill" scope="row">{index + 1}</td>
                                        <td className="content-bill">{bills.codeBill}</td>
                                        <td className="content-bill">{moment(bills.dayOfBill).format('DD/MM/YYYY')}</td>
                                        <td className="content-bill">{bills.employee.nameEmployee}</td>
                                        <td className="content-bill">{bills.feedback.email}</td>
                                        <td className="content-bill">{new Intl.NumberFormat().format(bills.employee.salary)}<span>đ</span></td>
                                        <td>
                                            <button type="button" className="btn btn-light" data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop" onClick={() =>
                                                handleShowModal(
                                                    bills.feedback.creator,
                                                    bills.tableCoffee.nameTable,
                                                    bills.feedback.content,
                                                    bills.employee.salary,
                                                    bills.employee.phoneNumber,
                                                    bills.feedback.email
                                                )}>
                                                <img width="20" height="20"
                                                     src="https://img.icons8.com/color/48/bulleted-list.png"
                                                     alt="bulleted-list"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            {bill?.length === 0 && <h5 className="text-center">
                                Không có dữ liệu
                            </h5>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/*modal detail*/}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content bg-light" style={{background: "none"}}>
                        <div className="modal-header">
                            <h5 className="modal-title text-danger" id="staticBackdropLabel"
                                style={{background: "s#f26b38"}}>
                                Chi tiết
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12" style={{display: "inline-block", marginTop: "20px"}}>
                                        <p className="text-muted">
                                            Tên khách hàng: <strong>{creatorr}</strong>
                                        </p>
                                        <p className="text-muted">
                                            Số bàn: <strong>{table}</strong>
                                        </p>
                                        <p className="text-muted">
                                            Content: <strong>{content}</strong>
                                        </p>
                                        <p className="text-muted">
                                            Số điện thoại: <strong>{phoneNumber}</strong>
                                        </p>

                                        <p className="text-muted">
                                            Tổng tiền: <strong>{formattedPrice} VND</strong>
                                        </p>
                                        <p className="text-muted">
                                            Email: <strong>{emailFeedback}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                style={{background: "#f26b38", border: "none"}}
                            >
                                Quay về
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                totalPages > 0 && (
                    <div className=" d-flex justify-content-center">
                        <ReactPaginate
                            previousLabel="Trước"
                            nextLabel="Sau"
                            pageCount={totalPages}
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
                            pageRangeDisplayed={2} // Hiển thị 3 trang trên mỗi lần render
                            marginPagesDisplayed={1} // Hiển thị 1 trang ở đầu và cuối danh sách trang
                        />
                    </div>

                )
            }
        </div>
    );
}


export default List;

