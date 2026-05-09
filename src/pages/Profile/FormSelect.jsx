export const FormSelect = ({
  name,
  label,
  options,
  register,
  placeholder,
  className,
  value,
  onChange,
}) => {
  const classNames = ["customSelect", className].filter(Boolean).join(" ");

  const optionsTransfer = options?.map((val) => {
    return { label: val, value: val };
  });

  return (
    <div className="custom-select-wrapper">
      {label && (
        <label className="label-input" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="custom-select-container">
        <select
          onChange={onChange}
          {...(register ? register(name) : {})}
          className={classNames}
          value={value || ""}
        >
          <option key={placeholder} value={""} hidden disabled>
            {placeholder}
          </option>
          {optionsTransfer?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
        <span className="custom-icon mr-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3333 6.6665L8.31481 9.68502C7.95833 10.0415 7.375 10.0415 7.01852 9.68502L4 6.6665"
              stroke="#1F0303"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};
export default FormSelect;
