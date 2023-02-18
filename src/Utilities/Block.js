import React from "react";

export default function Block({ children, title }) {
  return (
    <div className="block">
      <h2 className="block-title">{title}</h2>
      {children}
    </div>
  );
}
