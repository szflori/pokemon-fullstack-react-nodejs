import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { useMyPokemons } from "../hooks/pokemon";
import CatchReleaseButton from "../components/CatchReleaseButton";

type SortOption = "name_asc" | "name_desc" | "caught_desc" | "caught_asc";

const MyPokemonsPage = () => {
  const { data: pokemons = [], isLoading, error } = useMyPokemons();

  const [snackbar, setSnackbar] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortOption>("caught_desc");

  const filteredAndSorted = useMemo(() => {
    let filtered = pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sort) {
      case "name_asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "caught_asc":
        filtered.sort(
          (a, b) =>
            new Date(a.caughtAt).getTime() - new Date(b.caughtAt).getTime()
        );
        break;
      case "caught_desc":
        filtered.sort(
          (a, b) =>
            new Date(b.caughtAt).getTime() - new Date(a.caughtAt).getTime()
        );
        break;
    }

    return filtered;
  }, [pokemons, searchTerm, sort]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Pokémons
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Sort by"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          fullWidth
        >
          <MenuItem value="name_asc">Name A-Z</MenuItem>
          <MenuItem value="name_desc">Name Z-A</MenuItem>
          <MenuItem value="caught_desc">Newest</MenuItem>
          <MenuItem value="caught_asc">Oldest</MenuItem>
        </TextField>
      </Stack>

      {filteredAndSorted.length === 0 ? (
        <Typography>No pokémons caught yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredAndSorted.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.name}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Caught at: {new Date(p.caughtAt).toLocaleString()}
                  </Typography>

                  <CatchReleaseButton
                    name={p.name}
                    initialCaught={!!p.caughtAt}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={!!snackbar}
        autoHideDuration={2000}
        onClose={() => setSnackbar("")}
      >
        <Alert onClose={() => setSnackbar("")} severity="success">
          {snackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyPokemonsPage;
