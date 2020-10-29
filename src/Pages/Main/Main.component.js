import React, { Component } from "react";
import { connect } from "react-redux";
import { getCartItems } from "../../redux/cart/cart.actions";
import { getFrequentlyPurchaseItems } from "../../redux/frequentlyPurchase/frequentlyPurchase.actions";
import { getPurchaseList } from "../../redux/purchase/purchase.actions";
import {
  GET_SHOPPINGBASKET_API,
  GET_FREQUENTLY_PRODUCT_API,
  GET_PURHCASE_LIST_API,
} from "../../config";
import MainBanner from "./MainBanner/MainBanner.component";
import SectionRender from "./SectionRender/SectionRender.component";
import "./Main.styles.scss";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      specialSections: [],
    };
  }

  componentDidMount() {
    this.getUserAllInformation();
    this.getProductInformation();
  }

  getUserAllInformation = async () => {
    const {
      userToken,
      getCartItems,
      getFrequentlyPurchaseItems,
      getPurchaseList,
    } = this.props;
    try {
      userToken &&
        (await fetch(GET_SHOPPINGBASKET_API, {
          headers: {
            "content-type": "application/json",
            Authorization: userToken,
          },
        })
          .then((res) => res.json())
          .then((data) => data.shopping_list)
          .then((cartItems) => getCartItems(cartItems)));
      userToken &&
        (await fetch(GET_FREQUENTLY_PRODUCT_API, {
          headers: {
            "content-type": "application/json",
            Authorization: userToken,
          },
        })
          .then((res) => res.json())
          .then((data) => data.product_list)
          .then(
            (product_list) =>
              product_list.length && getFrequentlyPurchaseItems(product_list)
          ));
      userToken &&
        (await fetch(GET_PURHCASE_LIST_API, {
          headers: {
            "content-type": "application/json",
            Authorization: userToken,
          },
        })
          .then((res) => res.json())
          .then((data) => data.order_list)
          .then(
            (purchaseList) =>
              purchaseList.length && getPurchaseList(purchaseList)
          ));
    } catch (error) {
      console.log(error);
    }
  };

  getProductInformation = () => {
    fetch("http://localhost:3000/data/main/MainPageSectionsDataArr.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          specialSections: res.specialProductsSections,
        });
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    const { specialSections } = this.state;
    return (
      <div className="Main">
        <MainBanner />
        {specialSections.map((section) => (
          <SectionRender section={section} key={section.id} />
        ))}
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  userToken: user.userToken,
});
export default connect(mapStateToProps, {
  getCartItems,
  getFrequentlyPurchaseItems,
  getPurchaseList,
})(Main);
