import "./App.css";
import React, { useState } from "react";
import Block from "./Utilities/Block";
import Rain from "./Blocks/Rain";
import WaterLevel from "./Blocks/WaterLevel";
import Pump from "./Blocks/Pump";
import Source from "./Blocks/Source";
import Summary from "./Blocks/Summary";

function App() {
  const [summary, setSummary] = useState(["？", "？", "？"]);

  function changeSummary() {}

  const cors = "https://cors-anywhere.herokuapp.com/";

  return (
    <div className="App">
      <header className="header">
        <h1>
          台北市
          {summary.map((item, index) => (
            <div key={`titleKeyword${index}`}>{item}</div>
          ))}
          淹
        </h1>
      </header>
      <div className="body">
        <div className="blocks">
          <Block title="淹水三大參數">
            <Summary />
          </Block>
          <Block title="雨勢及降雨量">
            <Rain />
          </Block>
          <Block title="資料來源">
            <Source />
          </Block>
          <Block title="河川/下水道水位">
            <WaterLevel />
          </Block>
          <Block title="抽水站啟動狀態">
            <Pump />
          </Block>
        </div>
      </div>
    </div>
  );
}

export default App;
