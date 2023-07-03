import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const Button = ({
  variant = "primary",
  link = "",
  className,
  children,
  disable,
  ...rest
}) => {
  const variantClassName = useMemo(() => {
    if (disable) {
      return "btn btn--grey";
    }

    switch (variant) {
      case "primary":
        return "btn btn--primary";

      case "border":
        return "btn btn--border --black";

      default:
        return "";
    }
  }, [variant, disable]);

  if (!link) {
    return (
      <button className={`${variantClassName} ${className ?? ""}`} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <Link
      to={link}
      className={`${variantClassName} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default Button;
