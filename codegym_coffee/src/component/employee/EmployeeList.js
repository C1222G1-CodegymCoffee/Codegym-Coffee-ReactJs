import React, {useEffect, useState} from "react";
import {employeeService} from "../service/EmployeeService";

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
                            <td>{index+1}</td>
                            <td>{employee.account.nameAccount}</td>
                            <td>{employee.nameEmployee}</td>
                            <td>{employee.address}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.email}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.dateOfBirth}</td>
                            <td>{employee.salary}</td>
                        </tr>

                    ))
                }
                </tbody>
            </table>
        </>

    )
}