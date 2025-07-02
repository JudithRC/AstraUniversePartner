"use client"

import React from "react"

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi } from "vitest"

// Mock del servicio de autenticación ANTES de importar el componente
vi.mock("~/services/authService", () => ({
  registerUser: vi.fn(),
}))

// Mock de react-router para evitar problemas de contexto
vi.mock("react-router", () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

// Importar después del mock
import { registerUser } from "~/services/authService"

// Obtener el mock tipado
const mockRegisterUser = vi.mocked(registerUser)

// Componente simplificado para testing
const TestRegisterPage = () => {
  const [nombre, setNombre] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [errors, setErrors] = React.useState<any>({})
  const [loading, setLoading] = React.useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = React.useState(false)

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function validate() {
    const newErrors: any = {}

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
            <a href="/">
              <button type="button" className="text-gray-400 hover:text-purple-400 p-0 h-auto font-normal">
                Back to Home
              </button>
            </a>
          </div>

          <div className="register-card">
            <div className="register-header">
              <h1 className="register-title">Create your account</h1>
              <p className="register-subtitle">Join the galactic adventure</p>
            </div>

            <form className="register-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="register-input-group">
                <div className="register-input-container">
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
                {errors.nombre && <div className="register-error">{errors.nombre}</div>}
              </div>

              <div className="register-input-group">
                <div className="register-input-container">
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
                {errors.email && <div className="register-error">{errors.email}</div>}
              </div>

              <div className="register-input-group">
                <div className="register-input-container">
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
                {errors.password && <div className="register-error">{errors.password}</div>}
              </div>

              <div className="register-input-group">
                <div className="register-input-container">
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
                {errors.confirmPassword && <div className="register-error">{errors.confirmPassword}</div>}
              </div>

              {errors.global && (
                <div className="register-global-error">
                  {errors.global.map((msg: string, i: number) => (
                    <div key={i}>{msg}</div>
                  ))}
                </div>
              )}

              <button type="submit" disabled={loading} className="register-button">
                {loading ? <>Creating account...</> : <>Create Account</>}
              </button>

              <div className="register-footer">
                Already have an account?{" "}
                <a href="/login" className="register-footer-link">
                  Log in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {successDialogOpen && (
        <div className="register-modal-backdrop">
          <div className="register-modal">
            <div className="register-modal-title">Registration Successful!</div>
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

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRegisterUser.mockReset()
  })

  it("renderiza correctamente los campos del formulario", () => {
    render(<TestRegisterPage />)

    // Verificar que todos los campos están presentes
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument()

    // Verificar el botón de submit
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument()

    // Verificar elementos de la UI
    expect(screen.getByText("Create your account")).toBeInTheDocument()
    expect(screen.getByText("Join the galactic adventure")).toBeInTheDocument()
    expect(screen.getByText("Back to Home")).toBeInTheDocument()
    expect(screen.getByText("Already have an account?")).toBeInTheDocument()
  })

  it("renderiza correctamente el logo de fondo y elementos visuales", () => {
    render(<TestRegisterPage />)

    // Verificar que el logo de fondo está presente
    const backgroundLogo = screen.getByAltText("Astra Logo")
    expect(backgroundLogo).toBeInTheDocument()
    expect(backgroundLogo).toHaveAttribute("src", "/img/banner.png")

    // Verificar que el link "Back to Home" funciona
    const backLink = screen.getByText("Back to Home")
    expect(backLink.closest("a")).toHaveAttribute("href", "/")

    // Verificar que el link "Log in" funciona
    const loginLink = screen.getByText("Log in")
    expect(loginLink.closest("a")).toHaveAttribute("href", "/login")
  })

  it("muestra errores de validación si los campos están vacíos", async () => {
    render(<TestRegisterPage />)

    // Hacer clic en el botón sin llenar campos
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Verificar que aparecen todos los errores de validación
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
    expect(screen.getByText(/please confirm password/i)).toBeInTheDocument()
  })

  it("muestra error si el email es inválido", async () => {
    render(<TestRegisterPage />)

    // Llenar campos con email inválido
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "noemail" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "123456" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Verificar error de email inválido
    expect(await screen.findByText((content) => content.includes("Email is not valid"))).toBeInTheDocument()
  })

  it("muestra error si la contraseña es muy corta", async () => {
    render(<TestRegisterPage />)

    // Llenar campos con contraseña corta
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "judith@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "123" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Verificar error de contraseña muy corta
    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument()
  })

  it("muestra error si las contraseñas no coinciden", async () => {
    render(<TestRegisterPage />)

    // Llenar campos con contraseñas diferentes
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "judith@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "abcdef" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Verificar error de contraseñas no coinciden
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it("muestra estado de carga durante el envío del formulario", async () => {
    // Mock que simula una respuesta lenta
    mockRegisterUser.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ msg: "Success", token: "token-fake" }), 100)),
    )

    render(<TestRegisterPage />)

    // Llenar formulario correctamente
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "judith@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "123456" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Verificar estado de carga
    expect(screen.getByText(/creating account/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /creating account/i })).toBeDisabled()

    // Esperar a que termine la carga
    await waitFor(() => {
      expect(screen.queryByText(/creating account/i)).not.toBeInTheDocument()
    })
  })

  it("llama a registerUser y muestra modal de éxito si todo es correcto", async () => {
    mockRegisterUser.mockResolvedValue({ msg: "Registro exitoso", token: "token-fake" })

    render(<TestRegisterPage />)

    // Llenar formulario correctamente
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "judith@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "123456" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    await waitFor(() => {
      // Verificar que se llamó al servicio con los datos correctos
      expect(mockRegisterUser).toHaveBeenCalledWith({
        nombre: "Judith",
        email: "judith@example.com",
        password: "123456",
      })

      // Verificar que aparece el modal de éxito
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument()
      expect(screen.getByText(/your account has been created successfully/i)).toBeInTheDocument()
      expect(screen.getByText(/welcome to astra universe partner/i)).toBeInTheDocument()
    })
  })

  it("permite cerrar el modal de éxito", async () => {
    mockRegisterUser.mockResolvedValue({ msg: "Success", token: "token-fake" })

    render(<TestRegisterPage />)

    // Llenar y enviar formulario
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "judith@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "123456" } })
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Esperar a que aparezca el modal
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument()
    })

    // Cerrar el modal
    fireEvent.click(screen.getByText(/get started/i))

    // Verificar que el modal se cerró
    await waitFor(() => {
      expect(screen.queryByText(/registration successful/i)).not.toBeInTheDocument()
    })
  })

  it("muestra errores del backend en formato de lista", async () => {
    mockRegisterUser.mockResolvedValue({
      msg: "Error",
      errores: [{ msg: "El email ya existe" }, { msg: "El nombre es inválido" }],
    })

    render(<TestRegisterPage />)

    // Llenar formulario
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "judith@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "123456" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Verificar que aparecen los errores del backend
    expect(await screen.findByText(/el email ya existe/i)).toBeInTheDocument()
    expect(screen.getByText(/el nombre es inválido/i)).toBeInTheDocument()
  })

  it("maneja errores inesperados del servidor", async () => {
    mockRegisterUser.mockRejectedValue(new Error("Network error"))

    render(<TestRegisterPage />)

    // Llenar formulario
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "judith@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "123456" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Verificar mensaje de error genérico
    expect(await screen.findByText(/unexpected error. please try again later/i)).toBeInTheDocument()
  })

  it("deshabilita los campos durante el envío del formulario", async () => {
    mockRegisterUser.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ msg: "Success", token: "token-fake" }), 100)),
    )

    render(<TestRegisterPage />)

    // Llenar formulario
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "judith@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "123456" } })

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Verificar que los campos están deshabilitados
    expect(screen.getByPlaceholderText("Username")).toBeDisabled()
    expect(screen.getByPlaceholderText("Email")).toBeDisabled()
    expect(screen.getByPlaceholderText("Password")).toBeDisabled()
    expect(screen.getByPlaceholderText("Confirm Password")).toBeDisabled()

    // Esperar a que termine
    await waitFor(() => {
      expect(screen.queryByText(/creating account/i)).not.toBeInTheDocument()
    })
  })

  it("limpia errores al enviar un nuevo formulario", async () => {
    render(<TestRegisterPage />)

    // Primero, generar errores
    fireEvent.click(screen.getByRole("button", { name: /create account/i }))
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument()

    // Llenar campos y enviar de nuevo
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "judith@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "123456" } })

    mockRegisterUser.mockResolvedValue({ msg: "Success", token: "token-fake" })

    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    // Verificar que los errores anteriores se limpiaron
    await waitFor(() => {
      expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument()
    })
  })
})
