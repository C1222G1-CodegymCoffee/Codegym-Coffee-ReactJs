import {useEffect, useState} from "react";
import {getAllProduct, getAllTypeProduct} from "../../service/menu/MenuService";
import "../../css/Menu/menu.css"

let cart = [];

export function DisplayMenu() {
    const [listProduct, setListProduct] = useState([])
    const [listTypeProduct, setListTypeProduct] = useState([])
    const displayListProduct = async () => {
        const res = await getAllProduct();
        setListProduct(res);
    }
    const displayTypeProduct = async () => {
        const res = await getAllTypeProduct()
        setListTypeProduct(res)
    }

    const handleDisplayCart = () => {
        document.getElementById("showCart").style.display = "none"
    }
    const showCart = () => {
        let display = document.getElementById("showCart")
        if (display.style.display === " block") {
            display.style.display = " none"
        } else {
            display.style.display = " block"
        }
    }
    const addToCart = (element) => {
        // let father = element.parentElement.children
        // let image = father[0];
        console.log(element)
    }
    useEffect(() => {
        displayListProduct()
        displayTypeProduct()
        handleDisplayCart()
    }, [])


    return (
        <>
            {
                listProduct.map(value => {
                    return (
                        <div className="card" style={{width: "18rem"}} key={value}>
                            <img src={value.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{value.nameProduct}</h5>
                                <p className="card-text">{value.price} đ</p>
                                <a onClick={() => addToCart(this)} className="btn btn-primary">Add</a>
                            </div>
                        </div>
                    )
                })
            }

            <div>
                <i className="fa-solid fa-list" onClick={() => showCart()}/>
            </div>
            <div id="showCart">
                <table>
                    <thead>
                    <tr>
                        <th>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="checkbox-all"/>
                            </div>
                        </th>
                        <th className="">STT</th>
                        <th>Tên món</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng tiền</th>
                        <th>Thời gian chờ</th>
                    </tr>
                    </thead>
                    <tbody id="myCart">
                    <tr>
                        <td>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" name="courseIds[]"/>
                            </div>
                        </td>
                        <td>1</td>
                        <td>Cà phê</td>
                        <td>2</td>
                        <td>1000</td>
                        <td>10000</td>
                        <td>05:05</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}