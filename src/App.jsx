import "./App.css";
import EditData from "./components/editData";
import FormComp from "./components/form";
import OnlyTopic from "./components/onlyTopic";
import ResultData from "./components/resultData";
import StaticBack from "./components/staticBackground";
import TopicList from "./components/topicList";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <StaticBack />
      <div className="altCont">
        <OnlyTopic />
        <Routes>
          <Route path="/" element={<FormComp />} />
          <Route path="/list" element={<ResultData />} />
          <Route path="/edit/:id" element={<EditData />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
