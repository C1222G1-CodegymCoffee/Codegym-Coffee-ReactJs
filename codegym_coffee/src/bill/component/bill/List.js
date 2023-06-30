import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from 'react';
import {findAll, findBillCode, search} from "../../service/BillService";
import {useNavigate} from "react-router-dom";
import axios from "axios";

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
        console.log(listBill)
    }

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


    useEffect(() => {
        getListBill();
        fetchData(currentPage);

    }, [currentPage])

// lấy id chi tiết
    const [creator, setCreator] = useState('')
    const [table, setTable] = useState('')
    const [content, setContent] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [price, setPrice] = useState('')


    function handleShowModal(id, tableBill, contentBill,  priceDetailBill,phoneNumberBill, nameCreator) {
        setCreator(nameCreator);
        setTable(tableBill);
        setContent(contentBill);
        setPhoneNumber(phoneNumberBill);
        setPrice(priceDetailBill);
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
                                <th>Tên khách hàng</th>
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
                                        <td>{bills.employee.salary}</td>

                                        <td>
                                            <button type="button" className="btn btn-light" data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop" onClick={() =>
                                                handleShowModal(
                                                    bills.feedback.creator,
                                                    bills.tableCoffee.nameTable,
                                                    bills.feedback.content,
                                                    bills.billDetail.quantityOfProduct,
                                                    bills.employee.phoneNumber
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
                    {/*Phân trang*/}
                    <nav
                        aria-label="Page navigation example"
                        className="d-flex justify-content-center"
                    >
                        <ul className="pagination">
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    style={{
                                        border: "none",
                                        backgroundColor: "#daeae9",
                                        color: "#1d1d1c"
                                    }}
                                >
                                    Trước
                                </a>
                            </li>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    style={{
                                        border: "none",
                                        backgroundColor: "#daeae9",
                                        color: "#1d1d1c"
                                    }}
                                >
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    style={{
                                        border: "none",
                                        backgroundColor: "#daeae9",
                                        color: "#1d1d1c"
                                    }}
                                >
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    style={{
                                        border: "none",
                                        backgroundColor: "#daeae9",
                                        color: "#1d1d1c"
                                    }}
                                >
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    style={{
                                        border: "none",
                                        backgroundColor: "#daeae9",
                                        color: "#1d1d1c"
                                    }}
                                >
                                    Sau
                                </a>
                            </li>
                        </ul>
                    </nav>
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
                                            Tên khách hàng: <strong>{creator}</strong>
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
                                            Tổng tiền: <strong>{price} VND</strong>
                                        </p>
                                        <p className="text-muted">
                                            Email: <strong>daupkaiemckuatung@gmail.com</strong>
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

        </div>
    );
}


export default List;

