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
    this.main = React.createRef();
  }

  componentDidMount() {
    this.getAPIdata();
    this.getUserAllData();
  }

  getAPIdata = async () => {
    const res = await fetch("/data/main/MainPageSectionsDataArr.json");
    const data = await res.json();
    try {
      this.setState({
        specialSections: data.specialProductsSections,
      });
    } catch (error) {
      console.log("error...");
    }
  };

  getUserAllData = () => {
    const {
      userToken,
      getCartItems,
      getFrequentlyPurchaseItems,
      getPurchaseList,
    } = this.props;

    fetch("http://localhost:3000/data/main/MainPageSectionsDataArr.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          specialSections: res.specialProductsSections,
        });
      })
      .catch((error) => console.log(error.message));
    const scrollTop = this.main.current.scrollTop;
    this.setState({
      scrollTop,
    });

    fetch(GET_SHOPPINGBASKET_API, {
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data.shopping_list)
      .then((cartItems) => getCartItems(cartItems))
      .catch((error) => console.log(error));

    fetch(GET_FREQUENTLY_PRODUCT_API, {
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data.product_list)
      .then((product_list) => getFrequentlyPurchaseItems(product_list))
      .catch((error) => console.log(error));

    fetch(GET_PURHCASE_LIST_API, {
      headers: {
        "content-type": "application/json",
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data.order_list)
      .then((purchaseList) => getPurchaseList(purchaseList))
      .catch((error) => console.log(error));
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
const mapDispatchToProps = (dispatch) => ({
  getCartItems: (cartItems) => dispatch(getCartItems(cartItems)),
  getFrequentlyPurchaseItems: (purchaseItems) =>
    dispatch(getFrequentlyPurchaseItems(purchaseItems)),
  getPurchaseList: (purchaseItems) => dispatch(getPurchaseList(purchaseItems)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
