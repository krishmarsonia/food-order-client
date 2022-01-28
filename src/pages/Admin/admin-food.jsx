import React, { useState } from "react";
import axios from "axios";

import NavbarComponent from "../../components/Navbar/navbar";
import AdminForm from "../../components/Admin-Form/Admin-Form";

import "./admin-food.css";

const AdminFood = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [disMessage, setDisMessage] = useState("");
  const PostFoodData = () => {
    axios
      .post(
        "http://localhost:5050/submitfood",
        {
          data: {
            type: type,
            name: name,
            imageUrl: imageUrl,
            price: price,
            description: desc,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        // console.log(result);
        setDisMessage(result.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const typeChangeHandler = (e) => {
    setType(e.target.value);
    setDisMessage();
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
    setDisMessage();
  };
  const imageUrlChangeHandler = (e) => {
    setImageUrl(e.target.value);
    setDisMessage();
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
    setDisMessage();
  };
  const descChangeHandler = (e) => {
    setDesc(e.target.value);
    setDisMessage();
  };
  const handleClick = () => {
    PostFoodData();
    setType("");
    setName("");
    setImageUrl("");
    setPrice("");
    setDesc("");
    // console.log("heyyy");
  };
  const adminarr = [
    {
      id: 1,
      name: "Food_type",
      onchag: typeChangeHandler,
      val: type,
      child: "Food Type",
    },
    {
      id: 2,
      name: "Food_Name",
      onchag: nameChangeHandler,
      val: name,
      child: "Food Name",
    },
    {
      id: 3,
      name: "Food_ImageUrl",
      onchag: imageUrlChangeHandler,
      val: imageUrl,
      child: "Food ImageUrl",
    },
    {
      id: 4,
      name: "Food_Price",
      onchag: priceChangeHandler,
      val: price,
      child: "Food Price",
    },
    {
      id: 5,
      name: "Food_Description",
      onchag: descChangeHandler,
      val: desc,
      child: "Food Description",
    },
  ];
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <NavbarComponent />
      <div className="a-f mrgdwn">
        <h1 className="a-f-mrgdwn">Enter the food details into the database</h1>
      </div>
      {adminarr.map((af) => {
        return (
          <div key={af.id} className="a-f-row-left">
            <AdminForm
              name={af.name}
              child={af.child}
              onchag={af.onchag}
              val={af.val}
              type="text"
            />
          </div>
        );
      })}

      {/* <br /> */}
      <div className="a-f-btn-right">
        <input
          type="submit"
          value="Submit"
          onClick={handleClick}
          className="btn btn-primary"
        />
        <p className="text-success">{disMessage}</p>
      </div>
    </div>
  );
};

export default AdminFood;
