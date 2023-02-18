import React from "react";
import { undergroundLevel, riverLevel } from "../data/data";

export default function WaterLevel({ data }) {
  return (
    <div>
      {data.underground}
      {data.river}
    </div>
  );
}
