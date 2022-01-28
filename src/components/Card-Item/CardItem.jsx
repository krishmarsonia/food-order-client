import React from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router";
// import {Link} from 'react-router-dom'

import './CardItem.css';

function CardItem({name, image, url, history}) {
  const handleClick = (e) => {
    // console.log(e.target)
    history.push(url)
  }
  return (
    <div style={{display: 'inline-block'}}>
      <Card style={{ width: "18rem" }} className='Card'>
        <Card.Img variant="top" src={image} className='card-img-top'/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          
          {/* <a to={url} className='stretched-link' onClick={handleClick}/> */}
          <span to={url} className='stretched-link' onClick={handleClick}></span>
        </Card.Body>
      </Card>
    </div>
  );
}

export default withRouter(CardItem);
