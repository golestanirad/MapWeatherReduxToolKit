import React from "react";
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red; 
`;

export default class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div  style={{ backgroundColor:"pink" }}>
        <ClockLoader
          css={override}      
          size={30}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
