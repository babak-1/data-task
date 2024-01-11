import React from "react";
import "./style.scss";
import FormComp from "../form";
import OnlyTopic from "../onlyTopic";
const TopicList = () => {
  return (
    <div className="list-and-form-cont">
      <OnlyTopic />
      <div>
        <FormComp />
      </div>
    </div>
  );
};

export default TopicList;
