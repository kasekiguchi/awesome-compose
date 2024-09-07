import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

const Button = ({
  size = "medium",
  visual = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[size],
        styles[visual],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
