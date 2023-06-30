import React, {useEffect, useState} from "react";
import {employeeService} from "../service/EmployeeService";
import {Field, Form, Formik} from "formik";
import "../../css/Employee/employee.css"
import {Link} from "react-router-dom";

export function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([])
    const findAll = async () => {
        const res = await employeeService.findAll()
        console.log(res)
        setEmployeeList(res.content)
    }
    useEffect(() => {
        findAll()
    }, [])


    return (
        <>
            {/*<Formik initialValues={} onSubmit={}>*/}
            {/*    <Form>*/}
            {/*        <div>*/}
            {/*            <label>Họ và tên</label>*/}
            {/*            <Field/>*/}
            {/*        </div>*/}
            {/*    </Form>*/}
            {/*</Formik>*/}
            <Link to={"/employee/addEmployee"}
                className="btn btn-primary long-button"><i className="fa-solid fa-user-plus"/></Link>
            <table className="table table-striped  tb">
                <thead className="table-danger">
                <tr>
                    <th>#</th>
                    <th>Tên tài khoản</th>
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
        </>

    )
}