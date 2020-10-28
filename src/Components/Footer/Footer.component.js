/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";

import "./Footer.styles.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <div className="left-side info">
          <img
            className="logo"
            src="./Images/Team/brokurly_logo.png"
            alt="logo"
          />
          <h2 className="team">Team BroKurly</h2>
          <br />
          <h3 className="back bros">BackEnd Bros</h3>
          <ul>
            <li>
              <p>
                김동현(PM) <span>{"> "}Products</span>
              </p>
              <a
                className="github-link daphne"
                href="https://github.com/Daphne-dev"
                target="_blank"
              >
                <i className="fab fa-github"></i>
                <h4 className="github link text">daphne-dev</h4>
              </a>
            </li>
            <li>
              <p>
                김형욱 <span>{"> "}Login/Accounts</span>
              </p>
              <a
                className="github-link kho"
                href="https://github.com/kho5420"
                target="_blank"
              >
                <i className="fab fa-github"></i>
                <h4 className="github link text">kho5420</h4>
              </a>
            </li>
          </ul>
          <br />
          <h3 className="front bros">FrontEnd Bros</h3>
          <ul>
            <li>
              <p>
                강수명 <span>{"> "}Product lists, Product details</span>
              </p>
              <a
                className="github-link vannskang"
                href="https://github.com/VannsKang"
                target="_blank"
              >
                <i className="fab fa-github"></i>
                <h4 className="github link text">VannsKang</h4>
              </a>
            </li>
            <li>
              <p>
                김제형 <span>{"> "}Nav, Cart, MyPage</span>
              </p>
              <a
                className="github-link muscardinus"
                href="https://github.com/Muscardinus94"
                target="_blank"
              >
                <i className="fab fa-github"></i>
                <h4 className="github link text">Muscardinus94</h4>
              </a>
            </li>
            <li>
              <p>
                이동훈 <span>{"> "}Main page, Side menu, Footer</span>
              </p>
              <a
                className="github-link pdl39"
                href="https://github.com/pdl39"
                target="_blank"
              >
                <i className="fab fa-github"></i>
                <h4 className="github link text">pdl39</h4>
              </a>
            </li>
            <li>
              <p>
                허덕형 <span>{"> "}Login/Register, Order page</span>
              </p>
              <a
                className="github-link deokyeong"
                href="https://github.com/deokyeong93"
                target="_blank"
              >
                <i className="fab fa-github"></i>
                <h4 className="github link text">deokyeong93</h4>
              </a>
            </li>
          </ul>
        </div>
        <div className="right-side container">
          <div className="right-side front image-stack">
            <img
              className="team-pic 1"
              src="./Images/Team/bros1.jpg"
              alt="bros"
            />
            <img
              className="team-pic 2"
              src="./Images/Team/bros2.jpg"
              alt="bros"
            />
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
