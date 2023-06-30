import "./sale.css";
import {useEffect, useState} from "react";
import axios from "axios";
import saleAPI from "../service_API/sale";
const positionStatus = {
    0: 'unavailable',
    1: 'available',
    2: 'sell',
};
const seatRows = ["T1", "T2", "T3", "T4", "T5"];
export function Sale() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/sale/list")
            .then(response => {
                console.log(response);
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching API:", error);
            });
    }, []);
    useEffect(() => {
        const listSale= ()=> {
            const result = saleAPI.findAll();
            setData(result.data)
        }
        listSale()
    },[])

    console.log(data)
    return (
        <>
            <div className="container-lg">
                <div className="row mt-4">
                    <div className="col-12 col-md-7">
                        <div className="select-position-wrapper">
                            <h3 className="title text-center">Quản lý bán hàng</h3>
                            <div className="position-pick">
                                <div className="situations" />
                                <div className="position-info row d-flex justify-content-center">
                                    <div className="col-8 col-md-12 col-sm-12">
                                        <div className="row">
                                            <div className="col-12 col-md-4 col-sm-6 d-flex align-items-center justify-content-center">
                                                <div className="sell label" />
                                                <span>Bàn đang được chọn</span>
                                            </div>
                                            <div className="col-12 col-md-4 col-sm-6 d-flex align-items-center justify-content-center">
                                                <div className="available label" />
                                                <span>Bàn không có khách</span>
                                            </div>
                                            <div className="col-12 col-md-4 col-sm-6 d-flex align-items-center justify-content-center">
                                                <div className="selecting label" />
                                                <span>Bàn đang hoạt động</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-5">
                        <div className="film-info">
                            <h3
                                className="title text-center"
                                style={{ color: "white", marginBottom: 20 }}
                            >
                                Quản lý bán hàng
                            </h3>
                            <table className="table table-bordered">
                                <tbody>
                                <tr style={{ textAlign: "center", fontSize: 16 }}>
                                    <th>STT</th>
                                    <th>Tên món</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Số bàn</th>
                                    <th>Tổng tiền</th>
                                </tr>
                                <tr style={{ textAlign: "center", fontSize: 16 }}>
                                    <td>01</td>
                                    <td>Cà phê đen</td>
                                    <td>02</td>
                                    <td>
                                        15,000 <span>VNĐ</span>
                                    </td>
                                    <td>T1-01</td>
                                    <td>
                                        30,000 <span>VNĐ</span>
                                    </td>
                                </tr>
                                <tr style={{ textAlign: "center", fontSize: 16 }}>
                                    <td>02</td>
                                    <td>Cà phê sữa</td>
                                    <td>02</td>
                                    <td>
                                        15,000 <span>VNĐ</span>
                                    </td>
                                    <td>T1-01</td>
                                    <td>
                                        30,000 <span>VNĐ</span>
                                    </td>
                                </tr>
                                <tr style={{ textAlign: "center", fontSize: 18 }}>
                                    <td
                                        colSpan={6}
                                        style={{ textAlign: "right", fontWeight: "bold" }}
                                    >
                                        Tổng cộng:{" "}
                                        <span style={{ fontWeight: "normal" }}>60,000 VNĐ</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center mt-4 mb-4 gap-2">
                                <div className="btn-group" role="group" style={{ width: "100%" }}>
                                    <button
                                        className="btn"
                                        type="button"
                                        style={{
                                            justifyContent: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: 10,
                                            height: 35,
                                            background: "#007bff",
                                            color: "white",
                                            marginRight: "3%",
                                            width: "23%",
                                            fontSize: 16
                                        }}
                                        data-text="Tính tiền"
                                    />
                                    <button
                                        className="btn"
                                        type="button"
                                        style={{
                                            justifyContent: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: 10,
                                            height: 35,
                                            background: "#28a745",
                                            color: "white",
                                            marginRight: "3%",
                                            width: "30%",
                                            fontSize: 16
                                        }}
                                        data-text="Làm mới bàn"
                                    />
                                    <button
                                        className="btn"
                                        type="button"
                                        style={{
                                            justifyContent: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: 10,
                                            height: 35,
                                            background: "#dc3545",
                                            color: "white",
                                            width: "18%",
                                            marginRight: "3%",
                                            fontSize: 16
                                        }}
                                        data-text="Hóa đơn"
                                    />
                                    <button
                                        className="btn"
                                        type="button"
                                        style={{
                                            justifyContent: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: 10,
                                            height: 35,
                                            background: "#6c757d",
                                            color: "white",
                                            width: "18%",
                                            fontSize: 16
                                        }}
                                        data-text="Quay về"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
