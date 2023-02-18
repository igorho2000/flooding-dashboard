import React from "react";

export default function Rain({ data }) {
  const output = data.map((item) => (
    <div key={item.stationName}>
      <div>{warningCode(item.rain)}</div>
      <p>
        {item.stationName}：{item.rain}
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

  return <div>{data.length !== 0 && output}</div>;
}
