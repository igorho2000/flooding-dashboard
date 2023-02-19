import "./App.css";
import React, { useState } from "react";
import Block from "./Utilities/Block";
import Rain from "./Blocks/Rain";
import WaterLevel from "./Blocks/WaterLevel";
import Pump from "./Blocks/Pump";
import Source from "./Blocks/Source";
import Summary from "./Blocks/Summary";

import { riverLevel, undergroundLevel, pumpsData, rain } from "./data/data";

function App() {
  const [summary, setSummary] = useState({
    color: "gray",
    text: ["？", "？", "？"],
  });
  const [status, setStatus] = useState({
    rain: rainWarningCode(cleanRainData(rain)),
    waterLevel: waterLevelWarningCode(
      cleanWaterLevelData(undergroundLevel),
      cleanWaterLevelData(riverLevel)
    ),
    pumps: null,
  });
  const [data, setData] = useState({
    rain: cleanRainData(rain),
    waterLevel: {
      underground: cleanWaterLevelData(undergroundLevel),
      river: cleanWaterLevelData(riverLevel),
    },
    pumps: cleanPumpsData(pumpsData),
  });

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

  React.useEffect(() => {
    // fetch(`${cors}https://tinyurl.com/j9t6jxds`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     let array = data.data;
    //     array.sort((a, b) => {
    //       return b.rain - a.rain;
    //     });
    //     let arrayOutput = array.splice(0, 10);
    //     setTopRain(arrayOutput);
    //   });
  }, []);

  function cleanRainData(object) {
    let array = object.data;
    array.sort((a, b) => {
      return b.rain - a.rain;
    });
    const output = array.splice(0, 15);
    return output;
  }

  const undergroundBase = 9.524;
  const riverBase = 6.785;

  React.useEffect(() => {
    // // river
    // fetch(`${cors}https://tinyurl.com/yvtzcthz`)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // // underground
    // fetch(`${cors}https://ppt.cc/f7TqBx`)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  }, []);

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

  // React.useEffect(() => {
  //   fetch(`${cors}https://tinyurl.com/2yhzsjpv`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       var open = 0;
  //       var close = 0;
  //       const pumps = data.count;
  //       for (let i = 0; i < data.data.length; i++) {
  //         if (data.data[i].allPumbLights === "-") {
  //           close += 1;
  //         } else {
  //           open += 1;
  //         }
  //       }
  //       setPumps([
  //         Math.floor((close / pumps) * 100),
  //         Math.floor((open / pumps) * 100),
  //       ]);
  //     });
  // }, []);

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
      status.rain === null ||
      status.waterLevel === null ||
      status.pumps === null
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
        <h1>
          台北市
          {summary.text.map((item, index) => (
            <div style={{ color: summary.color }} key={`titleKeyword${index}`}>
              {item}
            </div>
          ))}
          淹
        </h1>
      </header>
      <div className="body">
        <div className="blocks">
          <Block title="淹水三大參數">
            <Summary status={status} />
          </Block>
          <Block title="雨勢及降雨量" status={status.rain}>
            <Rain data={data.rain} status={status.rain} />
          </Block>
          <Block title="資料來源">
            <Source />
          </Block>
          <Block title="河川/下水道水位" status={status.waterLevel}>
            <WaterLevel
              data={data.waterLevel}
              undergroundBase={undergroundBase}
              riverBase={riverBase}
            />
          </Block>
          <Block title="抽水站啟動狀態" status={status.pumps}>
            <Pump data={data.pumps} />
          </Block>
        </div>
      </div>
    </div>
  );
}

export default App;
