import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import github from "../images/github.png";
import linkedin from "../images/linkedin.png";
import gmail from "../images/gmail.png";

export default function Contact() {
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

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
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
      <div class="contact-container">
        <div class="contact-box">
          <div class="left"></div>
          <div class="right">
            <h2 style={{color:"black"}}>Contact Us</h2>
            <input type="text" class="field" placeholder="Your Name" />
            <input type="text" class="field" placeholder="Your Email" />
            <input type="text" class="field" placeholder="Phone" />
            <textarea placeholder="Message" class="field"></textarea>
            <button
              class="btn"
              onClick={() => {
                alert("Thank you Contacting Us !!");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
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
      </div>
    </div>
  );
}
