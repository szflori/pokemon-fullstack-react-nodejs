import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonPage from "./pages/PokemonPage";
import ProtectedRoute from "./guard/ProtectedRoute";
import MyPokemonsPage from "./pages/MyPokemonsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "pokemon",
            children: [
              {
                path: "",
                element: <PokemonListPage />,
              },

              {
                path: ":name",
                element: <PokemonPage />,
              },
            ],
          },

          {
            path: "my-pokemons",
            element: <MyPokemonsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
]);
