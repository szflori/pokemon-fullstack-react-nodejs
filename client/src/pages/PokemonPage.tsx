import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import { catchPokemon, releasePokemon } from "../api/pokemon";
import { useCaughtPokemonByName, usePokemonDetails } from "../hooks/pokemon";
import CatchReleaseButton from "../components/CatchReleaseButton";

interface PokemonData {
  name: string;
  weight: number;
  height: number;
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  sprites: { front_default: string };
}

const PokemonPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: pokemon, isLoading, isError } = usePokemonDetails(name ?? "");
  const {
    data: isCaughted,
    isLoading: isCaughtLoading,
    isError: isCaughtError,
  } = useCaughtPokemonByName(name ?? "");

  const navigate = useNavigate();

  if (isLoading || !pokemon) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: 150, height: 150 }}
            />
            <Typography variant="h4" textTransform="capitalize">
              {pokemon.name}
            </Typography>
            <Typography variant="body1">Weight: {pokemon.weight}</Typography>
            <Typography variant="body1">Height: {pokemon.height}</Typography>

            <Typography variant="h6">Abilities</Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              {pokemon.abilities
                .filter((a: any) => !a.is_hidden)
                .map((a: any) => (
                  <Chip key={a.ability.name} label={a.ability.name} />
                ))}
            </Stack>

            <CatchReleaseButton
              name={pokemon.name}
              initialCaught={isCaughted ?? false}
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PokemonPage;
