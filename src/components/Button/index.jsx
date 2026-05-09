import React from "react";
import Button from "react-bootstrap/Button";

const index = ({
  text,
  variant,
  size,
  leadIcon,
  tailIcon,
  onClick,
  type,
  disabled,
  className,
  isLoading,
}) => {
  return (
    <>
      <Button
        className={className}
        disabled={disabled}
        variant={variant}
        size={size}
        onClick={onClick}
        type={type}
      >
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div>{leadIcon}</div>
          {text}
          <div>{tailIcon}</div>
          {isLoading && <div className="spinner ml-3"></div>}
        </div>
      </Button>
    </>
  );
};

export default index;
