"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router"
import { Button } from "./ui/button"
import { User, Lock, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from "lucide-react"
import { loginUser } from "../services/authService"
import "../assets/styles/login.css"

interface ErrorMessages {
  nombre?: string
  password?: string
  global?: string[]
}

const LoginPage: React.FC = () => {
  // State hooks for form fields and UI state
  const [nombre, setNombre] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<ErrorMessages>({})
  const [loading, setLoading] = useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)

  function validate() {
    const newErrors: ErrorMessages = {}

    if (!nombre.trim()) newErrors.nombre = "Username is required"
    if (!password) newErrors.password = "Password is required"

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
      const result = await loginUser({ nombre, password })
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
    <div className="login-page">
      <div className="login-background"></div>
      <div className="login-background-pattern"></div>
      <img src="/img/banner.png" alt="Astra Logo" className="login-logo-bg" aria-hidden="true" draggable={false} />

      <div className="login-container">
        <div className="login-form-wrapper">
          <div style={{ marginBottom: "1.5rem" }}>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-0 h-auto font-normal">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="login-card">
            <div className="login-header">
              <h1 className="login-title">Welcome to Astra Partner</h1>
              <p className="login-subtitle">Sign in to continue your galactic journey</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="login-input-group">
                <div className="login-input-container">
                  <User className="login-input-icon" />
                  <input
                    type="text"
                    placeholder="Username"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    disabled={loading}
                    className="login-input"
                    autoComplete="username"
                  />
                </div>
                {errors.nombre && (
                  <div className="login-error">
                    <AlertCircle className="w-4 h-4" />
                    {errors.nombre}
                  </div>
                )}
              </div>

              <div className="login-input-group">
                <div className="login-input-container">
                  <Lock className="login-input-icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="login-input"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && (
                  <div className="login-error">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </div>
                )}
              </div>

              {errors.global && (
                <div className="login-global-error">
                  {errors.global.map((msg, i) => (
                    <div key={i}>{msg}</div>
                  ))}
                </div>
              )}

              <button type="submit" disabled={loading} className="login-button">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" style={{ display: "inline" }} />
                    Signing in...
                  </>
                ) : (
                  "Explore!"
                )}
              </button>

              <div className="login-footer">
                Don't have an account yet?{" "}
                <Link to="/register" className="login-footer-link">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {successDialogOpen && (
        <div className="login-modal-backdrop">
          <div className="login-modal">
            <div className="login-modal-title">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Welcome Back!
            </div>
            <p className="login-modal-description">
              You have successfully logged in to Astra Universe Partner. Ready to explore the galaxy?
            </p>
            <button onClick={() => setSuccessDialogOpen(false)} className="login-modal-button">
              Start Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginPage
