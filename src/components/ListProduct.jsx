import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
//import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import TotalBayar from './TotalBayar';
import swal from "sweetalert2";
import { API_URL } from '../utils/constants';

const ListProduct = ({ product, masukKeranjang }) => {
  
  const [products, setProducts] = useState([]);
  let [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const filterItems = () => {
    let searchTxt = document.querySelector("[name='filterItems']").value;
    searchTxt = searchTxt.toLowerCase();
    setProductSearch((productSearch) => searchTxt);
}


  return (
    <div>
    <Row>
        <Col className="mt-3">
            <h2 className="mt-3">
              <strong>Daftar Layanan</strong>
            </h2>
            {/* <div className="list-group"> */}
            <input style={{ width: '30rem' }} type="text" name="filterItems" placeholder="Cari Jasa Layanan" className="form-control" onChange={() => filterItems()} />
            {products.length !== 0 && (
              <Card style={{ width: '30rem' }}>
                <ListGroup variant="flush" bsStyle="success">
                  {products.map((product) => (
                    <ListGroup.Item bsStyle="success"
                      key={product.uuid}
                      product={product}
                    >
                      <Row>
                        <Col xs={2}>
                          <h4>
                            <Badge style={{ width: '25rem' }} pill variant="success">
                              {product.name + "-" + "Rp." + numberWithCommas(product.price)}
                            </Badge>
                          </h4>
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
    </Row>
  </div> 
  );
};

export default ListProduct;
