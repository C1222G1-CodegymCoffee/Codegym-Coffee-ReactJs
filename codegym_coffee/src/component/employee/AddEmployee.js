import React, {useEffect, useState} from "react";
import {employeeService} from "../service/EmployeeService";
import {Field, Form, Formik} from "formik";
import "../../css/Employee/createEmployee.css"
import {useNavigate} from "react-router";
import {accountService} from "../service/AccountService";


export function AddEmployee() {
    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();


    const findAllPosition = async () => {
        const res = await employeeService.findAllPosition();
        setPositions(res);
    }
    const [gender, setGender] = useState(false);

    const handleGenderChange = (event) => {
        setGender(event.target.value === "true");
    };
    useEffect(() => {
        findAllPosition()
    }, [])

    return (
        <>
            <h1 className="tx">Thêm mới</h1>
            <div className="form-box ">

                <Formik initialValues={{
                    nameEmployee: "",
                    gender: false,
                    dateOfBirth: "",
                    salary: 0,
                    image: "",
                    address: "",
                    phoneNumber: "",
                    email: "",
                    position: {
                        idPosition: ""
                    },
                    account: {
                        nameAccount: ""

                    },
                }}
                        onSubmit={values => {
                            employeeService.addEmployee(values);
                            navigate("/employee")
                        }}>
                    <Form>
                        <>
                            <div className="form-group">
                                <label htmlFor="image">
                                    Hình Ảnh <span style={{color: "red"}}>*</span>:
                                </label>
                                <Field type="file" name="image" id="image" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="account.idAccount">
                                    Tên tài khoản <span style={{color: "red"}}>*</span>:
                                </label>
                                <Field type="text" id="account.nameAccount" name="account.nameAccount" placeholder={"Nhập tên tài khoản"}/>


                            </div>
                            <div className="form-group">
                                <label htmlFor="nameEmployee">
                                    Họ và tên <span style={{color: "red"}}>*</span>:
                                </label>
                                <Field
                                    type="text"
                                    id="nameEmployee"
                                    name="nameEmployee"
                                    required=""
                                    placeholder="Nhập tên"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateOfBirth">Ngày sinh:</label>
                                <Field
                                    type="date"
                                    className="form-control"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                />
                            </div>
                            <div className="radio-container">
                                <label htmlFor="gender">Giới tính:</label>
                                <Field
                                    id="female"
                                    name="gender"
                                    type="radio"
                                    value={false}
                                    checked={!gender}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="female">Nữ</label>
                                <Field
                                    id="male"
                                    name="gender"
                                    type="radio"
                                    value={true}
                                    checked={gender}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="male">Nam</label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email<span style={{color: "red"}}>*</span>:
                                </label>
                                <Field
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Nhập email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">
                                    Số điện thoại <span style={{color: "red"}}>*</span> :
                                </label>
                                <Field
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">
                                    Địa chỉ <span style={{color: "red"}}>*</span>:
                                </label>
                                <Field
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Nhập địa chỉ"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">
                                    Vai trò <span style={{color: "red"}}>*</span>:
                                </label>
                                <Field as="select" id="position.idPosition" name="position.idPosition" type="number">
                                    {
                                        positions.map((position, index) => (
                                            <option key={index}
                                                    value={parseInt(position.idPosition)}>{position.name}</option>
                                        ))
                                    }
                                </Field>

                            </div>

                            <div className="form-group">
                                <label htmlFor="salary">
                                    Lương(VND)<span style={{color: "red"}}>*</span>:
                                </label>
                                <Field
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    required=""
                                    placeholder="Nhập lương"
                                />
                            </div>
                            <div className="" style={{textAlign: "center"}}>
                                <a className="cancel-button"
                                   href="http://localhost:63342/test3/Employee/EmployeeList.html?_ijt=qqneg3ci2a1k7en0rj360tbhbe"
                                   type="submit"
                                >
                                    Quay về
                                </a>
                                <button type="submit" className="button-submit">
                                    Thêm mới
                                </button>
                            </div>
                        </>

                    </Form>
                </Formik>
            </div>

        </>

    )
}