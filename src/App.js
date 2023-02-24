import "./App.css";
import React, { useState } from "react";
import Block from "./Utilities/Block";
import Rain from "./Blocks/Rain";
import WaterLevel from "./Blocks/WaterLevel";
import Pump from "./Blocks/Pump";
import Source from "./Blocks/Source";
import Summary from "./Blocks/Summary";

import { riverLevel, undergroundLevel, pumpsData, rain } from "./data/data";
import axios from "axios";
import Loading from "./Utilities/Loading";

function App() {
  const [summary, setSummary] = useState({
    color: "gray",
    text: ["？", "？", "？"],
  });
  const [status, setStatus] = useState({
    rain: "gray",
    waterLevel: "gray",
    pumps: "gray",
  });
  const [data, setData] = useState({
    rain: null,
    river: null,
    underground: null,
    pumps: null,
  });
  const [update, setUpdate] = useState({
    time: "",
    isUpdating: true,
  });

  React.useEffect(() => {
    axios
      .get("https://tinyurl.com/j9t6jxds")
      .then((res) => {
        const cleaned = cleanRainData(res.data);
        setData((state) => ({
          ...state,
          rain: cleaned,
        }));
      })
      .catch((err) =>
        setData((state) => ({
          ...state,
          rain: null,
        }))
      );
    axios
      .get("https://tinyurl.com/yvtzcthz")
      .then((res) => {
        const cleaned = cleanWaterLevelData(res.data);
        setData((state) => ({
          ...state,
          river: cleaned,
        }));
      })
      .catch((err) =>
        setData((state) => ({
          ...state,
          river: null,
        }))
      );
    axios
      .get("https://ppt.cc/f7TqBx")
      .then((res) => {
        const cleaned = cleanWaterLevelData(res.data);
        setData((state) => ({
          ...state,
          underground: cleaned,
        }));
      })
      .catch((err) =>
        setData((state) => ({
          ...state,
          underground: null,
        }))
      );
    axios
      .get("https://tinyurl.com/2yhzsjpv")
      .then((res) => {
        const cleaned = cleanPumpsData(res.data);
        setData((state) => ({
          ...state,
          pumps: cleaned,
        }));
      })
      .catch((err) =>
        setData((state) => ({
          ...state,
          pumps: null,
        }))
      );
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    setUpdate((state) => ({
      time:
        "最近更新時間：" +
        year +
        "年" +
        month +
        "月" +
        day +
        "日" +
        hours +
        "時" +
        minutes +
        "分" +
        seconds +
        "秒",
      isUpdating: false,
    }));
  }, [update.isUpdating]);

  React.useEffect(() => {
    setStatus((state) => ({
      ...state,
      rain: data.rain !== null ? rainWarningCode(data.rain) : "gray",
      waterLevel:
        data.river !== null || data.underground !== null
          ? waterLevelWarningCode(data.underground, data.river)
          : "gray",
    }));
  }, [data]);

  function cleanRainData(object) {
    let array = object.data;
    array.sort((a, b) => {
      return b.rain - a.rain;
    });
    const output = array.splice(0, 10);
    return output;
  }

  function rainWarningCode(value) {
    if (value > 100) {
      return "red";
    } else if (value > 85) {
      return "orange";
    } else if (value > 60) {
      return "gold";
    } else {
      return "green";
    }
  }

  const undergroundBase = 9.524;
  const riverBase = 6.785;

  function cleanWaterLevelData(object) {
    const arr = object.data;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].levelOut;
    }
    return Math.floor((sum / arr.length) * 1000) / 1000;
  }

  function waterLevelWarningCode(underground, river) {
    const undergroundBase = 9.524;
    const riverBase = 6.785;

    if (underground === null || river === null) {
      return "gray";
    }

    if (underground > undergroundBase + 5 && river > riverBase + 5) {
      return "red";
    } else if (underground > undergroundBase + 5 || river > riverBase + 5) {
      return "orange";
    } else if (underground > undergroundBase + 2 || river > riverBase + 2) {
      return "gold";
    } else {
      return "green";
    }
  }

  function cleanPumpsData(object) {
    const pumpNo = object.count;
    const pumpArray = object.data;
    let closed = 0;
    for (let i = 0; i < pumpArray.length; i++) {
      if (pumpArray[i].allPumbLights === "-") {
        closed += 1;
      }
    }
    return Math.floor((closed / pumpNo) * 100);
  }

  React.useEffect(() => {
    if (status.waterLevel === "gray" || data.pumps === null) {
      setStatus((state) => ({ ...state, pumps: "gray" }));
      return;
    }

    if (
      (status.waterLevel === "green" && data.pumps < 90) ||
      (status.waterLevel === "red" && data.pumps > 10)
    ) {
      setStatus((state) => ({ ...state, pumps: "gold" }));
    } else {
      setStatus((state) => ({ ...state, pumps: "green" }));
    }
  }, [status.waterLevel, data.pumps]);

  function codeToScore(value) {
    if (value === null) {
      return null;
    } else if (value === "green") {
      return 33;
    } else if (value === "gold") {
      return 22;
    } else if (value === "orange") {
      return 11;
    } else {
      return 0;
    }
  }

  function totalScore(object) {
    return (
      codeToScore(object.rain) +
      codeToScore(object.waterLevel) +
      codeToScore(object.pumps)
    );
  }
  React.useEffect(() => {
    if (
      status.rain === "gray" ||
      status.waterLevel === "gray" ||
      status.pumps === "gray"
    ) {
      setSummary({ color: "gray", text: ["？", "？", "？"] });
    } else if (totalScore(status) > 90) {
      setSummary({ color: "green", text: ["絕", "不", "會"] });
    } else if (totalScore(status) > 80) {
      setSummary({ color: "gold", text: ["機", "率", "低"] });
    } else if (totalScore(status) > 65) {
      setSummary({ color: "orange", text: ["需", "提", "防"] });
    } else if (totalScore(status) > 50) {
      setSummary({ color: "red", text: ["極", "可", "能"] });
    }
  }, [status]);

  return (
    <div className="App">
      <header className="header">
        <div>
          <h1>
            台北市
            {summary.text.map((item, index) => (
              <div
                style={{ color: summary.color }}
                key={`titleKeyword${index}`}
              >
                {item}
              </div>
            ))}
            淹
          </h1>
        </div>
        <div className="update">
          <button
            className="update-button"
            onClick={() =>
              setUpdate((state) => ({
                ...state,
                isUpdating: state.isUpdating ? false : true,
              }))
            }
            style={{
              opacity: update.isUpdating && 0.3,
              pointerEvents: update.isUpdating && "none",
            }}
          >
            {update.isUpdating ? "更新中" : "再次更新"}
          </button>
          <p>{update.time}</p>
        </div>
      </header>
      <div className="body">
        <div className="blocks">
          <Block title="淹水三大參數">
            <Summary status={status} />
          </Block>
          <Block title="雨勢及降雨量" status={status.rain}>
            {data.rain === null ? (
              <Loading />
            ) : (
              <Rain data={data.rain} status={status.rain} />
            )}
          </Block>
          <Block title="資料來源">
            <Source />
          </Block>
          <Block title="河川/下水道水位" status={status.waterLevel}>
            {data.river === null || data.underground === null ? (
              <Loading />
            ) : (
              <WaterLevel
                data={{ river: data.river, underground: data.underground }}
                undergroundBase={undergroundBase}
                riverBase={riverBase}
              />
            )}
          </Block>
          <Block title="抽水站啟動狀態" status={status.pumps}>
            {data.pumps === null ? <Loading /> : <Pump data={data.pumps} />}
          </Block>
        </div>
      </div>
    </div>
  );
}

export default App;
