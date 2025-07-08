import React from "react";
import { Card, Grid, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

interface PokemonCardProps {
  name: string;
}

function PokemonCard({ name }: PokemonCardProps) {
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(`/pokemon/${name}`)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PokemonCard;
