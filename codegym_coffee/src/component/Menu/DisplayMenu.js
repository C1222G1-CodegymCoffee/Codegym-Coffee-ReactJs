import React, {useEffect, useState} from "react";
import {
    addToBill,
    getAllProduct,
    getAllProductByType,
    getAllTypeProduct,
    getProductByName
} from "../../service/menu/MenuService";
import "../../css/Menu/menu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {Field, Formik} from "formik";

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
            console.log(item)
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
        if(updatedItems[index].quantityOfProduct == 1 ){
            removeFromCart(index)
        }
        else {
            updatedItems[index].quantityOfProduct -= 1;
            setItems(updatedItems);
        }
    };

    const calculateTotal = (cartItems) => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantityOfProduct, 0);
        setTotal(total);
    };
    const handleAddToBill = async (value) => {
        if(value.length == 0){
            toast("Mời chọn món")
        }else {
            await addToBill(value)
            toast("Đặt món thành công ")
            setItems([])
        }


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
            <div id="sidebar-menu-customer">
                <nav className="sidebar locked">
                    <div className="logo_items flex">
        {/*<span className="nav_image">*/}
        {/*</span>*/}
                        <span className="logo_name"></span>
                    </div>
                    <div className="menu_container">
                        <div className="menu_items">
                            <ul className="menu_item">
                                <li className="item">
                                    <a href="" className="link flex" onClick={() => displayListProduct()}>
                                        <i className="bx bx-grid-alt"></i>
                                        <span>Tất cả</span>
                                    </a>
                                </li>
                                {
                                    listTypeProduct.map(value => {
                                        return (
                                            <ul key={value}>
                                                <li className="item">
                                                    <a href="#" className="link flex"
                                                       onClick={() => handleDisplayByType(value.nameType)} name="type">
                                                        <i className="bx bx-home-alt"></i>
                                                        <span>{value.nameType}</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </nav>

                <nav className="navbar flex">
                    {/*<i className="bx bx-menu" id="sidebar-open"></i>*/}
                    <Formik initialValues={
                        {
                            nameProduct: ''
                        }
                    }
                            onSubmit={ async (values) => {
                                const res = await getProductByName(values.nameProduct)
                                setListProduct(res)
                            }}>
                        <div>
                            <Field name='nameProduct' type="text" placeholder="Search..." className="search_box"/>
                            <button type="submit">submit</button>
                        {/*    <span className="nav_image">*/}
                        {/*    <img as="submit" src="images/profile.jpg" alt="logo_img"/>*/}
                        {/*</span>*/}
                        </div>
                    </Formik>
                </nav>
            </div>

            <div id="cart-menu">
                <div className={`container_menu ${isActive ? 'active' : ''}`}>
                    <div className="header_menu">
                        <div className="shopping_menu" onClick={openShopping}>
                            {/*<FontAwesomeIcon icon={faShoppingCart} />*/}
                            <img src="/Homepage/shopping.svg" alt="Shopping Cart" className="img_menu"/>
                            <span className="span_menu">{count}</span>
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
                                            image: value.image,
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
                                        <img className="img_card" src={`/Homepage/${item.image}`}/>
                                    </div>
                                    <div>{item.nameProduct}</div>
                                    <div className="div_menu_card">{item.price}</div>
                                    <div className="div_menu_card">
                                        <button className="button_card" onClick={() => decreaseQuantity(index)}>-
                                        </button>
                                        <div className="count">{item.quantityOfProduct}</div>
                                        <button className="button_card" onClick={() => increaseQuantity(index)}>+
                                        </button>
                                        <button className="button_card" onClick={() => removeFromCart(index)}>X</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="checkOut">
                            <div className="total div_menu">{total}</div>
                            <div className="closeShopping div_menu" onClick={closeShopping}>Close</div>
                            <button onClick={() => handleAddToBill(items)}>Đặt món </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}