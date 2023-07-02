import "./sale.css";
import {useEffect, useState} from "react";
import axios from "axios";
import saleAPI from "../service_API/sale";

const positionStatus = {
    0: 'unavailable',
    1: 'available',
    2: 'sell',
};

export function Sale() {
    const [data, setData] = useState([]);
    const [seatList, setSeatList] = useState([]);
    const [listSelecting, setListSelecting] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await saleAPI.findAll();
                setSeatList(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const seatRows = ["T1", "T2", "T3", "T4", "T5"];

    const allSeatByRow = seatRows.map((rowLabel) => {
        let positions = [];
        positions = seatList
            .filter((seat) => seat.nameTable.startsWith(`${rowLabel}-`))
            .map((seat) => ({
                seatId: seat.idTable,
                status: seat.status,
                name: seat.nameTable,
            }));

        return {rowLabel, positions};
    });

    const handlerSelecting = async (seatId, status) => {
        if (status === 1) {
            setListSelecting((prevList) => {
                if (prevList.includes(seatId)) {
                    return prevList.filter((id) => id !== seatId);
                } else {
                    // Remove the previously selected seat
                    const filteredList = prevList.filter(
                        (id) => seatList.find((seat) => seat.idTable === id).status !== 1
                    );
                    return [...filteredList, seatId];
                }
            });

            try {
                const billDetails = await saleAPI.getBillDetails(seatId);
                console.log(billDetails);
                setData(billDetails);
            } catch (error) {
                console.error('Error fetching bill details:', error);
                // If the API request returns a 404 error, set the data to an empty array
                setData([]);
            }
        } else {
            // Clear the listSelecting state
            setListSelecting([]);
        }
    };
    console.log(seatList)
    console.log(data)

    return (
        <>
            <div className="container-lg">
                <div className="row mt-4">
                    <div className="col-12 col-md-7">
                        <div className="select-position-wrapper">
                            <h3 className="title text-center">Quản lý bán hàng</h3>
                            <div className="position-pick">
                                <div className="situations">
                                    {allSeatByRow.map((row) => (
                                        <div key={row.rowLabel} className="d-flex justify-content-around">
                                            <div className="row-label">{row.rowLabel}</div>
                                            <div className="row-positions d-flex">
                                                {row.positions.map((p) => (
                                                    <div
                                                        key={p.seatId}
                                                        className={`position-item ${positionStatus[p.status]} ${
                                                            listSelecting.includes(p.seatId) ? "selecting" : ""
                                                        }`}
                                                        onClick={() => handlerSelecting(p.seatId, p.status)}
                                                    >
                                                        {p.name.substring(3)}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="row-label">{row.rowLabel}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="position-info row d-flex justify-content-center">
                                    <div className="col-8 col-md-12 col-sm-12">
                                        <div className="row">
                                            <div
                                                className="col-12 col-md-4 col-sm-6 d-flex align-items-center justify-content-center">
                                                <div className="sell label"/>
                                                <span>Bàn đang được chọn</span>
                                            </div>
                                            <div
                                                className="col-12 col-md-4 col-sm-6 d-flex align-items-center justify-content-center">
                                                <div className="available label"/>
                                                <span>Bàn không có khách</span>
                                            </div>
                                            <div
                                                className="col-12 col-md-4 col-sm-6 d-flex align-items-center justify-content-center">
                                                <div className="selecting label"/>
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
                                style={{color: "white", marginBottom: 20}}
                            >
                                Quản lý bán hàng
                            </h3>
                            <table className="table table-bordered">
                                <tr style={{textAlign: "center", fontSize: 16}}>
                                    <th>STT</th>
                                    <th>Tên món</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Số bàn</th>
                                    <th>Tổng tiền</th>
                                </tr>
                                {
                                    data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} style={{textAlign: "center", fontSize: 16}}>
                                                Danh sách trống
                                            </td>
                                        </tr>
                                    ) : (
                                        data.map((dataList, index) => (
                                            <tr style={{textAlign: "center", fontSize: 16}} key={dataList.idBillDetail}>
                                                <td>{index + 1}</td>
                                                <td>{dataList.nameProduct}</td>
                                                <td>{dataList.quantityOfProduct}</td>
                                                <td>{dataList.price}đ</td>
                                                <td>{dataList.nameTable}</td>
                                                <td>{dataList.totalPrice}đ</td>
                                            </tr>
                                        ))
                                    )}
                                {data.map((dataList, index) => (
                                    index === 0 && (
                                        <tr style={{textAlign: "center", fontSize: 18}}>
                                            <td colSpan={6} style={{textAlign: "right", fontWeight: "bold"}}>
                                                Tổng cộng: <span
                                                style={{fontWeight: "normal"}}>{dataList.totalAmount}đ</span>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </table>
                            <div className="d-flex justify-content-center mt-4 mb-4 gap-2">
                                <div className="btn-group" role="group" style={{width: "100%"}}>
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