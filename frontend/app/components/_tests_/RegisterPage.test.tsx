import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../RegisterPage';
import { vi } from 'vitest';

vi.mock('../../services/authService', () => ({
  registerUser: vi.fn(),
}));

import { registerUser } from '../../services/authService';

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza correctamente los campos del formulario', () => {
    render(<RegisterPage />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('muestra errores de validación si los campos están vacíos', async () => {
    render(<RegisterPage />);
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/please confirm password/i)).toBeInTheDocument();
  });

  it('muestra error si el email es inválido', async () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Judith' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'noemail' } });
    fireEvent.blur(screen.getByPlaceholderText('Email')); // <-- fuerza validación en algunos componentes
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Usa función como matcher
    expect(
      await screen.findByText((content) => content.includes('Email is not valid'))
    ).toBeInTheDocument();
  });

  it('muestra error si las contraseñas no coinciden', async () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Judith' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'judith@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'abcdef' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Usa el mensaje real de tu formulario
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('llama a registerUser y muestra éxito si todo es correcto', async () => {
    const mockRegisterUser = registerUser as unknown as ReturnType<typeof vi.fn>;
    mockRegisterUser.mockResolvedValue({ token: 'token-fake', msg: 'Registro exitoso' });

    render(<RegisterPage />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Judith' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'judith@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith({
        nombre: 'Judith', // cambia a "nombre"
        email: 'judith@example.com',
        password: '123456'
      });
      expect(screen.getByText(/registro exitoso/i)).toBeInTheDocument();
    });
  });

  it('muestra errores del backend', async () => {
    const mockRegisterUser = registerUser as unknown as ReturnType<typeof vi.fn>;
    mockRegisterUser.mockResolvedValue({
      errores: [
        { msg: 'El email ya existe' },
        { msg: 'El nombre es inválido' }
      ]
    });

    render(<RegisterPage />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Judith' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'judith@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(/el email ya existe/i)).toBeInTheDocument();
    expect(screen.getByText(/el nombre es inválido/i)).toBeInTheDocument();
  });
});