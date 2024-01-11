import React from "react";
import backBtn from "../../assets/icons/backArrowIcon.svg";
import "./style.scss";
const BackBtn = () => {
  return (
    <button className="backBtnCont">
      <img src={backBtn} alt="" />
      <span>Geri</span>
    </button>
  );
};

export default BackBtn;
