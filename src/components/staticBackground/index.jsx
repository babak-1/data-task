import React from "react";
import "./style.scss";
import backgroundIcon from "../../assets/icons/backGroundIcon.svg";
import logoIcon from "../../assets/icons/logoIcon.svg";
import manIcon from "../../assets/icons/manIcon.svg";

const StaticBack = () => {
  return (
    <div className="svg-cont">
      <div className="main-svg">
        <div className="line first"></div>
        <div className="line second"></div>

        <img src={backgroundIcon} alt="" />

        <h1 className="headding">
          <img src={logoIcon} alt="" />

          <div className="text-cont">
            <p className="text">Suni intelekt sistemi</p>
            <p className="text">
              Bu formu doldurduqdan sonra öz yaşıdlarınız arasında ən yaxşı
              hansı faizlikdə olduğunuzu müəyyən edə biləcəksiniz.
            </p>
          </div>
        </h1>
      </div>

      <div className="human-icon">
        <img src={manIcon} alt="" />
      </div>
    </div>
  );
};

export default StaticBack;
