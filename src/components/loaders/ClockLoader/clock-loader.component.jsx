import React from "react";
import { css } from "@emotion/core";
import _ClockLoader from "react-spinners/ClockLoader";

const override = css`
  display: block;
  margin: 5px auto;
  border-color: red;
`;

const ClockLoader = () => {
  /// Return
  return (
    <_ClockLoader css={override} size={40} color={"#123abc"} loading={true} />
  );
};
export default ClockLoader;
