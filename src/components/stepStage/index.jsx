import "./style.scss";
const StepStage = ({ width }) => {
  return (
    <div className="line-cont">
      <div className="line" style={{ width: width }}></div>
    </div>
  );
};

export default StepStage;
