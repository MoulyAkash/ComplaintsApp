import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function SpecialSelect({
  values,
  currentValue,
  setCurrentValue,
  containerStyle,
}) {
  const [selectOpen, setSelectOpen] = useState(false);

  return (
    <div
      className="special-select-wrapper"
      onClick={() => setSelectOpen(!selectOpen)}
    >
      {currentValue + " Complaints"}
      <FaChevronDown size={12} />
      <div className={`special-select-dropdown ${selectOpen ? "open" : null}`}>
        {values.map((item, index) => (
          <div
            key={index}
            className="special-select-item"
            onClick={() => setCurrentValue(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
