import React from "react";
import Select from "react-select";
import "./SelectStyles.scss";

function CustomSelect(props) {
  const customStyle = {
    option: (base, state) => {
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
  return <Select isSearchable={false} {...props} styles={customStyle} />;
}

export default CustomSelect;
