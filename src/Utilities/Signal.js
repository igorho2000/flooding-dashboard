import React from "react";

export default function Signal({ color, children }) {
  const code = {
    red: "警戒",
    orange: "注意",
    gold: "異狀",
    green: "正常",
    gray: "待查",
  };

  return (
    <div className="signal">
      <p className="signal-tag" style={{ backgroundColor: color }}>
        {code[color]}
      </p>
      <p className="signal-text">{children}</p>
    </div>
  );
}
