import React, { Component } from "react";

import SignupInputForm from "./SignupInputForm/SignupInputForm.component";

import "./Signup.styles.scss";
import "./SignupInputForm/SignupInputForm.styles.scss";

class Signup extends Component {
  constructor() {
    super();
    this.recommendInputRef = React.createRef();
    this.state = {
      userId: "",
      userPwd: "",
      userName: "",
      userEmail: "",
      userPhone: "",
      first: "n",
      second: "n",
      six: "n",
      // 이상 필수 사항
      privacyPolicy: "n",
      agreeSMS: "n",
      agreeEmail: "n",
      userPwdRepeat: "",
      userAddress: "",
      gender: "3",
      recommender: "",
      event: "",
      // (위)백에 전달해야하는 데이터들
      recommendInputContent: "",
      recommendCheck: "",
      userIdCheck: "n",
      userEmailCheck: "n",
      allChecks: "n",
      eventAllCheck: "n",
      birthdayYYYY: "",
      birthdayMM: "",
      birthdayDD: "",
    };
  }

  handleGenderCheck = (e) => {
    this.setState({ gender: e.target.value });
  };

  handleRecommendCheck = (e) => {
    this.setState({
      recommendCheck: e.target.value,
      recommender: "",
      event: "",
    });
    this.recommendInputRef.current.className = "signup-input";
    this.recommendInputRef.current.value = "";
  };

  handleRecommendInput = (e) => {
    this.setState({ recommendInputContent: e.target.value });
  };

  changeRecommendInput = () => {
    const { recommendCheck } = this.state;
    if (recommendCheck === "recommender") {
      return "추천인 아이디를 입력해주세요.";
    }
    if (recommendCheck === "event") {
      return "참여 이벤트명을 입력해주세요.";
    }
  };

  handleWriteData = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkId = () => {
    const { userId } = this.state;
    if (userId.length >= 5) {
      fetch("http://10.58.6.216:8000/user/checkid", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "SUCCESS") {
            this.setState({ userIdCheck: "y" });
          } else {
            this.setState({ userIdCheck: "n" });
          }
        });
    } else {
      console.log("망했다 이 친구야");
    }
  };

  checkEmail = () => {
    const { userEmail } = this.state;
    if (userEmail.length >= 5) {
      fetch("http://10.58.6.216:8000/user/checkemail", {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "SUCCESS") {
            this.setState({ userEmailCheck: "y" });
          } else {
            this.setState({ userEmailCheck: "n" });
          }
        });
    } else {
      console.log("망했다 이 친구야");
    }
  };

  allCheck = (e) => {
    const checkBox = [
      "first",
      "second",
      "privacyPolicy",
      "agreeSMS",
      "agreeEmail",
      "six",
    ];
    const isAllCheck = checkBox.every((check) => this.state[check] === "y");
    const obj = {};
    if (isAllCheck) {
      for (let check of checkBox) {
        obj[check] = "n";
      }
      obj.allChecks = "n";
      obj.eventAllCheck = "n";
    } else {
      for (let check of checkBox) {
        obj[check] = "y";
      }
      obj.allChecks = "y";
      obj.eventAllCheck = "y";
    }
    this.setState(obj);
  };

  handleAllCheck = () => {
    const checkBox = [
      "first",
      "second",
      "privacyPolicy",
      "agreeSMS",
      "agreeEmail",
      "six",
    ];
    const isAllCheck = checkBox.every((check) => this.state[check] === "y");
    if (isAllCheck) {
      return "y";
    } else {
      return "n";
    }
  };

  receiveAllCheck = (e) => {
    const checkBox = ["agreeSMS", "agreeEmail"];
    const isAllCheck = checkBox.every((check) => this.state[check] === "y");
    const obj = {};
    if (isAllCheck) {
      for (let check of checkBox) {
        obj[check] = "n";
      }
      obj.eventAllCheck = "n";
    } else {
      for (let check of checkBox) {
        obj[check] = "y";
      }
      obj.eventAllCheck = "y";
    }
    this.setState(obj);
  };

  handleReceiveAllCheck = () => {
    const checkBox = ["agreeSMS", "agreeEmail"];
    const isAllCheck = checkBox.every((check) => this.state[check] === "y");
    if (isAllCheck) {
      return "y";
    } else {
      return "n";
    }
  };

  singleCheck = (e) => {
    if (this.state[e.target.name] === "y") {
      this.setState({
        [e.target.name]: "n",
      });
    } else {
      this.setState({ [e.target.name]: "y" });
    }
  };

  checkUserInfo = (e) => {
    const {
      userId,
      userPwd,
      userName,
      userEmail,
      userPhone,
      gender,
      recommender,
      event,
      birthdayYYYY,
      birthdayMM,
      birthdayDD,
      // privacyPolicy,
      // agreeSMS,
      // agreeEmail,
    } = this.state;
    e.preventDefault();
    const userNecessaryinfo = Object.keys(this.state).slice(0, 5);
    const userNecessaryinfo2 = Object.keys(this.state).slice(5, 8);
    const isFull = userNecessaryinfo.every((info) => this.state[info] !== "");
    const isFull2 = userNecessaryinfo2.every(
      (info) => this.state[info] !== "n"
    );
    if (isFull && isFull2) {
      fetch("http://10.58.6.216:8000/user/signup", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          password: userPwd,
          user_name: userName,
          email: userEmail,
          phone: userPhone,
          address: "강서구",
          gender: gender,
          recommender: recommender,
          event: event,
          date_of_birth: `${birthdayYYYY}${birthdayMM}${birthdayDD}`,
          is_privacy_policy: "False",
          is_sms_agreed: "true",
          is_email_agreed: "true",
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log("결과", result));
      // (프론트)저는 다른 페이지로 이동합니다.
    } else {
      console.log("필수사항을 다시 살펴보세요");
    }
  };

  render() {
    console.log(this.state);
    const {
      gender,
      recommendCheck,
      first,
      second,
      privacyPolicy,
      agreeSMS,
      agreeEmail,
      six,
    } = this.state;
    return (
      <div className="Signup">
        <div className="signup-container">
          <div className="signup-header">
            <h3 className="signup-title">회원가입</h3>
            <div className="signup-guide">
              <span className="signup-ico">*</span>필수입력사항
            </div>
          </div>
          <form className="signup-forms">
            <SignupInputForm
              inputContent="아이디"
              textType="text"
              name="userId"
              onOffCount="1"
              writeHolder="6자 이상의 영문 혹은 영문과 숫자를 조합"
              onCheckId={this.checkId}
              onWriteData={this.handleWriteData}
            />
            <SignupInputForm
              inputContent="비밀번호"
              textType="password"
              name="userPwd"
              writeHolder="비밀번호를 입력해주세요"
              onWriteData={this.handleWriteData}
            />
            <SignupInputForm
              inputContent="비밀번호확인"
              textType="password"
              name="userPwdRepeat"
              writeHolder="비밀번호를 한번 더 입력해주세요"
              onWriteData={this.handleWriteData}
            />
            <SignupInputForm
              inputContent="이름"
              textType="text"
              name="userName"
              writeHolder="이름을 입력해주세요"
              onWriteData={this.handleWriteData}
            />
            <SignupInputForm
              inputContent="이메일"
              textType="text"
              name="userEmail"
              onOffCount="2"
              writeHolder="예: deokjjang@gmail.com"
              checkName="중복확인"
              onCheckEmail={this.checkEmail}
              onWriteData={this.handleWriteData}
            />
            <SignupInputForm
              inputContent="휴대폰"
              textType="text"
              name="userPhone"
              writeHolder="숫자만 입력해주세요"
              onWriteData={this.handleWriteData}
            />
            <div className="SignupInputForm address">
              <div className="input-content">
                주소
                <span className="signup-ico">*</span>
              </div>
              <input
                className="signup-input"
                placeholder="카카오 주소검색 넣을거에요"
              ></input>
            </div>
            <div className="SignupInputForm gender-check-container">
              <div className="input-content">성별</div>
              <div className="signup-input special-gender">
                <div className="gender-check-lists">
                  <label className="gender-check-list man">
                    <input
                      type="radio"
                      value="1"
                      checked={gender === "1"}
                      onChange={this.handleGenderCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">남자</span>
                  </label>
                  <label className="gender-check-list woman">
                    <input
                      type="radio"
                      value="2"
                      checked={gender === "2"}
                      onChange={this.handleGenderCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">여자</span>
                  </label>
                  <label className="gender-check-list normal">
                    <input
                      type="radio"
                      value="3"
                      checked={gender === "3"}
                      onChange={this.handleGenderCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">상관없음</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="SignupInputForm birth-write-container">
              <div className="input-content">생년월일</div>
              <div className="signup-input special-birth">
                <input
                  className="birthday birth-year"
                  name="birthdayYYYY"
                  type="number"
                  placeholder="YYYY"
                  onChange={this.handleWriteData}
                />
                <span className="bar">/</span>
                <input
                  className="birthday birth-month"
                  name="birthdayMM"
                  type="number"
                  placeholder="MM"
                  onChange={this.handleWriteData}
                />
                <span className="bar">/</span>
                <input
                  className="birthday birth-day"
                  name="birthdayDD"
                  type="number"
                  placeholder="DD"
                  onChange={this.handleWriteData}
                />
              </div>
            </div>
            <div className="SignupInputForm recommender">
              <div className="input-content">추가입력 사항</div>
              <div className="signup-input special-recommender">
                <div className="recommender-check-lists">
                  <label className="recommender-check-list recommender-id">
                    <input
                      type="radio"
                      value="recommender"
                      checked={recommendCheck === "recommender"}
                      onChange={this.handleRecommendCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">추천인 아이디</span>
                  </label>
                  <label className="recommender-check-list recommend-event-name">
                    <input
                      type="radio"
                      value="event"
                      checked={recommendCheck === "event"}
                      onChange={this.handleRecommendCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">참여 이벤트명</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="SignupInputForm recommend-input-container">
              <div className="input-content"></div>
              <input
                className="signup-input-off"
                name={`${recommendCheck}`}
                placeholder={this.changeRecommendInput()}
                ref={this.recommendInputRef}
                onChange={this.handleWriteData}
              ></input>
            </div>
            <div className="SignupInputForm check-agree">
              <div className="input-content check-agree-content">
                이용약관동의
                <span className="signup-ico">*</span>
              </div>
              <div className="singup-input special-check-agree">
                <div className="check-agree-all">
                  <label className="check-agree-list all-check">
                    <input
                      type="checkbox"
                      name="all"
                      onChange={this.allCheck}
                    />
                    <span className={`checkmark-2 ${this.handleAllCheck()}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span className="all-check-text">전체 동의합니다.</span>
                    <p className="proviso-all">
                      필수 사항에 동의하지 않은 경우도 회원가입 및 일반적인
                      서비스를 이용할 수 없습니다.
                    </p>
                  </label>
                </div>
                <div className="check-agree-lists">
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="first"
                      onChange={this.singleCheck}
                    />
                    <span className={`checkmark-2 ${first}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span>이용약관 동의</span>
                    <span className="proviso">(필수)</span>
                  </label>
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="second"
                      onChange={this.singleCheck}
                    />
                    <span className={`checkmark-2 ${second}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span>개인정보처리방침 동의</span>
                    <span className="proviso">(필수)</span>
                  </label>
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="privacyPolicy"
                      onChange={this.singleCheck}
                    />
                    <span className={`checkmark-2 ${privacyPolicy}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span>개인정보처리방침 동의</span>
                    <span className="proviso">(선택)</span>
                  </label>
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="eventAll"
                      onChange={this.receiveAllCheck}
                    />
                    <span
                      className={`checkmark-2 ${this.handleReceiveAllCheck()}`}
                    >
                      <i className="fas fa-check"></i>
                    </span>
                    <span>무료배송,할인쿠폰 등 혜택/정보 수신 동의</span>
                    <span className="proviso">(선택)</span>
                  </label>
                  <div className="check-email-sms">
                    <label className="check-agree-list">
                      <input
                        type="checkbox"
                        name="agreeSMS"
                        onChange={this.singleCheck}
                      />
                      <span className={`checkmark-2 ${agreeSMS}`}>
                        <i className="fas fa-check"></i>
                      </span>
                      <span>SMS</span>
                    </label>
                    <label className="check-agree-list">
                      <input
                        type="checkbox"
                        name="agreeEmail"
                        onChange={this.singleCheck}
                      />
                      <span className={`checkmark-2 ${agreeEmail}`}>
                        <i className="fas fa-check"></i>
                      </span>
                      <span>이메일</span>
                    </label>
                  </div>
                  <p className="sms-info">
                    <span>⌞</span>
                    <span>동의 시 한 달간 [5% 적립] + [무제한 무료배송]</span>
                    <span>(첫 주문 후 적용)</span>
                  </p>
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="six"
                      onChange={this.singleCheck}
                    />
                    <span className={`checkmark-2 ${six}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span>본인은 만 14세 이상입니다</span>
                    <span className="proviso">(필수)</span>
                  </label>
                </div>
              </div>
            </div>
            <button className="signup-complete" onClick={this.checkUserInfo}>
              가입하기
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
