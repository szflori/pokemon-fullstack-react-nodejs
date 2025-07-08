import { useMutation, useQuery } from "@tanstack/react-query";
import {
  catchPokemon,
  getAllPokemonNames,
  getMyPokemonByName,
  getMyPokemons,
  getPokemonDetails,
  getPokemonNamesByType,
  getPokemonTypes,
  releasePokemon,
} from "../api/pokemon";
import { queryClient } from "../queryClient";

export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ["pokemon-types"],
    queryFn: getPokemonTypes,
    staleTime: 10 * 60 * 1000,
  });
};

export const usePokemonsByType = (type: string | null) => {
  return useQuery({
    queryKey: ["pokemons", type],
    queryFn: () => getPokemonNamesByType(type as string),
    enabled: !!type,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAllPokemonNames = () => {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: getAllPokemonNames,
    staleTime: 60 * 60 * 1000,
  });
};

export function usePokemonDetails(name: string | null) {
  return useQuery({
    queryKey: ["pokemons", name],
    queryFn: () => getPokemonDetails(name as string),
    enabled: !!name,
    staleTime: 1000 * 60 * 10, // 10 perc
  });
}

export const useCatchPokemon = () => {
  return useMutation({
    mutationFn: catchPokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-pokemons"] });
    },
  });
};

export const useReleasePokemon = () => {
  return useMutation({
    mutationFn: releasePokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-pokemons"] });
    },
  });
};

export function useCaughtPokemonByName(name: string | null) {
  return useQuery({
    queryKey: ["my-pokemons", name],
    queryFn: () => getMyPokemonByName(name as string),
    enabled: !!name,
    retry: false,
  });
}

export function useMyPokemons() {
  return useQuery({
    queryKey: ["my-pokemons"],
    queryFn: getMyPokemons,
  });
}
