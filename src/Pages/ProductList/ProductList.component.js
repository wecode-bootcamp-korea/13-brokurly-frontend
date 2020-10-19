import React, { Component } from "react";

import "./ProductList.styles.scss";

class ProductList extends Component {
  render() {
    return (
      <section className="ProductList">
        <div className="row">
          <div className="col s12 m6">
            <div className="card">
              <div className="card-image">
                <img src="images/sample-1.jpg" alt="" />
                <span className="card-title">Card Title</span>
                <div className="btn-floating halfway-fab waves-effect waves-light red">
                  <i className="material-icons">add</i>
                </div>
              </div>
              <div className="card-content">
                <p>
                  I am a very simple card. I am good at containing small bits of
                  information. I am convenient because I require little markup
                  to use effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProductList;
