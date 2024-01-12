import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tick from "../../assets/icons/tick.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/features/listsSlice";
import nextBtn from "../../assets/icons/nextArrowIcon.svg";
import backBtn from "../../assets/icons/backArrowIcon.svg";
import { Link, useParams } from "react-router-dom";
import StepStage from "../stepStage";

const FormComp = () => {
  // calendar code
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [checked, setChecked] = useState(false);
  const [formdata, setFormData] = useState(null);
  const data = useSelector((state) => state.lists);
  const [nextBtnStyle, setNextBtnStyle] = useState("none");
  const { id } = useParams();
  const dispatch = useDispatch();

  const descArr = ["Fiziki əmək", "Sənət", "Ali ixtisas", "Sahibkar"];
  const degreeArr = [
    "Təcrübəçi",
    "Kiçik mütəxəssis",
    "Mütəxəssis",
    "Baş mütəxəssis",
    "Unit Leader",
    "Department Head",
    "C-level",
  ];

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

  const [selectedOption, setSelectedOption] = useState("yes");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  console.log(selectedOption);
  // useform
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    console.log(data, "submit");
    data.practice = selectedOption;
    data.startDate = startDate;
    data.endDate = endDate;
    data.id = uuidv4();

    if (Object.values(data).includes(null)) {
      return;
    } else setNextBtnStyle("auto");
    setFormData(data);
  };

  const handleAddFunc = () => {
    dispatch(add(formdata));
    reset();
  };

  return (
    <div>
      <div
        className={selectedOption === "yes" ? "form-cont" : "hiddenForm"}
        style={{ height: data.length !== 0 ? "500px" : "630px" }}
      >
        <h2 className="headding-form">İş təcrübəsi</h2>
        <StepStage width="50%" />
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h3
            className="headdings-form"
            style={{ display: data.length !== 0 ? "none" : "block" }}
          >
            İş təcrübəniz var?
          </h3>
          <div
            className="checkbox-cont"
            style={{ display: data.length !== 0 ? "none" : "flex" }}
          >
            <label htmlFor="yes" className="checkbox-label">
              Beli
              <input
                type="radio"
                id="yes"
                name="radioGroup"
                value="yes"
                checked={selectedOption === "yes"}
                onChange={handleOptionChange}
                className="checkbox"
              />
            </label>

            <label htmlFor="no" className="checkbox-label">
              Xeyr
              <input
                type="radio"
                id="no"
                name="radioGroup"
                value="no"
                checked={selectedOption === "no"}
                onChange={handleOptionChange}
                className="checkbox"
              />
            </label>
          </div>

          <div
            className={
              selectedOption === "yes"
                ? "registerLabelInputGroups"
                : "hiddenBlock"
            }
          >
            <label htmlFor="company" className="form-label">
              Çalışdığınız müəssisənin adını qeyd edin.*
            </label>
            <input
              {...register("company", { required: "Boş buraxıla bilməz" })}
              type="text"
              id="company"
              className="formInputs"
              disabled={selectedOption === "no"}
            />
            {errors.company && (
              <span className="registerErrMsg">{errors.company.message}</span>
            )}
          </div>

          <div
            className={
              selectedOption === "yes"
                ? "registerLabelInputGroups"
                : "hiddenBlock"
            }
          >
            <label htmlFor="position" className="form-label">
              Vəzifənizi qeyd edin.*
            </label>
            <input
              {...register("position", { required: "Boş buraxıla bilməz" })}
              type="text"
              id="position"
              className="formInputs"
              disabled={selectedOption === "no"}
            />
            {errors.position && (
              <span className="registerErrMsg">{errors.position.message}</span>
            )}
          </div>

          <div
            className={
              selectedOption === "yes" ? "contSelectors" : "hiddenBlock"
            }
          >
            <div className="contSelector">
              <h4>Əmək fəaliyyət forması:</h4>
              <select {...register("description")} className={"select"}>
                {descArr?.map((item, index) => (
                  <option key={index} value={item} className={"options"}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="contSelector">
              <h4>Peşəkarlıq dərəcəsi:</h4>
              <select {...register("degree")} className={"select"}>
                {degreeArr?.map((item, index) => (
                  <option key={index} value={item} className={"options"}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            className={
              selectedOption === "yes" ? "contCalendars" : "hiddenBlock"
            }
          >
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
                disabled={selectedOption === "no"}
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
                disabled={selectedOption === "no"}
              />
              <img src={calendarIcon} alt="" className="calendarIcon" />
            </div>
          </div>
          <div
            className={
              selectedOption === "yes" ? "currentStatus" : "hiddenBlock"
            }
          >
            <label className="currentLabel">Hal hazırda çalışıram</label>
            <input
              type="checkbox"
              className="currentInput"
              onChange={handleChangeCurrentInput}
            />
          </div>
          <button
            type="submit"
            className={`${
              selectedOption === "no" ? "hiddenBlock" : "saveBtn"
            } ${(startDate === null) | (endDate === null) ? "disabled" : ""}`}
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
          onClick={handleAddFunc}
          style={{ pointerEvents: nextBtnStyle }}
        >
          <span>Növbəti</span> <img src={nextBtn} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default FormComp;
