import React from "react";
import "./style.css";

const InputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  isTextArea = false,
  rows = 4,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-wrapper">
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          required
          className={`custom-input ${error ? "input-error" : ""}`}
          value={value}
          onChange={handleChange}
          rows={rows}
          style={{ width: "100%" }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          required
          className={`custom-input ${error ? "input-error" : ""}`}
          value={value}
          onChange={handleChange}
        />
      )}
      <div className="error-message">{error && <span>{error}</span>}</div>
    </div>
  );
};

export default InputField;
