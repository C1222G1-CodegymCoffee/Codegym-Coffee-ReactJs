import React, { useState } from 'react';
import "../../css/Menu/menu.css"

const products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 120000
    }
];

 export const Menu = () => {
    const [listCards, setListCards] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const addToCard = (key) => {
        if (listCards[key] == null) {
            // copy product form list to list card
            listCards[key] = { ...products[key], quantity: 1 };
        }
        reloadCard();
    };

    const reloadCard = () => {
        let newCount = 0;
        let newTotalPrice = 0;

        listCards.forEach((value) => {
            if (value != null) {
                newTotalPrice += value.price;
                newCount += value.quantity;
            }
        });

        setCount(newCount);
        setTotalPrice(newTotalPrice);
    };

    const changeQuantity = (key, quantity) => {
        if (quantity === 0) {
            delete listCards[key];
        } else {
            listCards[key].quantity = quantity;
            listCards[key].price = quantity * products[key].price;
        }
        reloadCard();
    };

    const openShopping = () => {
        setIsActive(true);
    };

    const closeShopping = () => {
        setIsActive(false);
    };

    return (
        <div className={`container ${isActive ? 'active' : ''}`}>
            <header>
                <h1>Your Shopping Cart</h1>
                <div className="shopping" onClick={openShopping}>
                    <img src="image/shopping.svg" className="img_menu" />
                    <span className="quantity">{count}</span>
                </div>
            </header>

            <div className="list">
                {products.map((value, key) => (
                    <div className="item" key={key}>
                        <img src={`image/${value.image}`} alt={value.name} />
                        <div className="title">{value.name}</div>
                        <div className="price">{value.price.toLocaleString()}</div>
                        <button onClick={() => addToCard(key)}>Add To Card</button>
                    </div>
                ))}
            </div>

            <div className="card">
                <h1>Card</h1>
                <ul className="listCard">
                    {listCards.map((value, key) => (
                        <li key={key}>
                            <div>
                                <img src={`image/${value.image}`} alt={value.name} />
                            </div>
                            <div>{value.name}</div>
                            <div>{value.price.toLocaleString()}</div>
                            <div>
                                <button onClick={() => changeQuantity(key, value.quantity - 1)}>-</button>
                                <div className="count">{value.quantity}</div>
                                <button onClick={() => changeQuantity(key, value.quantity + 1)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="checkOut">
                    <div className="total">{totalPrice.toLocaleString()}</div>
                    <div className="closeShopping" onClick={closeShopping}>Close</div>
                </div>
            </div>
        </div>
    );
};


