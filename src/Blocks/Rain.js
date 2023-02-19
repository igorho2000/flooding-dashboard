import React from "react";

export default function Rain({ data }) {
  const output = data.map((item) => (
    <div className="rain-item" key={item.stationName}>
      <div style={{ backgroundColor: warningCode(item.rain) }}></div>
      <p>
        {item.stationName}：<strong>{item.rain}</strong> mm
      </p>
    </div>
  ));

  function warningCode(value) {
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

  return (
    <div>
      <h3 className="subtitle">台北降雨量前15大量測站</h3>
      <div className="rain">{data.length !== 0 && output}</div>
    </div>
  );
}
