import axios from "axios";

// Puedes utilizar variables de entorno de Vite para la URL base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Asegúrate de definir VITE_API_URL en tu .env
  // Puedes agregar aquí headers por defecto, timeout, etc.
});

export default api;