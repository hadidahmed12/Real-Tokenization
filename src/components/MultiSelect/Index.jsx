// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import { useController } from "react-hook-form";

// const MultiSelectDropdown = ({
//   control,
//   name,
//   options,
//   label,
//   defaultValue,
//   required,
//   error,
//   disabled,
// }) => {
//   const {
//     field: { value, onChange },
//   } = useController({
//     name,
//     control,
//     rules: { required },
//   });

//   const [selectedOptions, setSelectedOptions] = useState([]);

//   // Effect to set selectedOptions when defaultValue changes
//   useEffect(() => {
//     if (defaultValue) {
//       const initialSelectedOptions = defaultValue.map((val) => {
//         const option = options.find((o) => o.value === val);
//         return option
//           ? { label: option.label, value: option.value }
//           : { label: val, value: val };
//       });
//       setSelectedOptions(initialSelectedOptions);
//       onChange(initialSelectedOptions.map((option) => option.value)); // Update the form state
//     }
//   }, [defaultValue, options, onChange]); // Run effect when defaultValue or options change

//   const handleSelectChange = (selectedOptions) => {
//     setSelectedOptions(selectedOptions);
//     onChange(selectedOptions.map((option) => option.value)); // Update form state on change
//   };

//   const filteredOptions = options.filter(
//     (option) =>
//       !selectedOptions.some(
//         (selectedOption) => selectedOption.value === option.value
//       )
//   );

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       boxShadow: "none",
//       "&:focus-within": {
//         borderColor: "#ececec",
//       },
//       backgroundColor: "dark",
//       borderRadius: "32px",
//     }),
//     option: (base, { data, isFocused }) => ({
//       ...base,
//       color: data.isSubHeading
//         ? isFocused
//           ? "gray"
//           : "black"
//         : isFocused
//         ? "black"
//         : "black",
//       fontWeight: data.isSubHeading ? "bolder" : "normal",
//       backgroundColor: data.isSubHeading
//         ? isFocused
//           ? "lightgray"
//           : "#ececec"
//         : isFocused
//         ? "#ececec"
//         : "dark",
//       cursor: data.isSubHeading ? "not-allowed" : "pointer",
//     }),
//   };

//   return (
//     <div>
//       <label className="my-2">{label}</label>
//       <Select
//         isDisabled={disabled}
//         styles={customStyles}
//         value={selectedOptions}
//         placeholder={`Select ${label}`}
//         isMulti
//         options={filteredOptions.map((option) => ({
//           ...option,
//           isDisabled: option.isSubHeading,
//         }))}
//         onChange={handleSelectChange}
//         isOptionDisabled={(option) => option.isSubHeading}
//       />
//       {error && <p className="error-class-form">{error}</p>}
//     </div>
//   );
// };

// export default MultiSelectDropdown;

import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { useController } from "react-hook-form";

const MultiSelectDropdown = ({
  control,
  name,
  options,
  label,
  defaultValue,
  required,
  error,
  disabled,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: { required },
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const isFirstRender = useRef(true); // Track first render to avoid triggering `onChange` initially

  // Effect to set selectedOptions when defaultValue changes
  useEffect(() => {
    if (!defaultValue || !Array.isArray(defaultValue)) return;

    const initialSelectedOptions = defaultValue.map((val) => {
      const option = options.find((o) => o.value === val);
      return option
        ? { label: option.label, value: option.value }
        : { label: val, value: val };
    });

    setSelectedOptions(initialSelectedOptions);

    if (!isFirstRender.current) {
      onChange(initialSelectedOptions.map((option) => option.value)); // Update the form state only after the first render
    } else {
      isFirstRender.current = false; // Skip first render
    }
  }, [defaultValue, options]); // Removed `onChange` to prevent infinite loops

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    onChange(selectedOptions.map((option) => option.value)); // Update form state on change
  };

  const filteredOptions = options.filter(
    (option) =>
      !selectedOptions.some(
        (selectedOption) => selectedOption.value === option.value
      )
  );

  const customStyles = {
    control: (base) => ({
      ...base,
      boxShadow: "none",
      "&:focus-within": {
        borderColor: "#ececec",
      },
      backgroundColor: "dark",
      borderRadius: "32px",
    }),
    option: (base, { data, isFocused }) => ({
      ...base,
      color: data.isSubHeading
        ? isFocused
          ? "gray"
          : "black"
        : isFocused
        ? "black"
        : "black",
      fontWeight: data.isSubHeading ? "bolder" : "normal",
      backgroundColor: data.isSubHeading
        ? isFocused
          ? "lightgray"
          : "#ececec"
        : isFocused
        ? "#ececec"
        : "dark",
      cursor: data.isSubHeading ? "not-allowed" : "pointer",
    }),
  };

  return (
    <div>
      <label className="my-2">{label}</label>
      <Select
        isDisabled={disabled}
        styles={customStyles}
        value={selectedOptions}
        placeholder={`Select ${label}`}
        isMulti
        options={filteredOptions.map((option) => ({
          ...option,
          isDisabled: option.isSubHeading,
        }))}
        onChange={handleSelectChange}
        isOptionDisabled={(option) => option.isSubHeading}
      />
      {error && <p className="error-class-form">{error}</p>}
    </div>
  );
};

export default MultiSelectDropdown;
