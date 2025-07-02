"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router"
import { Button } from "./ui/button"
import { User, Mail, Lock, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from "lucide-react"
import { registerUser } from "../services/authService"
import "../assets/styles/register.css"

interface ErrorMessages {
  nombre?: string
  email?: string
  password?: string
  confirmPassword?: string
  global?: string[]
}

const RegisterPage: React.FC = () => {
  // State hooks for form fields and UI state
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<ErrorMessages>({})
  const [loading, setLoading] = useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function validate() {
    const newErrors: ErrorMessages = {}

    if (!nombre.trim()) newErrors.nombre = "Username is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!isValidEmail(email)) newErrors.email = "Email is not valid"
    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm password"
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      const result = await registerUser({ nombre, email, password })
      if (result.errores) {
        setErrors({ global: result.errores.map((err: any) => err.msg) })
      } else if (result.token) {
        setSuccessDialogOpen(true)
      }
    } catch (err) {
      setErrors({ global: ["Unexpected error. Please try again later."] })
    }
    setLoading(false)
  }

  return (
    <div className="register-page">
      <div className="register-background"></div>
      <div className="register-background-pattern"></div>
      <img src="/img/banner.png" alt="Astra Logo" className="register-logo-bg" aria-hidden="true" draggable={false} />

      <div className="register-container">
        <div className="register-form-wrapper">
          <div style={{ marginBottom: "1.5rem" }}>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-0 h-auto font-normal">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="register-card">
            <div className="register-header">
              {/* Eliminado el contenedor del icono de estrella */}
              <h1 className="register-title">Create your account</h1>
              <p className="register-subtitle">Join the galactic adventure</p>
            </div>

            <form className="register-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="register-input-group">
                <div className="register-input-container">
                  <User className="register-input-icon" />
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
                </div>
                {errors.nombre && (
                  <div className="register-error">
                    <AlertCircle className="w-4 h-4" />
                    {errors.nombre}
                  </div>
                )}
              </div>

              <div className="register-input-group">
                <div className="register-input-container">
                  <Mail className="register-input-icon" />
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
                </div>
                {errors.email && (
                  <div className="register-error">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="register-input-group">
                <div className="register-input-container">
                  <Lock className="register-input-icon" />
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
                </div>
                {errors.password && (
                  <div className="register-error">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="register-input-group">
                <div className="register-input-container">
                  <Lock className="register-input-icon" />
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
                </div>
                {errors.confirmPassword && (
                  <div className="register-error">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {errors.global && (
                <div className="register-global-error">
                  {errors.global.map((msg, i) => (
                    <div key={i}>{msg}</div>
                  ))}
                </div>
              )}

              <button type="submit" disabled={loading} className="register-button">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" style={{ display: "inline" }} />
                    Creating account...
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" style={{ display: "inline" }} />
                    Create Account
                  </>
                )}
              </button>

              <div className="register-footer">
                Already have an account?{" "}
                <Link to="/login" className="register-footer-link">
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {successDialogOpen && (
        <div className="register-modal-backdrop">
          <div className="register-modal">
            <div className="register-modal-title">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Registration Successful!
            </div>
            <p className="register-modal-description">
              Your account has been created successfully. Welcome to Astra Universe Partner!
            </p>
            <button onClick={() => setSuccessDialogOpen(false)} className="register-modal-button">
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegisterPage
