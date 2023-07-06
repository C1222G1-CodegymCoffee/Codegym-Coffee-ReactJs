import React, {useEffect, useState} from "react";
import {employeeService, getEmployees} from "../service/EmployeeService";
import {Field, Form, Formik} from "formik";
import "../../css/Employee/employee.css";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import AdminLayout from "../../layout/AdminLayout";
import moment from "moment";

export function EmployeeList() {
    const [employeeList, setEmployeeList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const pageSize = 10;
    const [idDelete, setIdDelete] = useState(null);
    const [nameDelete, setNameDelete] = useState(null);

    const getProps = (id, name) => {
        setIdDelete(id);
        setNameDelete(name);
    };

    const getListEmployee = async () => {
        const listEmployee = await employeeService.getEmployees(
            currentPage,
            pageSize
        );
        setTotalPage(listEmployee.totalPages);
        setEmployeeList(listEmployee.content);
    };

    const handleDelete = async () => {
        await employeeService.deleteByIdEmployee(idDelete);
        getListEmployee();
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

    useEffect(() => {
        // getListEmployee()
        fetchData(0);
    }, []);

    useEffect(() => {
        // getListEmployee()
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        try {
            const result = await getEmployees(page);
            setTotalPage(result.totalPages);
            setEmployeeList(result.content);
        } catch (error) {
            console.log(error);
        }
    };

    if (!employeeList) {
        return null;
    }

    return (
        <div id="employeePage">
            <div className="container">
                <div className="element">
                    <div className="">
                        <h2 className="text-center">DANH SÁCH NHÂN VIÊN</h2>
                        <br/>
                    </div>
                    <div className="row">
                        <div className="col-md-1"/>
                        <div className="col-md-10">
                            <div className="table-responsive">
                                <Formik
                                    initialValues={{
                                        nameAccount: "",
                                        nameSearch: "",
                                        phoneNumber: "",
                                    }}
                                    onSubmit={async (values) => {
                                        console.log('values: ' + JSON.stringify(values))
                                        const res = await employeeService.findByEmployee(
                                            values.nameSearch,
                                            values.nameAccount,
                                            values.phoneNumber
                                        );
                                        if (res.length === 0) {
                                            alert("khong thay");
                                        } else {
                                            setEmployeeList(res.content);
                                        }
                                    }}
                                >
                                    <Form style={{marginLeft: 150}}>
                                        <div className="d-flex">
                                            <div className="form-group col-3">
                                                {/* <label htmlFor="nameAccount" className="label">
                          Tên tài khoản:{" "}
                        </label> */}
                                                <Field
                                                    id="nameAccount"
                                                    name="nameAccount"
                                                    className="inputEmployee form-control-sm"
                                                    placeholder="Nhập tài khoản tìm kiếm"
                                                />
                                            </div>
                                            <div className="form-group col-3">
                                                {/* <label htmlFor="nameSearch" className="label">
                          Họ và tên:
                        </label> */}
                                                <Field
                                                    id="nameSearch"
                                                    name="nameSearch"
                                                    className="inputEmployee form-control-sm"
                                                    placeholder="Nhập họ và tên tìm kiếm"
                                                />
                                            </div>
                                            <div className="form-group col-2 mx-8">
                                                {/* <label htmlFor="phoneNumber" className="label">
                          Số điện thoại:
                        </label> */}
                                                <Field
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    className="inputTel form-control-sm"
                                                    placeholder="Nhập số điện thoại tìm kiếm"
                                                />
                                            </div>
                                            <div className="col-2">
                                                <button className="btn-search" type="submit">
                                                    Tìm
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>

                        <div>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <Link
                                    to="/employee_create"
                                    className="btn btn-primary long-button"
                                >
                                    Thêm mới
                                </Link>
                            </div>

                            <table
                                className="table table-striped mt-3"
                                style={{border: "none"}}
                            >
                                <thead>
                                <tr style={{background: "gainsboro", color: "white"}}>
                                    <th className="content-title">#</th>
                                    <th className="content-title">Tên tài khoản</th>
                                    <th className="content-title">Họ và tên</th>
                                    <th className="content-title">Địa chỉ</th>
                                    <th className="content-title">Số điện thoại</th>
                                    <th className="content-title">Email</th>
                                    <th className="content-title">Giới tính</th>
                                    <th className="content-title">Ngày sinh</th>
                                    <th className="content-title">Lương</th>
                                    <th className="content-title">Vị trí</th>
                                    <th className="content-title">Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employeeList && employeeList.length > 0 ? (
                                    <>
                                        {employeeList.map((employee, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{employee.account.nameAccount}</td>
                                                <td>{employee.nameEmployee}</td>
                                                <td>{employee.address}</td>
                                                <td>{employee.phoneNumber}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.gender ? "Nam" : "Nữ"}</td>
                                                <td>
                                                    {moment(employee.dateOfBirth).format('DD-MM-YYYY')}</td>
                                                <td>{employee.salary}</td>
                                                <td>{employee.position?.name}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                        onClick={() =>
                                                            getProps(
                                                                employee.idEmployee,
                                                                employee.nameEmployee
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-regular fa-trash-can"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr className="text-center" >
                                        <td style={{color: "red"}} colSpan={11}>Không tìm thấy nhân viên</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" tabIndex={-1} id={"exampleModal"}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger">Bảng xóa khách hàng</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div>
                                Bạn có muốn xóa <h5 className={"text-danger"}>{nameDelete}</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Không
                            </button>
                            <button
                                type="button"
                                data-bs-dismiss="modal"
                                className="btn btn-danger"
                                onClick={() => handleDelete(idDelete)}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
                        pageRangeDisplayed={2} // Hiển thị 3 trang trên mỗi lần render
                        marginPagesDisplayed={1} // Hiển thị 1 trang ở đầu và cuối danh sách trang
                    />
                </div>
            )}
        </div>
    );
}
