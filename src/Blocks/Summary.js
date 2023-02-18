import React from "react";

export default function Summary({ status }) {
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

  return (
    <div>
      {status.rain === null ||
      status.waterLevel === null ||
      status.pumps === null
        ? "？"
        : totalScore(status)}
      {status.rain}
      {status.waterLevel}
      {status.pumps}
    </div>
  );
}
