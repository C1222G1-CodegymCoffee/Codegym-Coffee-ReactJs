import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import saleAPI from "../service_API/sale";
import "./sale.css";

const positionStatus = {
  0: "available",
  1: "unavailable",
};

export function Sale() {
  const [data, setData] = useState([]);
  const [seatList, setSeatList] = useState([]);
  const [listSelecting, setListSelecting] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [billId, setBillId] = useState();

  const fetchData = async () => {
    try {
      const result = await saleAPI.findAll();
      setSeatList(result ?? []);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {

    fetchData();
  }, [paymentSuccess]);

  const seatRows = ["T1", "T2", "T3", "T4", "T5"];

  const allSeatByRow = seatRows.map((rowLabel) => {
    let positions = [];
    positions = (seatList ?? [])
      .filter((seat) => seat.nameTable.startsWith(`${rowLabel}-`))
      .map((seat) => ({
        seatId: seat.idTable,
        status: seat.status,
        name: seat.nameTable,
      }));

    return { rowLabel, positions };
  });

  const handlerSelecting = async (seatId, status) => {
    if (status === 1) {
      setListSelecting((prevList) => {
        if (prevList.includes(seatId)) {
          return prevList.filter((id) => id !== seatId);
        } else {
          const filteredList = prevList.filter(
            (id) => seatList.find((seat) => seat.idTable === id).status !== 1
          );
          return [...filteredList, seatId];
        }
      });

      try {
        const billData = await saleAPI.getBillDetails(seatId);
        setData(billData.billDetailDTOS);
        setBillId(billData.billId);
      } catch (error) {
        console.error("Error fetching bill details:", error);
        setData([]);
      }
    } else {
      setListSelecting([]);
      setData([]);
    }
  };

  const handleUpdateSale = async () => {
    if (billId && listSelecting.length > 0) {
      try {
        await saleAPI.updateSale(billId);
        // Fetch updated seat data
        const result = await saleAPI.findAll();
        setSeatList(result);

        // Set paymentSuccess to true
        setPaymentSuccess(true);
        setShowPaymentSuccess(true); // Show the success message

        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      } catch (error) {
        console.error("Error updating sale:", error);
      }
    } else {
      console.log("No seat selected for payment.");
    }
  };

  const handleCancelPayment = async () => {
    setShowModal(false);
  };

  return (
    <div id="salePage">
      <div className="container-lg">
        <div className="row mt-4">
          <div className="col-12 col-md-7">
            <div className="select-position-wrapper">
              <h3 className="title text-center">Quản lý bán hàng</h3>
              <div className="position-pick">
                <div className="situations">
                  {allSeatByRow.map((row) => (
                    <div
                      key={row.rowLabel}
                      className="d-flex justify-content-around"
                    >
                      <div className="row-label">{row.rowLabel}</div>
                      <div className="row-positions d-flex">
                        {row.positions.map((p) => (
                          <div
                            key={p.seatId}
                            className={`position-item ${
                              positionStatus[p.status]
                            } ${
                              listSelecting.includes(p.seatId)
                                ? "selecting"
                                : ""
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
            <div className="sale-info">
              <h3 className="title text-center">Quản lý bán hàng</h3>
              <table className="table table-bordered">
                <tr style={{ textAlign: "center", fontSize: 16 }}>
                  <th>STT</th>
                  <th>Tên món</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Số bàn</th>
                  <th>Tổng tiền</th>
                </tr>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", fontSize: 16 }}
                    >
                      Danh sách trống
                    </td>
                  </tr>
                ) : (
                  data.map((dataList, index) => (
                    <tr
                      style={{ textAlign: "center", fontSize: 16 }}
                      key={dataList.idBillDetail}
                    >
                      <td>{index + 1}</td>
                      <td>{dataList.nameProduct}</td>
                      <td>{dataList.quantityOfProduct}</td>
                      <td>{dataList.price}đ</td>
                      <td>{dataList.nameTable}</td>
                      <td>{dataList.totalPrice}đ</td>
                    </tr>
                  ))
                )}
                {data.map(
                  (dataList, index) =>
                    index === 0 && (
                      <tr
                        style={{ textAlign: "center", fontSize: 18 }}
                        key={dataList.idBillDetail}
                      >
                        <td
                          colSpan={6}
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          Tổng cộng:{" "}
                          <span style={{ fontWeight: "normal" }}>
                            {dataList.totalAmount}đ
                          </span>
                        </td>
                      </tr>
                    )
                )}
              </table>
              <div className="d-flex justify-content-center mt-4 mb-4 gap-2">
                <div
                  className="btn-group"
                  role="group"
                  style={{ width: "100%" }}
                >
                  <button
                    className="btn"
                    type="button"
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 5,
                      padding: "4pt 10pt",
                      background: "#007bff",
                      borderColor: "#007bff",
                      color: "white",
                      marginRight: "3%",
                      width: "23%",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                    data-text="Tính tiền"
                    onClick={() => setShowModal(true)}
                    disabled={data.length === 0}
                  />
                  <Modal
                    isOpen={showModal}
                    toggle={handleCancelPayment}
                    className="modal-dialog-centered"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Thanh toán</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={handleCancelPayment}
                        />
                      </div>
                      <div className="modal-body">
                        <p>Bạn có xác nhận thanh toán không ?</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-primary"
                          onClick={handleUpdateSale}
                        >
                          Xác nhận
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={handleCancelPayment}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  </Modal>
                  <Modal
                    isOpen={showPaymentSuccess}
                    toggle={() => setShowPaymentSuccess(false)}
                    className="modal-dialog-centered"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Thông báo</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowPaymentSuccess(false)}
                        />
                      </div>
                      <div className="modal-body">
                        <p>Bạn đã tính tiền thành công</p>
                      </div>
                    </div>
                  </Modal>
                  <Link
                    to={"/"}
                    className="btn"
                    type="button"
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 5,
                      padding: "4pt 10pt",
                      background: "#6c757d",
                      borderColor: "#6c757d",
                      color: "white",
                      width: "18%",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                    data-text="Quay về"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
