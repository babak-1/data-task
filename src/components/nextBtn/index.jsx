import React from "react";
import nextBtn from "../../assets/icons/nextArrowIcon.svg";
import "./style.scss";
const NextBtn = () => {
  return (
    <button className="nextBtnCont">
      <span>Növbəti</span> <img src={nextBtn} alt="" />
    </button>
  );
};

export default NextBtn;
