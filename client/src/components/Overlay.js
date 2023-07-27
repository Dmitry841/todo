import React, { useContext } from "react";
import { Context } from "../index";

const Overlay = ({ show, text }) => {
  const { todos } = useContext(Context);
  if (show) {
    setTimeout(() => {
      todos.setOverlayText("");
    }, 3000);
  }
  return show ? (
    <div className="overlay_wrapper">
      <div className="overlay">
        <span className="overlay_text">{text}</span>
      </div>
    </div>
  ) : null;
};

export default Overlay;
