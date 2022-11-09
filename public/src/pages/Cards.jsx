import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import github from "../images/github.png";
import linkedin from "../images/linkedin.png";
import gmail from "../images/gmail.png";

export default function Cards() {
  const [search, setSearch] = useState("");
  const [Alldata, setAllData] = useState([]);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  useEffect(async () => {
    let res = await fetch("https://fakestoreapi.com/products");
    let json = await res.json();
    setAllData(json);
  }, []);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  console.log(Alldata);
  return (
    <>
      <div className="private">
        <div className="header">
          <span style={{ fontSize: "30px" }}>
            <Link to="/" className="link">
              Shopping Cart
            </Link>
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div class="dropdown">
              <button class="dropbtn">Services</button>
              <div class="dropdown-content">
                <Link to="/">About</Link>
                <Link to="/">Categories</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
            <button onClick={logOut} className="logout-btn">
              Log out
            </button>
          </div>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
            style={{ outline: "none" }}
          />
        </div>
        <div className="container">
          {Alldata.filter((el) => {
            if (search === "") {
              return el;
            } else if (el.title.toLowerCase().includes(search.toLowerCase())) {
              return el;
            }
          }).map((el, key) => {
            return (
              <div className="list" key={el.id}>
                <img
                  src={el.image}
                  style={{ height: "60%", width: "100%", marginTop: 0 }}
                ></img>
                <span
                  className="material-icons end"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFC501",
                    fontSize: "20px",
                    color: "black",
                    height: "30%",
                    width: "100%",
                  }}
                >
                  {el.title}
                </span>
                <span
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "black",
                    backgroundColor: "#FFC501",
                    height: "10%",
                    width: "100%",
                  }}
                >
                  ${el.price}
                </span>
              </div>
            );
          })}
        </div>
        <div className="footer">
          {/* <span>Shopping Cart</span> */}
          <a href="https://github.com/Raghavarora27">
            <img
              src={github}
              height={40}
              width={40}
              style={{ marginRight: "0.5rem" }}
            />
          </a>
          <a href="https://www.linkedin.com/in/raghav-arora-2209a3184/">
            <img
              src={linkedin}
              height={36}
              width={40}
              style={{ marginRight: "0.5rem" }}
            ></img>
          </a>
          <a href="mailto:aroraraghav008@gmail.com">
            <img src={gmail} height={45} width={40}></img>
          </a>
          {/* <span>Contact Us</span>
          <span>About</span> */}
          {/* <button onClick={logOut}>Log out</button> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
