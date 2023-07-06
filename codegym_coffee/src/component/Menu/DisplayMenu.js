import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "../../css/Menu/menu.css";
import Swal from "sweetalert2"

import {
  addToBill,
  getAllProduct,
  getAllProductByType,
  getAllTypeProduct,
  getProductByName,
} from "../../service/menu/MenuService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "../../utils";
import {Link} from "react-router-dom";

export function DisplayMenu() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [listTypeProduct, setListTypeProduct] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const openShopping = () => {
    setIsActive(true);
  };

  const closeShopping = () => {
    setIsActive(false);
  };

  const displayListProduct = async () => {
    const res = await getAllProduct();
    setListProduct(res);
  };
  const displayTypeProduct = async () => {
    const res = await getAllTypeProduct();
    setListTypeProduct(res);
  };
  const addToCart = (item) => {
    const existingItem = items.find(
      (value) => value.idProduct === item.idProduct
    );
    if (existingItem) {
      const updatedItems = items.map((i) =>
        i.idProduct === item.idProduct
          ? { ...i, quantityOfProduct: i.quantityOfProduct + 1 }
          : i
      );
      setItems(updatedItems);
    } else {
      setItems([...items, { ...item, quantityOfProduct: 1 }]);
    }
    Swal.fire({
      icon: 'success',
      title: 'Thêm món thành công',
      showConfirmButton: false,
      timer: 1000
    })
  };

  const removeFromCart = (index) => {
    const updatedItems = [...items];
    const myTimeout = setTimeout(updatedItems.splice(index, 1), 1);
    clearTimeout(myTimeout);
    setItems(updatedItems);
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantityOfProduct += 1;
    setItems(updatedItems);
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantityOfProduct == 1) {
      removeFromCart(index);
    } else {
      updatedItems[index].quantityOfProduct -= 1;
      setItems(updatedItems);
    }
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantityOfProduct,
      0
    );
    setTotal(total);
  };
  const handleAddToBill = async (value) => {
      await addToBill(value);
      Swal.fire({
        icon: 'success',
        title: 'Đặt món thành công',
        text: "Vui lòng đợi món từ 10 đến 12 phút",
        showConfirmButton: false,
        timer: 5000
      })
      sessionStorage.removeItem("cartItems");
      navigate("/billDetail");
  };
  const handleDisplayByType = async (type) => {
    const res = await getAllProductByType(type);
    setListProduct(res);
  };

  useEffect(() => {
    displayTypeProduct();
    displayListProduct();
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setItems(cartItems);
    calculateTotal(cartItems);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(items));
    calculateTotal(items);
  }, [items]);
  return (
    <div id="displayMenu">
      <div className="inner">
        <div className="header_menu">
          {!sessionStorage.getItem("TOKEN") && (
          <div className="shopping_menu" onClick={openShopping}>
            <img
              src="/Homepage/shopping.svg"
              alt="Shopping Cart"
              className="img_menu"
            />
            <span className="span_menu">{items?.length ?? 0}</span>
          </div>)}
          {sessionStorage.getItem("ROLES") ===  "ROLE_ADMIN"&& (
              <div className="shopping_menu">
                <Link to="/createProduct">
                  <button style={{border: "none", width: 120, backgroundColor: "#FFF2D9",height: "40px",
                    borderRadius: "8px"}}>
                    Thêm mới
                  </button>
                </Link>
              </div>
          )}

        </div>
        <div id="sidebar-menu-customer">
          <nav className="sidebar locked">
            <div className="logo_items flex">
              <span className="logo_name"></span>
            </div>
            <div className="menu_container">
              <div className="menu_items">
                <ul className="menu_item">
                  <li className="item">
                    <a
                      href=""
                      className="link flex"
                      onClick={() => displayListProduct()}
                    >
                      <i className="bx bx-grid-alt"></i>
                      <span>Tất cả</span>
                    </a>
                  </li>
                  {listTypeProduct.map((value) => {
                    return (
                      <li className="item" key={value}>
                        <a
                          href="#"
                          className="link flex"
                          onClick={() => handleDisplayByType(value.nameType)}
                          //   name="type"
                        >
                          <i className="bx bx-home-alt"></i>
                          <span>{value.nameType}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>

          <nav className="navbar d-flex">
            <Formik
              initialValues={{
                nameProduct: "",
              }}
              onSubmit={async (values) => {
                const res = await getProductByName(values.nameProduct);
                setListProduct(res);
              }}
            >
              <Form>
                <div className="d-flex">
                  <Field
                    name="nameProduct"
                    type="text"
                    placeholder="Tên sản phẩm..."
                    className="search_box"
                  />
                  <button className="btn btn-submit" type="submit">
                    <FontAwesomeIcon icon={faSearch} size="2xl" />
                  </button>
                </div>
              </Form>
            </Formik>
          </nav>
        </div>
        <div id="cart-menu">
          <div className={`container_menu ${isActive ? "active" : ""}`}>
            <div className="list">
              {listProduct.map((value) => {
                return (
                  <div className="item" key={value}>
                    <img className="img_list_menu" src={value.image} />
                    <div className="title_menu">{value.nameProduct}</div>
                    <div className="price_menu">{formatPrice(value.price)}</div>
                    {!sessionStorage.getItem("TOKEN") && (
                    <button
                      className="button_menu"
                      onClick={() =>
                        addToCart({
                          idProduct: value.idProduct,
                          nameProduct: value.nameProduct,
                          price: value.price,
                          image: value.image,
                        })
                      }
                    >
                      Thêm vào giỏ hàng
                    </button>)}
                    {sessionStorage.getItem("ROLES") ===  "ROLE_ADMIN"&& (
                        <Link to={'/editProduct/' + value.idProduct}>
                          <button className="btn btn-light" style={{border: "none"}}>
                            Chỉnh sửa
                          </button>
                        </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="card_menu">
              <h1 className="h1_menu">Giỏ hàng</h1>
              <ul className="listCard">
                {items.map((item, index) => (
                  <li key={index} className="li_menu">
                    <div className="div_menu_card">
                      <img className="img_card" src={item.image} />
                    </div>
                    <div
                      style={{
                        margin: "4px 98px 4px 10px",
                      }}
                    >
                      <div>{item.nameProduct}</div>
                      <div>{formatPrice(item.price)}</div>
                    </div>
                    <div className="div_menu_card">
                      <button
                        className="button_card"
                        onClick={() => decreaseQuantity(index)}
                      >
                        <span>-</span>
                      </button>
                      <div className="count">{item.quantityOfProduct}</div>
                      <button
                        className="button_card"
                        onClick={() => increaseQuantity(index)}
                      >
                        <span>+</span>
                      </button>
                      <button
                        className="btn-remove-from-cart"
                        onClick={() => removeFromCart(index)}
                      >
                        <span>xóa</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="checkOut">
                <div className="total div_menu d-flex">
                  <div className="col-6 text-center">Tổng tiền:</div>
                  <div className="col-6 text-center">{formatPrice(total)}</div>
                </div>
                <div className="d-flex">
                  <button
                    className="btn-order col-6"
                    disabled={items.length === 0}
                    onClick={() => handleAddToBill(items)}
                  >
                    Đặt món{" "}
                  </button>
                  <div
                    className="closeShopping div_menu"
                    onClick={closeShopping}
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
