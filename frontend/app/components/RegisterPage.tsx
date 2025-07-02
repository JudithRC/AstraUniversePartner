import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import '../assets/styles/RegisterPage.css';

/**
 * Interface for error messages in the registration form.
 * @typedef {Object} ErrorMessages
 * @property {string} [nombre] - Error for the username field.
 * @property {string} [email] - Error for the email field.
 * @property {string} [password] - Error for the password field.
 * @property {string} [confirmPassword] - Error for the confirm password field.
 * @property {string[]} [global] - Global error messages.
 */
interface ErrorMessages {
  nombre?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  global?: string[];
}

/**
 * RegisterPage component renders the user registration form.
 * Handles form state, validation, and submission.
 * @component
 * @returns {JSX.Element}
 */
const RegisterPage: React.FC = () => {
  // State hooks for form fields and UI state
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ErrorMessages>({});
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  /**
   * Checks if the provided email has a valid format.
   * @param {string} email - The email to validate.
   * @returns {boolean} True if valid, false otherwise.
   */
  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Validates the registration form fields.
   * @returns {ErrorMessages} Object containing validation errors.
   */
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

  /**
   * Handles the form submission event.
   * Performs validation and calls the registerUser service.
   * @param {React.FormEvent} e - The form submission event.
   */
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
      // Llama al servicio de registro de usuario
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
      <form className="register-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
        <h1 className="register-title">Create your account</h1>
        {/* Username input */}
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
        {/* Email input */}
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
        {/* Password input */}
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
        {/* Confirm password input */}
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
        {/* Global error messages */}
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