/* === src/components/RegisterProgress.jsx === */
import React from "react";

const RegisterProgress = ({ currentStep, steps, icons }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={index} className={`step-item ${index <= currentStep ? 'active' : ''}`}>
          <div className={`step-icon ${index <= currentStep ? 'active' : ''}`}>
            {icons[index]}
          </div>
          <div className={`step-label ${index === currentStep ? 'active' : ''}`}>
            {step}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegisterProgress;