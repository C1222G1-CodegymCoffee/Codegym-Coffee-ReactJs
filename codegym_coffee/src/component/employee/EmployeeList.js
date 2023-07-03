import React, {useEffect, useRef, useState} from "react";
import {employeeService, getEmployees} from "../service/EmployeeService";
import {Field, Form, Formik} from "formik";
import "../../css/Employee/employee.css"
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {Axios as axios} from "axios";

export function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [data, setData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEmployee = employeeList?.slice(startIndex, endIndex);
    const pageSize = 10;

    const findAll = async () => {
        const res = await employeeService.findAll()
        console.log(res)
        setEmployeeList(res.content)
    }
    useEffect(() => {
        findAll()
    }, [])
    let state = {
        pagedResponse: {},
        users: [],
        showLoading: false
    };
    const getListEmployee = async () => {
        const listEmployee = await employeeService.getEmployees(currentPage, pageSize);
        setTotalPage(listEmployee.totalPages)
        setEmployeeList(listEmployee.content);
    }

    function handleClickPage(page) {
        setCurrentPage(page.selected)
    }

    function handleChangePage(pageable) {
        if (currentPage + 1 === totalPage && pageable.isNext === true) return false
        if (pageable.isNext === true) {
            setCurrentPage(pageable.selected + 1);
        } else {
            setCurrentPage(pageable.selected - 1);
        }
    }

    useEffect(() => {
        getListEmployee()
        fetchData(currentPage);
    }, [currentPage]);


    const fetchData = async (page) => {
        try {
            const result = await axios.get(`http://localhost:8080/home/admin/employee?page=${page}&size=${itemsPerPage}`);
            setData(result.data.content);
            setTotalPage(result.data.totalPages);
            setTotalElements(result.data.totalElements);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Formik initialValues={{nameSearch: ""}}
                    onSubmit={ async (values) => {
                        const res = await employeeService.findByName(values.nameSearch)
                        if (res.length === 0) {
                            alert("khong thay")
                        } else {
                            setEmployeeList(res.content)

                        }
                    }}>
                <Form style={{marginLeft: 150}}>
                    <div>
                        {/*<label htmlFor="username" className="label">*/}
                        {/*    Tên tài khoản:{" "}*/}
                        {/*</label>*/}
                        {/*<input*/}
                        {/*    id="username"*/}
                        {/*    name="username"*/}
                        {/*    className="inputEmployee form-control-sm"*/}
                        {/*    placeholder="Nhập tài khoản tìm kiếm"*/}
                        {/*/>*/}
                        <label htmlFor="name" className="label">
                            Họ và tên:
                        </label>
                        <Field
                            id="nameSearch"
                            name="nameSearch"
                            className="inputEmployee form-control-sm"
                            placeholder="Nhập họ và tên tìm kiếm"
                        />
                        {/*<label htmlFor="tel" className="label">*/}
                        {/*    Số điện thoại:{" "}*/}
                        {/*</label>*/}
                        {/*<input*/}
                        {/*    id="tel"*/}
                        {/*    name="tel"*/}
                        {/*    className="inputTel form-control-sm"*/}
                        {/*    placeholder="Nhập số điện thoại tìm kiếm"*/}
                        {/*/>*/}
                        <button className="btn btn-primary button-search" type="submit">
                            <i className="fa-solid fa-magnifying-glass "/>
                        </button>
                    </div>
                </Form>

            </Formik>

            <Link to={"/employee/addEmployee"}
                  className="btn btn-primary long-button"><i className="fa-solid fa-user-plus"></i></Link>
            <table className="table table-striped a tb">
                <thead className="table-danger">
                <tr>
                    <th>#</th>
                    <th>Tên tài khoản a</th>
                    <th>Họ và tên</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Giới tính</th>
                    <th>Ngày sinh</th>
                    <th>Lương</th>
                    <th>Vị trí</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>

                {
                    employeeList.map((employee, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{employee.account.nameAccount}</td>
                            <td>{employee.nameEmployee}</td>
                            <td>{employee.address}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.email}</td>
                            <td>{employee.gender ? "Nam" : "Nữ"}</td>
                            <td>{employee.dateOfBirth}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.position.name}</td>
                            <td>
                                <button className="btn btn-primary"><i className="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button className="btn btn-danger" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"><i
                                    className="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
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
                    pageRangeDisplayed={2} // Hiển thị 3 trang trên mỗi lần render
                    marginPagesDisplayed={1} // Hiển thị 1 trang ở đầu và cuối danh sách trang
                />
            </div>

        </>

    )
}