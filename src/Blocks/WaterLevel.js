import React from "react";

export default function WaterLevel({ data, undergroundBase, riverBase }) {
  return (
    <div className="waterlevel">
      <h3 className="subtitle">台北市區內水位平均資料</h3>
      <div className="waterlevel-container">
        <div className="waterlevel-item">
          <div className="waterlevel-graph">
            <div style={{ opacity: data.river > riverBase + 5 && 0.9 }}>
              紅色警戒 ( 大於 {riverBase + 5}m )
            </div>
            <div
              style={{
                opacity:
                  data.river <= riverBase + 5 &&
                  data.river > riverBase + 2 &&
                  0.9,
              }}
            >
              黃色警戒 ( {riverBase + 2}m ~ {riverBase + 5}m )
            </div>
            <div style={{ opacity: data.river <= riverBase + 2 && 0.9 }}>
              正常水位 ( 小於 {riverBase + 2}m )
            </div>
          </div>
          <p>
            目前河川水位：<strong>{data.river}</strong>m
          </p>
        </div>
        <div className="waterlevel-item">
          <div className="waterlevel-graph">
            <div
              style={{ opacity: data.underground > undergroundBase + 5 && 0.9 }}
            >
              紅色警戒 ( 大於 {undergroundBase + 5}m )
            </div>
            <div
              style={{
                opacity:
                  data.underground <= undergroundBase + 5 &&
                  data.underground > undergroundBase + 2 &&
                  0.9,
              }}
            >
              黃色警戒 ( {undergroundBase + 2}m ~ {riverBase + 5}m )
            </div>
            <div
              style={{
                opacity: data.underground <= undergroundBase + 2 && 0.9,
              }}
            >
              正常水位 ( 小於 {undergroundBase + 2}m )
            </div>
          </div>
          <p>
            目前排水道水位：<strong>{data.underground}</strong>m
          </p>
        </div>
      </div>
    </div>
  );
}
