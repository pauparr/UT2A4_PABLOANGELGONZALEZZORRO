import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { authActions } from '../store/authSlice';

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3030/login?user=${usuario}&password=${contrasena}`);
      const result = await response.json();

      if (result.data && result.data.length !== 0) {
        const userData = result.data;

        if (userData && !Array.isArray(userData)) {
          dispatch(authActions.login({
            name: userData.nombre,
            rol: userData.rol
          }))
          navigate("/home");
        } else {
          setMensaje("Usuario o contraseña incorrectos");
        }

      } else {
        setMensaje("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error login:", error);
      setMensaje("Error de conexión");
    }
  };



  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={3} sx={{ width: 400, p: 3, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Login Administrador Pablo Angel Gonzalez Zorro</Typography>


        <Box component="form" onSubmit={handleSubmit}>
          <TextField label="Usuario" fullWidth required margin="normal" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          <TextField label="Contraseña" type="password" fullWidth required margin="normal" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            ACCEDER
          </Button>
        </Box>

        {mensaje && <Alert severity="error" sx={{ mt: 2 }} variant="filled" onClose={() => setMensaje("")}>{mensaje}</Alert>}
      </Paper>
    </Box>
  );
}
