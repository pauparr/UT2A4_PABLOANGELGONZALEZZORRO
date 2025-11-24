import { useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);
  return (
    <Box sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4">Página no encontrada / Error</Typography>
      <Typography variant="body1">{error?.statusText || error?.message || "Ruta inválida"}</Typography>
    </Box>
  );
}
