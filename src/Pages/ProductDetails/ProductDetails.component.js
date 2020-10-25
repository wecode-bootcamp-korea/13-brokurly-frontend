import React, { Component } from "react";

import "./ProductDetails.styles.scss";

class ProductDetails extends Component {
  state = {
    id: null,
  };
  componentDidMount() {
    console.log(this.props);
    let id = this.props.match.params.id;
    this.setState({ id });
  }

  render() {
    // const { match } = this.props;
    return (
      // <div>about {match.params.id}</div>;
      <div>{this.state.id}</div>
    );
  }
}

export default ProductDetails;
