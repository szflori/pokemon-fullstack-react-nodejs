import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

import { usePokemonTypes } from "../hooks/pokemon";
import PokemonList from "../components/PokemonList";

const HomePage = () => {
  const {
    data: types,
    isLoading: isTypeLoading,
    isError: isTypeError,
  } = usePokemonTypes();

  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  if (isTypeLoading) {
    return <CircularProgress />;
  }

  if (isTypeError || !types) {
    return <Typography>Error loading types</Typography>;
  }

  const handleTypeChange = (e: any) => {
    setSelectedType(e.target.value as string);
    setSearchTerm("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Pokémon Explorer
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={selectedType} onChange={handleTypeChange} label="Type">
            {types.map((type) => (
              <MenuItem key={type.name} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search by name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      <PokemonList selectedType={selectedType} search={searchTerm} />
    </Box>
  );
};

export default HomePage;
