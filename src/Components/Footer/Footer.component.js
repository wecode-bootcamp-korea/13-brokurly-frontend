import React, { Component } from "react";

import "./Footer.styles.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <div className="footer-container">
          <div className="left-side container">
            <div className="left-side front info">
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
                </li>
                <li>
                  <p>
                    김형욱 <span>{"> "}Login/Accounts</span>
                  </p>
                </li>
              </ul>
              <br />
              <h3 className="front bros">FrontEnd Bros</h3>
              <ul>
                <li>
                  <p>
                    강수명 <span>{"> "}Product lists, Product details</span>
                  </p>
                </li>
                <li>
                  <p>
                    김제형 <span>{"> "}Nav, Cart, MyPage</span>
                  </p>
                </li>
                <li>
                  <p>
                    이동훈 <span>{"> "}Main page, Side menu, Footer</span>
                  </p>
                </li>
                <li>
                  <p>
                    허덕형 <span>{"> "}Login/Register, Order page</span>
                  </p>
                </li>
              </ul>
              <br />
            </div>
            <div className="left-side back image">
              <img
                className="team-pic"
                src="./Images/Team/bros1.jpg"
                alt="bros"
              />
            </div>
          </div>
          <div className="right-side"></div>
        </div>
      </footer>
    );
  }
}

export default Footer;
