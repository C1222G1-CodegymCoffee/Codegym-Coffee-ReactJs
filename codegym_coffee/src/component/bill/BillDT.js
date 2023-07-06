import React, {useEffect, useState} from "react";
import * as BillDTService from "../../service/bill/BillDTService";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {useNavigate} from "react-router";


export const BillDT = () => {
    const [listBillDT, setListBillDT] = useState([])
    // const [BillDT, setBillDT] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        displayBillDetail()
    }, [])


    const displayBillDetail = async () => {
        const res = await BillDTService.findBillDT()

        setListBillDT(res)
    }
    const handlePay = async () => {
        await Swal.fire({
            icon: 'success',
            title: 'Gọi thanh toán thành công',
            text: "Bạn có thể để lại phản hồi nếu cần, xin cảm ơn",
            showConfirmButton: false,
            timer: 5000
        })
    };

    return (
        <>
            <table
                className="table"
                style={{border: "none",marginTop:"120px"}}
            >
                <thead>
                <tr style={{background: "gainsboro", color: "white"}}>
                    <th className="content-title">STT</th>
                    <th className="content-title">Giá</th>
                    <th className="content-title">Số lượng</th>
                    <th className="content-title">Sản phẩm</th>
                </tr>
                </thead>
                <tbody>
                {
                listBillDT?.map((BillDT, index) => (
                    <tr key={index}>
                        <td className="content-bill" scope="row">
                            {index + 1}
                        </td>
                        <td className="content-bill">
                            {BillDT?.priceOfProduct}
                        </td>
                        <td className="content-bill">
                            {BillDT?.quantityOfProduct}
                        </td>
                        <td className="content-bill">
                            {BillDT?.product.nameProduct}
                        </td>
                    </tr>
                ))
                }
                </tbody>
                <Link to='/createFeedback/'>
                        <button onClick={() => handlePay()} className="btn btn-secondary" style={{color:"white"}}>
                            Thanh toán
                        </button>

                </Link>
            </table>
        </>
    )
}
