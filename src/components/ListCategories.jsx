import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ name }) => {
  if (name === "vitamin")
    return <FontAwesomeIcon icon={faCrosshairs} className="mr-2" />;
  if (name === "shampoo") return <FontAwesomeIcon icon={faCrosshairs} />;
  if (name === "pewarna")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={2} className="mt-3">
        <h2>
          <strong>Daftar Kategori</strong>
        </h2>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.name)}
                className={categoriYangDipilih === category.name && "category-aktif"}
                style={{cursor: 'pointer'}}
              >
                <h5>
                  <Icon name={category.name} /> {category.name}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
