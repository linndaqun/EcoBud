import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";

export default function Component1() {
  return (
    <Spring
      from={{ opacity: 0, marginTop: -500 }}
      to={{ opacity: 1, marginTop: 0 }}
    >
      {(props) => (
        <div style={props}>
          <div style={goal}>
            <h1>Goal/Purpose</h1>
            <p>
              The 2020 Summer Startup Team works with sustainability //
              organizations at Mudd like ASHMC sustainability and Engineers of a
              // Sustainable World to help promote more eco-friendly practices
              on // our campus by providing real-life incentives.
            </p>
          </div>
        </div>
      )}
    </Spring>
  );
}

const goal = {
  background: "#00bf76",
  color: "white",
  padding: "1.5rem",
  borderRadius: "10px",
};