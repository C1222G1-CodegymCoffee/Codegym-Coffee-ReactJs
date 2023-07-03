import React, {useEffect, useState} from "react";
import {addToBill, getAllProduct, getAllProductByType, getAllTypeProduct} from "../../service/menu/MenuService";
import "../../css/Menu/menu.css"

export function DisplayMenu() {

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [listProduct, setListProduct] = useState([])
    const [listTypeProduct, setListTypeProduct] = useState([])

    const displayListProduct = async () => {
        const res = await getAllProduct()
        setListProduct(res);
    }
    const displayTypeProduct = async () => {
        const res = await getAllTypeProduct()
        setListTypeProduct(res)
    }
    const addToCart = (item) => {
        const existingItem = items.find((value) => value.idProduct === item.idProduct);
        if (existingItem) {
            const updatedItems = items.map((i) =>
                i.idProduct === item.idProduct ? {...i, quantityOfProduct: i.quantityOfProduct + 1} : i
            );
            setItems(updatedItems);
        } else {
            setItems([...items, {...item, quantityOfProduct: 1}]);
        }
    };

    const removeFromCart = (index) => {
        const updatedItems = [...items];
        const myTimeout = setTimeout(updatedItems.splice(index, 1), 1)
        clearTimeout(myTimeout)
        setItems(updatedItems);
    };

    const increaseQuantity = (index) => {
        const updatedItems = [...items];
        updatedItems[index].quantityOfProduct += 1;
        setItems(updatedItems);
    };

    const decreaseQuantity = (index) => {
        const updatedItems = [...items];
        if (updatedItems[index].quantityOfProduct > 1) {
            updatedItems[index].quantityOfProduct -= 1;
            setItems(updatedItems);
        }
    };

    const calculateTotal = (cartItems) => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantityOfProduct, 0);
        setTotal(total);
    };
    const handleAddToBill = async (value) => {
        console.log(value)
       await addToBill(value)
    }
    const handleDisplayByType = async (type) => {
        const res = await getAllProductByType(type)
        setListProduct(res)
    }

    useEffect(() => {
        displayTypeProduct()
        displayListProduct()
        const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        setItems(cartItems);
        calculateTotal(cartItems);
    }, []);

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(items));
        calculateTotal(items);
    }, [items]);
    return (
        <>
            {
                listTypeProduct.map(value => {
                    return (
                        <ul>
                            <button onClick={() => handleDisplayByType(value.nameType)} name="type">
                                {value.nameType}
                            </button>
                        </ul>
                    )
                })
            }
            <div>
                {
                    listProduct.map(value => {
                        return (
                            <div className="card" style={{width: "18rem"}} key={value}>
                                <img src={`/Homepage/${value.image}`} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{value.nameProduct}</h5>
                                    <p className="card-text">{value.price} đ</p>
                                    <button onClick={() => addToCart({
                                        idProduct: value.idProduct,
                                        nameProduct: value.nameProduct,
                                        price: value.price,
                                        tableOfBill:2
                                    })}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                <h1>Giỏ hàng</h1>
                <table>
                    <thead>
                    <tr>
                        <th className="">STT</th>
                        <th>Tên món</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thời gian chờ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.nameProduct} </td>
                                <td>
                                    <button onClick={() => decreaseQuantity(index)}>-</button>
                                    {item.quantityOfProduct}
                                    <button onClick={() => increaseQuantity(index)}>+</button>
                                </td>
                                <td>{item.price}</td>
                                <td></td>
                                <button onClick={() => removeFromCart(index)}>Xóa</button>
                            </tr>
                        ))}
                    <tr>
                        <div><h3>Tổng cộng: {total} đ</h3></div>
                    </tr>
                    <tr>
                        <button onClick={() => handleAddToBill(items)}>Thanh toán</button>
                    </tr>
                    </tbody>
                </table>

            </div>
        </>
    );
}