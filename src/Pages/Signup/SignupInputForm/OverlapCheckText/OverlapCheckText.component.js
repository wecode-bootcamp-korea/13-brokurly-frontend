import React, { Component } from "react";

import "./OverlapCheckText.styles.scss";

class OverlapCheckText extends Component {
  constructor() {
    super();
    this.state = {
      one: ["6자 이상의 영문 혹은 영문과 숫자를 조합", "아이디 중복확인"],
      two: [
        "10자 이상 입력",
        "영문/숫자/특수문자(공백 제외)만 허용하며,2개 이상 조합",
        "동일한 숫자 3개 이상 연속 사용 불가",
      ],
      three: ["동일 비밀번호를 입력해주세요."],
    };
  }

  // 경우에 따라서 샛별 배송 span을 여기 만든다.

  render() {
    console.log("OverlapCheckText =>", this.props.onData);
    const { one, two, three } = this.state;
    return (
      <div className="OverlapCheckText">
        {this.props.onOffCount === "one" && (
          <>
            <span className="initial">{one[0]}</span>
            <span className="initial">{one[1]}</span>
          </>
        )}
        {this.props.onOffCount === "two" && (
          <>
            <span className="initial">{two[0]}</span>
            <span className="initial">{two[1]}</span>
            <span className="initial">{two[2]}</span>
          </>
        )}
        {this.props.onOffCount === "three" && (
          <>
            <span className="initial">{three[0]}</span>
          </>
        )}
      </div>
    );
  }
}

export default OverlapCheckText;
