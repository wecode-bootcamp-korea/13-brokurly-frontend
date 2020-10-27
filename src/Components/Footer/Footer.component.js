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
              >
                <i className="fab fa-github"></i>
              </a>
              <h4>daphne-dev GitHub</h4>
            </li>
            <li>
              <p>
                김형욱 <span>{"> "}Login/Accounts</span>
              </p>
              <a className="github-link kho" href="https://github.com/kho5420">
                <i className="fab fa-github"></i>
              </a>
              <h4>kho5420 GitHub</h4>
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
              >
                <i className="fab fa-github"></i>
              </a>
              <h4>VannsKang GitHub</h4>
            </li>
            <li>
              <p>
                김제형 <span>{"> "}Nav, Cart, MyPage</span>
              </p>
              <a
                className="github-link muscardinus"
                href="https://github.com/Muscardinus94"
              >
                <i className="fab fa-github"></i>
              </a>
              <h4>Muscardinus94 GitHub</h4>
            </li>
            <li>
              <p>
                이동훈 <span>{"> "}Main page, Side menu, Footer</span>
              </p>
              <a className="github-link pdl39" href="https://github.com/pdl39">
                <i className="fab fa-github"></i>
              </a>
              <h4>pdl39 GitHub</h4>
            </li>
            <li>
              <p>
                허덕형 <span>{"> "}Login/Register, Order page</span>
              </p>
              <a
                className="github-link deokyeong"
                href="https://github.com/deokyeong93"
              >
                <i className="fab fa-github"></i>
              </a>
              <h4>ddeokyeong93 GitHub</h4>
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
