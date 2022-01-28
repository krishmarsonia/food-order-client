import React from "react";
import { Col, Row } from "react-bootstrap";

import CardItem from "../Card-Item/CardItem";
//http://www.shudhrestaurant.com/menu.html

const MenuItem = [
  {
    id:1,
    item: 'pizza',
    image:'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80',
    url:'food/12'
  },
  {
    id:2,
    item: 'sandwich',
    image:'https://image.shutterstock.com/image-photo/grilled-sandwich-cheese-vegetables-green-260nw-779730214.jpg',
    url: 'food/13'
  },
  {
    id:3,
    item: 'Pasta',
    image:'https://media.istockphoto.com/photos/vodka-pens-picture-id531487755?k=20&m=531487755&s=612x612&w=0&h=Y8y_V-T1-_R9YZFQxkDZ2O7gtKaqCGm36BkIMSfOWBM=',
    url: 'food/14'
  },
  {
    id:4,
    item: 'Burger',
    image:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    url: 'food/15'
  },
  {
    id:5,
    item: 'Panner',
    image:'https://www.chocolatesandchai.com/wp-content/uploads/2021/05/Paneer-Tikka-Featured.jpg',
    url: 'food/16'
  },
  {
    id:6,
    item: 'sandwich',
    image:'https://image.shutterstock.com/image-photo/grilled-sandwich-cheese-vegetables-green-260nw-779730214.jpg',
    url: 'food/17'
  }
]

function Cards() {
  return (
    <div>
      <h1>Available Menu</h1>
      <br />
      <Row >
        {MenuItem.map(items => (
          <Col key={items.id} className='col-md-4' style={{marginTop: '5px'}}>
            <CardItem name={items.item} image={items.image} url={items.url} />
          </Col>
        ))}
      </Row>
     
    </div>
  );
}

export default Cards;
