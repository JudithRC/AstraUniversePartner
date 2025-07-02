// Servicio para llamadas de autenticación (registro, login, etc.)

export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  msg: string;
  token?: string;
  errores?: { msg: string }[];
}

export async function registerUser(data: RegisterData): Promise<RegisterResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  return result;
}