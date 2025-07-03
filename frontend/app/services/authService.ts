// Servicio para llamadas de autenticación (registro, login, etc.)

export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

export interface LoginUserData {
  nombre: string
  password: string
}

export interface AuthResponse {
  token?: string
  msg?: string
  errores?: Array<{ msg: string }>
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
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

export async function loginUser(data: LoginUserData): Promise<AuthResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  return result;
}