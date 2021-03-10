import React from "react";
import Select from "react-select";
import "./SelectStyles.scss";

function CustomSelect(props) {
  const customStyle = {
    option: (base, state) => {
      console.log("state", state);

      return {
        ...base,
        backgroundColor: state.isSelected
          ? "#4b5548"
          : state.isFocused
          ? "transparent"
          : "#ffffff",
        padding: "2rem",
      };
    },
  };
  return (
    <Select
      classNamePrefix="select"
      isSearchable={false}
      {...props}
      styles={customStyle}
    />
  );
}

export default CustomSelect;
