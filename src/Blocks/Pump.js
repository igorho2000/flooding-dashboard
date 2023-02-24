import React from "react";
import { pumpsData } from "../data/data";

export default function Pump({ data }) {
  return (
    <div>
      <h3 className="subtitle">水位正常抽水站不啟用，反之啟用排水</h3>
      <div className="pump">
        <div style={{ width: `${data * 0.9}%` }}></div>
        <div style={{ width: `${(100 - data) * 0.9}%` }}></div>
      </div>
      <div className="pump-legend">
        <div className="pump-legend-item">
          <div></div>
          <p>
            關閉機台：<strong>{data}</strong>%
          </p>
        </div>
        <div className="pump-legend-item">
          <div></div>
          <p>
            開啟機台：<strong>{100 - data}</strong>%
          </p>
        </div>
      </div>
    </div>
  );
}
