import React, { useState } from "react";
import "./index.css";

import Select from "react-select";

// Choose your dorm!
const dorms = [
  {
    value: 1,
    label: "Atwood",
    // isDisabled: true,
  },
  {
    value: 2,
    label: "Case",
  },
  {
    value: 3,
    label: "Drinkward",
  },
  {
    value: 4,
    label: "East",
  },
  {
    value: 5,
    label: "Linde",
    // isDisabled: true,
  },
  {
    value: 6,
    label: "North",
  },
  {
    value: 7,
    label: "Sontag",
  },
  {
    value: 8,
    label: "South",
  },
  {
    value: 9,
    label: "West",
  },
];

function Dropdown2() {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (obj) => {
    setSelectedValue(obj.label.replace(/"([^"]+)":/g, "$1:"));
    // the .replace was supposed to get rid of quotes but it didn't work
  };

  if (localStorage.getItem('selectedDorm') == null) {
    localStorage.setItem('selectedDorm', "Not Selected");
  }

  // original if statement I wrote
  if (selectedValue != null) {
    localStorage.setItem('selectedDorm', selectedValue);
  } else {
    setSelectedValue(localStorage.getItem('selectedDorm'));
  }

  const customStyles = {
    option: (styles, state) => ({
      ...styles,
      color: state.isSelected ? "#FFF" : styles.color,
      backgroundColor: state.isSelected ? "#24a113" : "white",
      borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
    
      "&:hover": {
        color: state.isDisabled ? "lightgrey" : "black",
        fontWeight: state.isFocused ? "bold" : "normal",
        backgroundColor: state.isDisabled ? "white" : "#24a113",
      },
    }),
    control: (styles, state) => ({
      ...styles,
      boxShadow: state.isFocused ? "0 0 0 0.2rem #24a113)" : 0,
      borderColor: state.isFocused ? "#D0EAE2" : "#CED4DA",

      cursor: state.isDisabled ? "not-allowed" : "default",

      "&:hover": {
        borderColor: state.isFocused ? "#24a113" : "#24a113",
      },
    }),
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Earn Points for Your Dorm! </h1>{" "}
      <br />
      <Select
        styles={customStyles}
        value={dorms.find((x) => x.label === selectedValue)}
        options={dorms}
        onChange={handleChange}
        isOptionDisabled={(option) => option.isDisabled}
        placeholder="Select your dorm..."
      />
      <br />
      <b>Your dorm: { localStorage.getItem('selectedDorm') }</b>
      <h1></h1>
    </div>
  );
}

export default Dropdown2;

export {Dropdown2};