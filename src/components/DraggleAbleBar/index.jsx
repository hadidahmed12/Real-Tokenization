import React, { useState, useRef } from "react";

const DraggableProgressBar = ({ label, value, setValue, min, max }) => {
  const progressBarRef = useRef(null);

  const handleDrag = (e) => {
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    const newValue = Math.min(
      Math.max((offsetX / rect.width) * (max - min) + min, min),
      max
    );
    setValue(newValue);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handleDrag(e);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e) => {
    handleDrag(e);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between">
        <p style={{ fontSize: "14px" }} className="redgultedettxt">
          {label}
        </p>
        {label.includes("Initial") ? (
          <h3 className="fgryu76i87u6">{Math.round(value)}</h3>
        ) : (
          <h3 className="fgryu76i87u6">{Number(value).toFixed(2)}%</h3>
        )}
      </div>
      <div className="progress-containerr mt-3" ref={progressBarRef}>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          style={{
            width: `${((value - min) / (max - min)) * 100}%`,
            backgroundColor: "red",
            height: "100%",
            transition: "width 0.3s",
          }}
        >
          <span className="sr-only">{value}% Complete</span>
        </div>
        <div className="dsadsa">
          <div
            className="draggable-circle"
            onMouseDown={handleMouseDown}
            style={{
              left: `${((value - min) / (max - min)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DraggableProgressBar;
