import React from "react";
import { Carousel } from "react-bootstrap";
import {withRouter} from 'react-router';

import './Carousel.css'

function CarouselComponent({history}) {
  // console.log(history)
  const clickHandler = (e) => {
    // console.log(e.target.dataset.to);
    history.push(e.target.dataset.to);
    // console.log(data);
    // console.log("Krish")
  }
  return (
    <>
      <Carousel>
        <Carousel.Item data-to='food/12' className = 'imgresize stretched-link hovpoi' onClick={clickHandler}>
          <img
            className="img-responsive center-block w-100" height={470}
            src="https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Pizza</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item data-to='food/14' className = 'imgresize stretched-link hovpoi' onClick={clickHandler}>
          <img
            className="img-responsive center-block w-100" height={470}
            src="https://www.pngitem.com/pimgs/m/638-6384918_thrill-hunt-alfredo-pasta-hd-png-download.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Pasta</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item data-to='food/16' className='imgresize stretched-link hovpoi' onClick={clickHandler}>
          <img
            className="img-responsive center-block w-100" height={470}
            src="https://i.ytimg.com/vi/0p7N5MSAnjE/maxresdefault.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Panner</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>

  );
}

export default withRouter(CarouselComponent);
