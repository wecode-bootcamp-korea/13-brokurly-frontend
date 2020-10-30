/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";

import "./Footer.styles.scss";

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      backBros: [],
      frontBros: [],
    };
  }

  componentDidMount = () => {
    this.getFooterData();
  };

  getFooterData = async () => {
    const res = await fetch("/data/FooterData.json");
    const data = await res.json();
    try {
      if (data.message === "SUCCESS") {
        this.setState({
          backBros: data.back,
          frontBros: data.front,
        });
      }
    } catch (error) {
      console.log("error...");
    }
  };

  render() {
    const { backBros, frontBros } = this.state;
    return (
      <footer className="Footer">
        <div className="footer-container">
          <div className="left-side info">
            <img
              className="logo"
              src="https://media.vlpt.us/images/dhlee91/post/5785ee4c-f5bc-4ca9-9b96-f6c5aed3ffc3/brokurly_logo.png"
              alt="logo"
            />
            <a
              className="github-link brokurly"
              href="https://github.com/wecode-bootcamp-korea/13-brokurly-frontend"
              target="_blank"
            >
              <h2 className="team">Team BroKurly</h2>
              <div className="github-link contents">
                <i className="fab fa-github"></i>
                <h4 className="github link text">BroKurly Github</h4>
              </div>
            </a>
            <br />
            <h3 className="back bros">BackEnd Bros</h3>
            <ul>
              {backBros.map((bro) => {
                return (
                  <li>
                    <p>
                      {bro.name}
                      <span>{` > ${bro.incharge}`}</span>
                    </p>
                    <a
                      className="github-link personal"
                      href={bro.githubUrl}
                      target="_blank"
                    >
                      <i className="fab fa-github"></i>
                      <h4 className="github link text">{bro.githubId}</h4>
                    </a>
                  </li>
                );
              })}
            </ul>
            <br />
            <h3 className="front bros">FrontEnd Bros</h3>
            <ul>
              {frontBros.map((bro) => {
                return (
                  <li>
                    <p>
                      {bro.name}
                      <span>{` > ${bro.incharge}`}</span>
                    </p>
                    <a
                      className="github-link personal"
                      href={bro.githubUrl}
                      target="_blank"
                    >
                      <i className="fab fa-github"></i>
                      <h4 className="github link text">{bro.githubId}</h4>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="right-side img-container">
            <div className="right-side front image-stack">
              <img
                className="team-pic 1"
                src="https://media.vlpt.us/images/dhlee91/post/dc708ad9-4a26-4ad8-9cd8-140553337c14/bros1.jpg"
                alt="bros"
              />
              <img
                className="team-pic 2"
                src="https://media.vlpt.us/images/dhlee91/post/001137eb-5950-4596-8fe1-153bbbdfd6a7/bros2.jpg"
                alt="bros"
              />
            </div>
          </div>
        </div>
        <p className="copyright">©2020 Wecode Team BroKurly</p>
      </footer>
    );
  }
}

export default Footer;
