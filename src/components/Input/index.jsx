import React from "react";

const Input = ({
  label,
  required,
  value,
  onChange,
  type = "text",
  error,
  textarea,
  ...inputProps
}) => {
  return (
    <>
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          type={type}
          {...inputProps}
          className={`form__input ${!!error ? "formerror" : ""}`}
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          type={type}
          {...inputProps}
          className={`form__input ${!!error ? "formerror" : ""}`}
        />
      )}

      <p className="error">{error || ""}</p>
    </>
  );
};

export default Input;
