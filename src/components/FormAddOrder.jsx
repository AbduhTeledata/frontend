import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
//import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import TotalBayar from './TotalBayar';
// import swal from "sweetalert2";
// import { API_URL } from '../utils/constants';

const FormAddOrder = () => {
  const [inv_code, setInvCode] = useState("");
  const [qty, setQty] = useState("");
  const [sub_total, setSubTotal] = useState("");
  const [total_disc, setTotalDisc] = useState("");
  const [taxes, setTaxes] = useState("");
  const [total_price, setTotalPrice] = useState("");
  const [iscard, setIsCard] = useState("");
  const [productId, setProductId] = useState("");
  const [discountId, setDiscountId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [branchId, setBranchId] = useState("");

  const [msg, setMsg] = useState("");

  const [diskonMember, setDiskonMember] = useState("");
  const [diskonDp, setDiskonDp] = useState("");
  const [diskonPromo, setDiskonPromo] = useState("");
  
  const [products, setProducts] = useState([]);
  

  const navigate = useNavigate();
  
  let [cartList, setCartList] = useState([]);
  let [preTax, setPreTax] = useState(0.00);
  let [productSearch, setProductSearch] = useState("");
  let [toggle, setToggle] = useState("");
  const tax = .00;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const calculate = (tempCart) => {
        let tempPreTax = 0;
        // let disc = 10000;
        for (let i = 0; i < tempCart.length; i++) {
            tempPreTax = tempPreTax + tempCart[i].price;
        }
        setPreTax((preTax) => tempPreTax);
    }


    const addCartItem = (name, price) => {
        let tempCart = cartList;
        tempCart = [...cartList, { name, price }];
        setCartList((cartList) => tempCart);
        calculate(tempCart);

    }
  

  const removeCartItem = (whichItem) => {
        let tempCart = [];
        for (let i = 0; i < cartList.length; i++) {
            if (i !== whichItem) {
                tempCart.push(cartList[i])
            }
        }
        setCartList((cartList) => tempCart);
        calculate(tempCart);

    }

    const filterItems = () => {
        let searchTxt = document.querySelector("[name='filterItems']").value;
        searchTxt = searchTxt.toLowerCase();
        setProductSearch((productSearch) => searchTxt);
    }

  // const deleteProduct = async (productId) => {
  //   await axios.delete(`http://localhost:5000/products/${productId}`);
  //   getProducts();
  // };

  const saveOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/orders", {
        inv_code: inv_code,
        qty: qty,
        sub_total: sub_total,
        total_disc: total_disc,
        taxes: taxes,
        total_price: total_price,
        iscard: iscard,
        producId: productId,
        discountId: discountId,
        memberId: memberId,
        employeeId: employeeId,
        branchId: branchId
      });
      navigate("/orders");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
      <div>
        <Row>
            <Col className="mt-3">
                <h2 className="mt-3">
                  <strong>Daftar Layanan</strong>
                </h2>
                {/* <div className="list-group"> */}
                <input 
                  style={{ width: '30rem' }} 
                  type="text" 
                  name="filterItems" 
                  placeholder="Cari Jasa Layanan" 
                  className="form-control" 
                  onChange={() => filterItems()} 
                  />
                {products.length !== 0 && (
                  <Card style={{ width: '30rem' }}>
                    <ListGroup variant="flush" bsStyle="success">
                      {products.map((product) => (
                        <ListGroup.Item bsStyle="success"
                          key={product.uuid}
                          onClick={() => addCartItem(product.name, product.price)}
                        >
                          <Row>
                            <Col xs={2}>
                            
                              <h2>
                                <Badge style={{ width: '25rem' }} pill variant="primary">
                                  {product.name + "-" + "Rp." + numberWithCommas(product.price)}
                                  
                                </Badge>
                              </h2>
                            </Col>
                            {/* <Col>
                              <h5>{product.name}</h5>
                              <p>Rp. {numberWithCommas(product.price)}</p>
                            </Col>
                            <Col>
                              <strong className="float-right">
                                Rp. {numberWithCommas(product.price)}
                              </strong>
                            </Col> */}
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                )}

                {/* <TotalBayar keranjangs={keranjangs} {...this.props} /> */}
                {/* </div> */}
              </Col>

        {/* <div className='col-md-6'> */}
            <Col className="mt-3">
                <h2 className="mt-3">
                  <strong>Keranjang</strong>
                </h2>
                {/* <div className="list-group"> */}
                <Card style={{ width: '30rem' }}>
                    {cartList.length > 0 ? cartList.map((cartItem, i) => {
                        return (<li key={i} className="list-group-item ">
                            <i className="fa fa-trash pointer" onClick={() => removeCartItem(i)}></i>{" "}
                            <span className="capitalize">{cartItem.name + " - Rp." + numberWithCommas(cartItem.price)}</span></li>)
                    }) : null}
                {/* </div> */}
                {cartList.length > 0 ?
                    <ul className="list-unstyled">
                        <li className="list-group-item ">PPN Rp.{tax.toFixed(2)}</li>
                        {/* <li><h4>PPN Rp.{preTax.toFixed(2)}</h4></li> */}
                        <li className="list-group-item ">Diskon Member 
                          <input 
                            type="text" 
                            className='input'
                            name="diskonMember" 
                            placeholder="Diskon Member" 
                            value="0" 
                            onChange={(e) => setDiskonMember(e.target.value)}/>
                        </li>
                        <li className="list-group-item ">Diskon Uang Muka/DP 
                            <input 
                              type="text" 
                              className='input'
                              name="diskonDp" 
                              placeholder="Diskon DP" 
                              value="0" 
                              onChange={(e) => setDiskonDp(e.target.value)}/>
                        </li>
                        <li className="list-group-item ">Diskon Promo 
                            <input 
                              type="text"  
                              name="diskonPromo" 
                              placeholder="Diskon Promo" 
                              value="0"
                              onChange={(e) => setDiskonPromo(e.target.value)}/>
                        </li>
                        <li className="list-group-item ">
                          <div className="alert alert-success" role="alert">
                            <h3 className="">Total Rp.{((preTax * tax) + preTax).toFixed(2)}</h3>
                          </div>
                        </li>
                        <li>

                            {toggle !== "submitCart" ? <Button 
                                                        variant="primary"
                                                        block="true"
                                                        className="mb-2 mt-4 mr-2"
                                                        size="lg"
                                                        onClick={() => setToggle((toggle) => "submitCart")}>
                                                          <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                                                        </Button> :
                            // <button className="btn btn-block btn-danger" onClick={() => setToggle((toggle) => "submitCart")}>Bayar</button> :
                                <div className="alert alert-danger" role="alert">
                                    <p>Are you sure you want to submit cart?</p>
                                    <button className="btn btn-warning" onClick={() => saveOrder()}>Yes</button>
                                    <button className="btn btn-dark" onClick={() => setToggle((toggle) => "")}>No</button>
                                </div>}

                        </li>
                    </ul>
                    : null}
                </Card>
                {/* <TotalBayar /> */}
            </Col>   
        {/* </div> */}
        </Row>
      </div> 
  )
}

export default FormAddOrder
