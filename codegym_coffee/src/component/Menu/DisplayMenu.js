import React, {useEffect, useState} from "react";
import {addToBill, getAllProduct, getAllProductByType, getAllTypeProduct} from "../../service/menu/MenuService";
import "../../css/Menu/menu.css"

export function DisplayMenu() {

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [listProduct, setListProduct] = useState([])
    const [listTypeProduct, setListTypeProduct] = useState([])
    const [isActive, setIsActive] = useState(false);
    const [count, setCount] = useState(0);

    const openShopping = () => {
        setIsActive(true);
    };

    const closeShopping = () => {
        setIsActive(false);
    };

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
        if (updatedItems[index].quantityOfProduct = 1) {
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
            <div className={`container_menu ${isActive ? 'active' : ''}`}>
                <div className="header_menu">
                <div className="shopping_menu" onClick={openShopping}>
                    <img src="image/shopping.svg" alt="Shopping Cart"/>
                    {/*<span className="quantity span_menu">{count}</span>*/}
                </div>
                </div>
                <div className="list">
                    {
                        listProduct.map(value => {
                            return (
                                <div className="item" key={value}>
                                    <img className="img_list_menu" src={`/Homepage/${value.image}`}/>
                                    <div className="title_menu">{value.nameProduct}</div>
                                    <div className="price_menu">{value.price}</div>
                                    <button className="button_menu" onClick={() => addToCart({
                                        idProduct: value.idProduct,
                                        nameProduct: value.nameProduct,
                                        price: value.price,
                                        tableOfBill: 2
                                    })}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="card_menu">
                    <h1 className="h1_menu">Card</h1>
                    <ul className="listCard">
                        {items.map((item, index) => (
                            <li key={index} className="li_menu">
                                <div className="div_menu_card">
                                    <img className="img_card" src={item.image}/>
                                </div>
                                <div>{item.nameProduct}</div>
                                <div className="div_menu_card">{item.price}</div>
                                <div className="div_menu_card">
                                    <button className="button_card" onClick={() => decreaseQuantity(index)}>-</button>
                                    <div className="count">{item.quantityOfProduct}</div>
                                    <button className="button_card" onClick={() => increaseQuantity(index)}>+</button>
                                    <button className="button_card" onClick={()=>removeFromCart(index)}>X</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="checkOut">
                        <div className="total div_menu">{total}</div>
                        <div className="closeShopping div_menu" onClick={closeShopping}>Close</div>
                        <button onClick={() => handleAddToBill(items)}>Thanh toán</button>
                    </div>
                </div>
            </div>
        </>
    );
}