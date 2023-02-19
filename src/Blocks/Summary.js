import React from "react";
import Signal from "../Utilities/Signal";

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

  const rainMessage = {
    green: "未達豪雨標準",
    gold: "雨量達豪雨標準",
    orange: "雨量達大豪雨標準",
    red: "雨量達超大豪雨標準",
  };
  const waterLevelMessage = {
    green: "河川及下水道水位皆正常",
    gold: "河川或下水道其一達黃色警戒",
    orange: "河川或下水道其一達紅色警戒",
    red: "河川或下水道都達到紅色警戒",
  };
  const pumpsMessage = {
    green: "水位正常不運轉/水位高漲運轉中",
    gold: "多組機械失常",
  };
  const colorMessage = {
    green: "不會淹水",
    gold: "低機率淹水",
    orange: "中機率淹水",
    red: "極可能淹水",
  };

  function totalColor(status) {
    if (
      status.rain === null ||
      status.waterLevel === null ||
      status.pumps === null
    ) {
      return "gray";
    } else if (totalScore(status) > 90) {
      return "green";
    } else if (totalScore(status) > 80) {
      return "gold";
    } else if (totalScore(status) > 65) {
      return "orange";
    } else if (totalScore(status) > 50) {
      return "red";
    }
  }

  return (
    <div>
      <h3 className="subtitle">綜合考量三參數計算淹水可能性</h3>
      <div className="summary">
        <div>
          <div className="summary-info">
            <h3>降雨</h3>
            <Signal color={status.rain}>{rainMessage[status.rain]}</Signal>
          </div>
          <div className="summary-info">
            <h3>水位</h3>
            <Signal color={status.waterLevel}>
              {waterLevelMessage[status.waterLevel]}
            </Signal>
          </div>
          <div className="summary-info">
            <h3>抽水</h3>
            <Signal color={status.pumps}>{pumpsMessage[status.pumps]}</Signal>
          </div>
        </div>
        <div className="summary-score">
          <h4>不淹水可能性</h4>
          <div
            style={{
              color: totalColor(status),
              borderColor: totalColor(status),
            }}
          >
            <h4>{totalScore(status)}</h4>
          </div>
          <p>{colorMessage[totalColor(status)]}</p>
        </div>
      </div>
    </div>
  );
}
