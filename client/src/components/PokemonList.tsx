import React, { useMemo } from "react";
import { usePokemonsByType } from "../hooks/pokemon";
import { Grid } from "@mui/material";
import PokemonCard from "./PokemonCard";
import Loading from "./Loading";

type Props = {
  selectedType: string;
  search: string;
};

function PokemonList({ selectedType, search }: Props) {
  const {
    data: pokemons,
    isLoading,
    isError,
  } = usePokemonsByType(selectedType);

  const filteredPokemons = useMemo(() => {
    if (!pokemons) return [];
    return pokemons.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemons, search]);

  if (!selectedType) return null;
  if (isLoading) return <Loading />;
  if (isError || !pokemons) return <p>Failed to load pokemons.</p>;

  return (
    <Grid container spacing={2}>
      {filteredPokemons.map((name) => (
        <PokemonCard key={name} name={name} />
      ))}
    </Grid>
  );
}

export default PokemonList;
