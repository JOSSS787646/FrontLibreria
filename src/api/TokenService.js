// tokenService.js
import axios from 'axios';

export const generarToken = async (servicio) => {
  try {
    const response = await axios.post("https://microservicioautortoken.somee.com/api/token/generate", {
      servicio,
    });
    return response.data; // <- Esto debe ser un objeto tipo { token: '...' }
  } catch (error) {
    console.error("Error generando token:", error);
    throw error;
  }
};

export const generarTokenLibros = async (servicio) => {
  try {
    const response = await axios.post("https://microserviciolibrotoken.somee.com/api/token/generate", {
      servicio,
    });
    return response.data; // <- Esto debe ser un objeto tipo { token: '...' }
  } catch (error) {
    console.error("Error generando token:", error);
    throw error;
  }
};

