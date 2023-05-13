import React from "react";
import { Loading } from "../components/Loading";

const ApiStateHandler = ({ loading, error, children }) => {
  if (error) {
    return "Something went wrong. Please try again later.";
  }
  return loading ? <Loading /> : children;
};

export default ApiStateHandler;
