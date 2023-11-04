import React from "react";

const HigherOrderComponent = ({ Component, props }) => {
  return <Component {...props} />;
};

export default HigherOrderComponent;
