import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Pokemondex
        </Typography>

        <Box>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/my-pokemons"
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            My Pokemon
          </Button>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
