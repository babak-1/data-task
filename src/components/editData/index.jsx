import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tick from "../../assets/icons/tick.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import nextBtn from "../../assets/icons/nextArrowIcon.svg";
import backBtn from "../../assets/icons/backArrowIcon.svg";
import "./style.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../../store/features/listsSlice";

const EditData = () => {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState(null);
  const [nextBtnStyle, setNextBtnStyle] = useState("none");
  const { id } = useParams();
  const data = useSelector((state) => state.lists);
  const existingList = data.filter((item) => item.id === id);
  console.log(existingList, "exist");
  const [startDate, setStartDate] = useState(
    new Date(existingList[0]?.startDate)
  );
  const [endDate, setEndDate] = useState(new Date(existingList[0]?.endDate));
  const [editPosition, setEditPosition] = useState(existingList[0].position);
  const [editCompany, setEditCompany] = useState(existingList[0].company);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    data.id = id;
    data.startDate = startDate;
    data.endDate = endDate;

    if (Object.values(data).includes(null)) {
      return;
    } else setNextBtnStyle("auto");
    console.log(data, "edit data");
    setFormData(data);
  };

  function handleChangeCurrentInput(e) {
    setChecked(e.target.checked);
  }

  useEffect(() => {
    setNextBtnStyle("none");
  }, [id]);

  useEffect(() => {
    if (checked) {
      return setEndDate(new Date());
    } else {
      return setEndDate(null);
    }
  }, [checked]);

  const handleEditFunc = () => {
    dispatch(edit(formData));
    reset();
  };
  return (
    <div>
      <div className="editCont">
        <h2 className="headdingEdit">İş təcrübəsi</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className={"registerLabelInputGroups"}>
            <label htmlFor="company" className="form-label">
              Çalışdığınız müəssisənin adını qeyd edin.*
            </label>
            <input
              {...register("company", { required: "Boş buraxıla bilməz" })}
              type="text"
              id="company"
              className="formInputs"
              value={editCompany}
              onChange={(e) => setEditCompany(e.target.value)}
            />
            {errors.company && (
              <span className="registerErrMsg">{errors.company.message}</span>
            )}
          </div>

          <div className={"registerLabelInputGroups"}>
            <label htmlFor="position" className="form-label">
              Vəzifənizi qeyd edin.*
            </label>
            <input
              {...register("position", { required: "Boş buraxıla bilməz" })}
              type="text"
              id="position"
              className="formInputs"
              value={editPosition}
              onChange={(e) => setEditPosition(e.target.value)}
            />
            {errors.position && (
              <span className="registerErrMsg">{errors.position.message}</span>
            )}
          </div>

          <div className="contCalendar">
            <h3 className="calendarHeadding">İşə başlama tarixi:</h3>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={endDate || new Date()}
              className="calendar"
            />
            <img src={calendarIcon} alt="" className="calendarIcon" />
          </div>

          <div className="contCalendar">
            <h3 className="calendarHeadding">İşdən ayrılma tarixi:</h3>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={new Date()}
              className="calendar"
            />
            <img src={calendarIcon} alt="" className="calendarIcon" />
          </div>

          <div className={"currentStatus"}>
            <label className="currentLabel">Hal hazırda çalışıram</label>
            <input
              type="checkbox"
              className="currentInput"
              onChange={handleChangeCurrentInput}
            />
          </div>

          <button
            type="submit"
            className={`${"saveBtn"} ${
              (startDate === null) | (endDate === null) ? "disabled" : ""
            }`}
            disabled={(startDate === null) | (endDate === null)}
          >
            <span>Yadda saxla</span>
            <img src={tick} alt="" />
          </button>
        </form>
      </div>
      <div className="btnsCont">
        <Link className="backBtnCont">
          <img src={backBtn} alt="" />
          <span>Geri</span>
        </Link>
        <Link
          className="nextBtnCont"
          to="/list"
          onClick={handleEditFunc}
          style={{ pointerEvents: nextBtnStyle }}
        >
          <span>Növbəti</span> <img src={nextBtn} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default EditData;
