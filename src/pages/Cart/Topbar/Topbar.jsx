import React from "react";

const TopBar = ({ steps, activeStep }) => (
  <div className='row'>
    <div className='topbar-container'>
      {steps.map((step, index) => (
        <div key={index} className='topbar-step-container'>
          <div
            className={`topbar-step ${activeStep === index ? "active" : ""}`}
          >
            <span>{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`divider ${
                activeStep > index ? "active-divider" : "inactive-divider"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default TopBar;
