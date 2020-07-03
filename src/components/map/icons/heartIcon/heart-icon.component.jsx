import React from "react";
/// project files
import styles from './heart-icon.module.scss';

const HeartIcon = ({ temp }) => {
  return (
    <svg height="100" width="100">
      <g>
        <path
          fill="#F50057"
          stroke="gray"
          strokeWidth="1"
          d="M30 4.435c-1.989-5.399-14-6.597-14 5.568 2 6.068 5.06 11.481 14 16.997 10.94-7.516 14-12.929 14-16.997 2-10.118-12-10.999-14-5.568z"
        />
        <text x="22%" y="17%" className={styles.text}>
          {Math.round(temp)}
        </text>
      </g>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}; 

export default HeartIcon;
