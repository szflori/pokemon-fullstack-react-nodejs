import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router";

import Header from "./components/Header";

const MainLayout = () => {
  return (
    <Box height="100%">
      <Header />
      <Box
        component="main"
        maxWidth="xl"
        height="100%"
        sx={{ display: "flex", flexDirection: "column", mx: "auto" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
