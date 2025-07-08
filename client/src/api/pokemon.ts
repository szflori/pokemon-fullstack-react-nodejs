import axios from "axios";
import api from "../services/api";

export async function catchPokemon(name: string): Promise<{ message: string }> {
  const res = await api.post("/pokemons/catch", { name });

  return res.data;
}

export async function releasePokemon(
  name: string
): Promise<{ message: string }> {
  const res = await api.post("/pokemons/release", { name });

  return res.data;
}

export async function getMyPokemons(): Promise<
  { name: string; caughtAt: string }[]
> {
  const res = await api.get("/pokemons/my");
  return res.data;
}

export async function getMyPokemonByName(name: string): Promise<boolean> {
  const res = await api.get(`/pokemons/my/${name}`);
  return res.data;
}

export interface PokemonType {
  name: string;
  url: string;
}

export async function getPokemonTypes(): Promise<PokemonType[]> {
  const res = await axios.get("https://pokeapi.co/api/v2/type");
  return res.data.results;
}

export async function getPokemonNamesByType(type: string): Promise<string[]> {
  const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  return res.data.pokemon.map((p: any) => p.pokemon.name);
}

export async function getAllPokemonNames(): Promise<string[]> {
  const res = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  return res.data.results.map((p: any) => p.name);
}

export async function getPokemonDetails(name: string) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.data;
}
