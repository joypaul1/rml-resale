import React from "react";
import Select from "react-select";

function Select2Dp({ name, optionProps, onChange = () => {}, selectedValue }) {
  const handleOnChange = (selectedOption) => {
    if (onChange && typeof onChange === "function") {
      onChange(selectedOption.value);
    }
  };

  const defaultOption = optionProps.find(
    (option) => option.value === selectedValue
  );

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isDisabled={false}
        isLoading={true}
        isClearable={true}
        isSearchable={true}
        name={name}
        // menuPortalTarget={document.body}
        menuPosition={"fixed"}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999999999 }) }}
        onChange={handleOnChange}
        options={optionProps}
        value={defaultOption || null} // Set default value or null if not found
      />
    </>
  );
}

export default Select2Dp;
