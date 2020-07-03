import React from "react";
//// projetc files
import styles from "./circle-icon.module.scss";


const CircleIcon = ({ temp }) => {
  ///Return
  return (
    <svg height="100" width="100">
      <g>
        <circle
          cx="25"
          cy="25"
          r="15"
          stroke="gray"
          strokeWidth="1"
          fill="#F50057"
        />
        <text x="18%" y="30%" className={styles.text}>
          {Math.round(temp)}
        </text>
      </g>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};

export default CircleIcon;
