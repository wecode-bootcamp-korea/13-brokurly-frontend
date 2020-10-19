import React from "react";

import "./ProductCard.styles.scss";
import Team from "../../../Images/teamBrokurly.jpg";

const ProductCard = () => {
  return (
    <div className="ProductCard card">
      <div className="card-image">
        <div className="thumbnail"></div>
        {/* <img src={Team} alt="" /> */}
        <span className="card-title">Card Title</span>
        <div className="btn-floating halfway-fab waves-effect waves-light red">
          <i className="material-icons">add</i>
        </div>
      </div>
      <div className="card-content">
        <p>
          I am a very simple card. I am good at containing small bits of
          information. I am convenient because I require little markup to use
          effectively.
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
