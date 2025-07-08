import React, { useState } from "react";
import { useCatchPokemon, useReleasePokemon } from "../hooks/pokemon";
import { Button } from "@mui/material";

function CatchReleaseButton({
  name,
  initialCaught,
}: {
  name: string;
  initialCaught: boolean;
}) {
  const [caught, setCaught] = useState(initialCaught);

  const catchMutation = useCatchPokemon();
  const releaseMutation = useReleasePokemon();

  const handleCatchRelease = async () => {
    if (!name) return;

    if (!caught) {
      catchMutation.mutate(name, {
        onSuccess: () => setCaught(true),
        onError: () => setCaught(false),
      });
    } else {
      releaseMutation.mutate(name, {
        onSuccess: () => setCaught(false),
        onError: () => setCaught(true),
      });
    }
  };

  return (
    <Button
      variant={caught ? "outlined" : "contained"}
      color={caught ? "secondary" : "primary"}
      onClick={handleCatchRelease}
      disabled={catchMutation.isPending || releaseMutation.isPending}
    >
      {caught ? "Release" : "Catch"}
    </Button>
  );
}

export default CatchReleaseButton;
