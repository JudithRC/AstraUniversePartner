import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import '../assets/styles/RegisterPage.css';

interface ErrorMessages {
  nombre?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  global?: string[];
}

const RegisterPage: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ErrorMessages>({});
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate() {
    const newErrors: ErrorMessages = {};
    if (!nombre.trim()) newErrors.nombre = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(email)) newErrors.email = 'Email is not valid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser({ nombre, email, password });
      if (result.errores) {
        setErrors({ global: result.errores.map((err: any) => err.msg) });
      } else if (result.token) {
        setSuccessDialogOpen(true);
        
        /** Aquí podrías guardar el token si quieres: 
         * localStorage.setItem('token', result.token);
         * 
         * Por ejemplo, usando React Router:
         * 
         * navigate('/main'); O la ruta que uses para la pantalla principal
         */
      }
    } catch (err) {
      setErrors({ global: ['Unexpected error. Please try again later.'] });
    }
    setLoading(false);
  }

  return (
    <div className="register-container">
      {/* Banner/logo de fondo grande y centrado */}
      <img
        src="/img/banner.png"
        alt="Astra Logo"
        className="background-logo"
        aria-hidden="true"
        draggable={false}
      />
      <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
        <h1 className="register-title">Create your account</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={loading}
            className="register-input"
            autoComplete="username"
          />
          {errors.nombre && (
            <div className="error-message">{errors.nombre}</div>
          )}
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="register-input"
            autoComplete="email"
          />
          {errors.email && (
            <div className="error-message">{errors.email}</div>
          )}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="register-input"
            autoComplete="new-password"
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="register-input"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
        </div>
        {errors.global && (
          <div className="global-error-message">
            {errors.global.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="register-button"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className="login-link">
          Already have an account?{' '}
          <a href="/login">Log in</a>
        </p>
      </form>
      {/* Modal de éxito */}
      {successDialogOpen && (
        <div className="register-modal-backdrop">
          <div className="register-modal">
            <h2>¡Registro exitoso!</h2>
            <p>Tu cuenta se ha creado correctamente.</p>
            <button
              onClick={() => setSuccessDialogOpen(false)}
              className="register-button"
              style={{ marginTop: 20 }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;