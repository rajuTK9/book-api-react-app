import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../logo.svg";
import { Button } from "@mui/material";

function RenderBooks(props) {
  const listBooks =
    props.data.length === 0 ? (
      <>
        <h1>⦰</h1>
        <h1>Books</h1>
        <h1>not</h1>
        <h1>found</h1>
      </>
    ) : (
      props.data.map((e, i) => {
        return (
          <div className="book-card" key={i}>
            <div
              className="card-img"
              style={{
                backgroundImage: `url(${e.imageLinks.thumbnail})`,
              }}
            ></div>
            <div className="card-content">
              <h3 className="card-title">{e.title}</h3>
              <h6 className="card-author">{e.authors}</h6>
              <div className="rating">
                {" "}
                <span className="star">★</span>{" "}
                {e.averageRating ? e.averageRating : 0}
              </div>
            </div>
            <button className="card-btn">
              {" "}
              <a href={e.previewLink}> See More</a>
            </button>
          </div>
        );
      })
    );
  return <>{listBooks}</>;
}

export default function Home() {
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "whatever-you-want",
      },
    };

    const url = "https://reactnd-books-api.udacity.com/books";
    axios
      .get(url, config)
      .then((res) => {
        setData(res.data.books);
        setBooks(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  function onChangeHandler(el) {
    let temp = [];
    data.forEach((e) => {
      if (e.title.toLowerCase().search(el.target.value.toLowerCase()) >= 0) {
        temp.push(e);
      }
    });

    setBooks(temp);
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <input
          type="search"
          className="search"
          placeholder="Search"
          onChange={onChangeHandler}
        />
        <div className="links">
          <Link to="/register">
            <Button variant="contained">
              {" "}
              {localStorage.getItem("userName")
                ? localStorage.getItem("userName")
                : "Register"}
            </Button>
            {/* <button className="register">
              {localStorage.getItem("userName")
                ? localStorage.getItem("userName")
                : "Register"}
            </button> */}
          </Link>
        </div>
      </nav>
      <div className="books-container">
        <RenderBooks data={books} />
      </div>
    </>
  );
}
