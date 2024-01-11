import React from "react";
import "./style.scss";
import deleteIcon from "../../assets/icons/delete.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../store/features/listsSlice";
import BackBtn from "../backBtn";
import NextBtn from "../nextBtn";
const ResultData = () => {
  const data = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(remove(id));
  };
  console.log(data, "datam");
  return (
    <div className="resultBigCont">
      <div className="listFormCont">
        <h2 className="headding-form">İş təcrübəsi</h2>

        <ul className="listsResult">
          {data.map((item, index) => (
            <li className="listResult" key={item.id}>
              <Link className="listLink" to={`/edit/${item.id}`}>
                <div className="firstPartData">
                  <span className="resultText">{index + 1}.</span>
                  <span className="resultText">{item.company}</span>
                  <span className="resultText">{item.position}</span>
                </div>
                <div className="secondPartdata">
                  <span className="resultText">
                    {`${(item.startDate.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/${item.startDate.getFullYear()}`}
                    &nbsp; -
                  </span>
                  <span className="resultText">
                    &nbsp;{" "}
                    {`${(item.endDate.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/${item.endDate.getFullYear()}`}
                  </span>
                </div>
              </Link>

              <img
                src={deleteIcon}
                alt=""
                className="deleteIcon"
                onClick={() => handleDelete(item.id)}
              />
            </li>
          ))}
        </ul>
        <Link to="/" className="createItem">
          Yeni iş yeri əlavə et +
        </Link>
      </div>
      <div className="btns">
        <BackBtn />
        <NextBtn />
      </div>
    </div>
  );
};

export default ResultData;
