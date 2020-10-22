import React, { Component } from "react";

import CartItem from "../CartItem/CartItem.component";

import "./ViewCart.styles.scss";

class ViewCart extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      allSelect: false,
    };
  }

  componentDidMount() {
    this.toggleGroupCheckBox();
  }

  toggleGroupCheckBox = async () => {
    const cartItemElementCheckbox = document.querySelectorAll(
      ".cart-item-select input"
    );
    await this.setState({ allSelect: !this.state.allSelect });
    const { allSelect } = this.state;
    for (let i = 0; i < cartItemElementCheckbox.length; i++)
      cartItemElementCheckbox[i].checked = allSelect;
  };

  checkGroupCheckBox = () => {
    const cartItemElementCheckbox = document.querySelectorAll(
      ".cart-item-select input"
    );
    for (let i = 0; i < cartItemElementCheckbox.length; i++) {
      if (!cartItemElementCheckbox[i].checked) {
        this.setState({ allSelect: false });
        return;
      }
    }
    this.setState({ allSelect: true });
  };

  render() {
    const { allSelect } = this.state;
    return (
      <div className="View-cart">
        <div className="selected-items">
          <div className="selected-items-header">
            <div className="selected-items-header-select">
              <label>
                <input
                  type="checkbox"
                  onChange={this.toggleGroupCheckBox}
                  checked={allSelect ? "checked" : ""}
                />
              </label>
              <span className="select-all">
                전체선택 (<span className="count">0</span>/
                <span className="total">0</span>)
              </span>
            </div>
            <div className="selected-items-header-info">
              <span>상품정보</span>
            </div>
            <div className="selected-items-header-count">
              <span>수량</span>
            </div>
            <div className="selected-items-header-cost">
              <span>상품금액</span>
            </div>
          </div>
          <div className="selected-items-info">
            <CartItem checkGroupCheckBox={this.checkGroupCheckBox} />
            <CartItem checkGroupCheckBox={this.checkGroupCheckBox} />
            <CartItem checkGroupCheckBox={this.checkGroupCheckBox} />
            <CartItem checkGroupCheckBox={this.checkGroupCheckBox} />
            <CartItem checkGroupCheckBox={this.checkGroupCheckBox} />
          </div>
        </div>
        <div className="selected-options-container">
          <div className="selected-options">
            <div className="select-all">
              <div>
                <input
                  type="checkbox"
                  onChange={this.toggleGroupCheckBox}
                  checked={allSelect ? "checked" : ""}
                />
              </div>
              <span>전체선택 (2/2)</span>
            </div>
            <button className="select-delete">선택 삭제</button>
            <button className="sold-out-delete">품절 상품 삭제</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewCart;
