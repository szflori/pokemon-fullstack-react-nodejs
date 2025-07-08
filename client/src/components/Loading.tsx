import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;
