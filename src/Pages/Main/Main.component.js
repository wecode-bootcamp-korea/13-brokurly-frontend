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
import SideMenu from "../../Components/SideMenu/SideMenu.component";
import SectionRender from "./SectionRender/SectionRender.component";

import "./Main.styles.scss";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      specialSections: [],
      scrollTop: 0,
      // lastScrollTop: 0,
      position: -2,
    };
    this.main = React.createRef();
  }

  componentDidMount() {
    const {
      userToken,
      getCartItems,
      getFrequentlyPurchaseItems,
      getPurchaseList,
    } = this.props;

    console.log("Mount Main");

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

    userToken &&
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

    userToken &&
      fetch(GET_FREQUENTLY_PRODUCT_API, {
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
        )
        .catch((error) => console.log(error));

    userToken &&
      fetch(GET_PURHCASE_LIST_API, {
        headers: {
          "content-type": "application/json",
          Authorization: userToken,
        },
      })
        .then((res) => res.json())
        .then((data) => data.order_list)
        .then(
          (purchaseList) => purchaseList.length && getPurchaseList(purchaseList)
        )
        .catch((error) => console.log(error));
  }

  onScrollDown = () => {
    this.setState(
      {
        position: -1,
      },
      () => {
        setTimeout(() => {
          const scrollTop = this.main.current.scrollTop;
          this.setState({ position: scrollTop > 5350 ? 2 : 0 });
          setTimeout(() => {
            this.setState({ scrollTop });
          }, 200);
        }, 200);
      }
    );
  };

  onScrollUp = () => {
    this.setState(
      {
        position: 1,
      },
      () => {
        setTimeout(() => {
          const scrollTop = this.main.current.scrollTop;
          this.setState({ position: scrollTop === 0 ? -2 : 0 });
          setTimeout(() => {
            this.setState({ scrollTop });
          }, 200);
        }, 200);
      }
    );
  };

  toggleSideMenuPosition = () => {
    const scrollTop = this.main.current.scrollTop;
    const posToDefaultCondition = scrollTop >= 240;
    const posToInitialCondition = scrollTop < 240;
    const posOnScrollDownCondition =
      scrollTop >= 240 && scrollTop > this.state.scrollTop;
    const posOnScrollUpCondition =
      scrollTop >= 240 && scrollTop < this.state.scrollTop;
    let position = -2;
    this.setState({
      scrollTop,
    });
    if (posToDefaultCondition) position = 0;
    if (posToInitialCondition) position = -2;
    if (posOnScrollDownCondition) {
      this.onScrollDown();
    } else if (posOnScrollUpCondition) {
      this.onScrollUp();
    } else {
      this.setState({
        position,
      });
    }
  };

  render() {
    const { specialSections, position } = this.state;
    return (
      <div
        className="Main"
        ref={this.main}
        onScroll={this.toggleSideMenuPosition}
      >
        <MainBanner />
        <SideMenu position={position} />
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
