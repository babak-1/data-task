import React, { useState } from "react";
import "./style.scss";
const OnlyTopic = () => {
  const [active, setActive] = useState(4);
  const arr = [
    "Təhsil",
    "Dil Bilikləri",
    "Bacarıqlar",
    "İdman",
    "İş təcrübəsi",
    "Program",
  ];
  return (
    <ul className="list">
      {arr.map((item, index) => (
        <li
          className={active != index ? "item" : "item active-item"}
          key={index}
          onClick={() => setActive(index)}
        >
          <span className={active != index ? "hiddenNumber" : ""}>
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default OnlyTopic;
