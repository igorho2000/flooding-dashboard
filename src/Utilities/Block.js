import React from "react";
import Signal from "./Signal";

export default function Block({ children, title, status }) {
  return (
    <div className="block">
      <div className="block-container">
        <h2 className="block-title">{title}</h2>
        <Signal color={status} />
      </div>

      {children}
    </div>
  );
}
