import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from 'react';
import {findAll, findBillCode, getBills, search} from "../../service/BillService";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

function List() {
    const navigate = useNavigate();
    const [bill, setBill] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const pageSize = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBill = bill?.slice(startIndex, endIndex);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);


    const getListBill = async () => {
        const listBill = await findAll();
        setBill(listBill.content);
    }

    // const getListBills = async () => {
    //     const listBill = await findAll();
    //     setBill(listBill.content);
    // }

    const fetchData = async (page) => {
        try {
            const result = await axios.get(`http://localhost:8080/api/admin/bill?page=${page}&size=${itemsPerPage}`);
            setData(result.data.content);
            setTotalPages(result.data.totalPages);
            setTotalElements(result.data.totalElements);
        } catch (error) {
            console.log(error);
        }
    };

    const getListBills = async () => {
        const listBill = await getBills(currentPage, pageSize);
        setTotalPages(listBill.totalPages)
        setBill(listBill.content);
    }

    let state = {
        pagedResponse: {},
        users: [],
        showLoading: false
    };

    function handleClickPage(page) {
        setCurrentPage(page.selected)
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
        fetchData(currentPage);

    }, [currentPage])

// lấy id chi tiết *
    const [creatorr, setCreator] = useState('')
    const [table, setTable] = useState('')
    const [content, setContent] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [price, setPrice] = useState('')
    const [emailFeedback, setEmailFeedback] = useState('')

    const formattedPrice = new Intl.NumberFormat().format(price);

// *
    function handleShowModal(nameCreator, tableBill, contentBill, priceDetailBill, phoneNumberBill, emailFeedback) {
        setCreator(nameCreator);
        setTable(tableBill);
        setContent(contentBill);
        setPhoneNumber(phoneNumberBill);
        setPrice(priceDetailBill);
        setEmailFeedback(emailFeedback);

    }

    return (
        <div>
            <div className="element">
                <div className="">
                    <h1 className="text-center">Danh sách hoá đơn</h1>
                    <br/>
                </div>
                <div className="row">
                    <div className="col-md-2"/>
                    <div className="col-md-8">
                        <Formik
                            initialValues={{searchTerm: "", dayOfBill: ""}}
                            onSubmit={async (values) => {
                                const result = await search(values.searchTerm, values.dayOfBill
                                );
                                if (result.length === 0) {
                                    alert("không tìm thấy");
                                } else {
                                    setBill(result.content);
                                }
                            }}
                        >
                            <Form className="d-flex">
                                <span className="input-group-text">
                                    <img width={24} height={24} src="https://img.icons8.com/glyph-neue/64/bill.png"
                                         alt="bill"/>
                                </span>
                                <Field
                                    style={{width: "90%", height: "40px"}}
                                    className="form-control"
                                    type="text"
                                    name="searchTerm"
                                    placeholder="Mã hoá đơn"
                                />
                                <span className="input-group-text">
                                    <img width={24} height={24} src="https://img.icons8.com/windows/32/calendar.png"
                                         alt="date"/>
                                </span>
                                <Field
                                    style={{width: "90%", height: "40px"}}
                                    className="form-control"
                                    type="date"
                                    name="dayOfBill"
                                />

                                <button
                                    className="input-group-text border-0 btn btn-light"
                                    id="search-addon"
                                >
                                    <img
                                        width={20}
                                        height={20}
                                        src="https://img.icons8.com/ios-filled/50/search--v1.png"
                                        alt="search--v1"
                                    />
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                        <table className="table table-striped mt-2">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã hoá đơn</th>
                                <th>Ngày tạo</th>
                                <th>Tên Nhân Viên</th>
                                <th>Email</th>
                                <th>Tổng tiền</th>
                                <th>Chi tiết</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bill &&
                                bill.map((bills, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{bills.codeBill}</td>
                                        <td>{bills.dayOfBill}</td>
                                        <td>{bills.employee.nameEmployee}</td>
                                        <td>{bills.feedback.email}</td>
                                        <td>{new Intl.NumberFormat().format(bills.employee.salary)}</td>

                                        <td>
                                            <button type="button" className="btn btn-light" data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop" onClick={() =>
                                                handleShowModal(
                                                    bills.feedback.creator,
                                                    bills.tableCoffee.nameTable,
                                                    bills.feedback.content,
                                                    bills.billDetail.quantityOfProduct,
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
                    <div className="modal-content bg-light">
                        <div className="modal-header">
                            <h5 className="modal-title text-primary" id="staticBackdropLabel">
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
                                    <div className="col-md-12">
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
                            >
                                Quay về
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
        </div>
    );
}


export default List;

