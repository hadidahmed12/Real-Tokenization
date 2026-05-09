import { forwardRef } from "react";
import Form from "react-bootstrap/Form";

const Index = forwardRef(
  (
    {
      htmlFor,
      type,
      id,
      label,
      placeholder,
      error,
      autoComplete,
      name,
      max,
      register,
      min,
      onChange,
      maxlength,
      onKeyDown,
      disabled,
      required,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="d-flex flex-column">
        <Form.Label htmlFor={htmlFor}>
          {label}
          {required && (
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          )}
        </Form.Label>
        <Form.Control
          onChange={onChange}
          ref={ref}
          type={type}
          id={id}
          aria-describedby="passwordHelpBlock"
          autoComplete={autoComplete && autoComplete}
          name={name && name}
          placeholder={placeholder && placeholder}
          // {...register(name)}
          {...(register ? register(name) : {})}
          max={max && max}
          min={min && min}
          maxLength={maxlength && maxlength}
          onKeyDown={onKeyDown && onKeyDown}
          disabled={disabled ? true : false}
          {...rest}
        />
        {error && (
          // error && (
          <p className="error-class-form">{error}</p>
        )}
      </div>
    );
  }
);

export default Index;
