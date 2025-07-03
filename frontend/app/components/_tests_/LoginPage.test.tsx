"use client"

import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi } from "vitest"

// Mock del servicio de autenticación antes de importar el componente
vi.mock("~/services/authService", () => ({
  loginUser: vi.fn(),
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
import { loginUser } from "~/services/authService"
import LoginPage from "../LoginPage"

// Obtener el mock tipado correctamente
const mockLoginUser = loginUser as unknown as jest.Mock

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLoginUser.mockReset()
  })

  it("renderiza correctamente los campos del formulario", () => {
    render(<LoginPage />)

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /explore!/i })).toBeInTheDocument()
    expect(screen.getByText("Welcome to Astra Partner")).toBeInTheDocument()
    expect(screen.getByText("Sign in to continue your galactic journey")).toBeInTheDocument()
    expect(screen.getByText("Back to Home")).toBeInTheDocument()
    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument()
  })

  it("renderiza correctamente el logo de fondo y elementos visuales", () => {
    render(<LoginPage />)
    const backgroundLogo = screen.getByAltText("Astra Logo")
    expect(backgroundLogo).toBeInTheDocument()
    expect(backgroundLogo).toHaveAttribute("src", "/img/banner.png")
    const backLink = screen.getByText("Back to Home")
    expect(backLink.closest("a")).toHaveAttribute("href", "/")
    const registerLink = screen.getByText("Register")
    expect(registerLink.closest("a")).toHaveAttribute("href", "/register")
  })

  it("muestra errores de validación si los campos están vacíos", async () => {
    render(<LoginPage />)
    fireEvent.click(screen.getByRole("button", { name: /explore!/i }))
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it("muestra error si el backend devuelve errores", async () => {
    mockLoginUser.mockResolvedValue({
      errores: [{ msg: "Credenciales inválidas" }, { msg: "Cuenta bloqueada" }],
    })
    render(<LoginPage />)
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.click(screen.getByRole("button", { name: /explore!/i }))
    expect(await screen.findByText(/credenciales inválidas/i)).toBeInTheDocument()
    expect(screen.getByText(/cuenta bloqueada/i)).toBeInTheDocument()
  })

  it("muestra estado de carga durante el envío del formulario", async () => {
    mockLoginUser.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ token: "token-fake" }), 100)),
    )
    render(<LoginPage />)
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.click(screen.getByRole("button", { name: /explore!/i }))
    expect(screen.getByText(/signing in/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled()
    await waitFor(() => {
      expect(screen.queryByText(/signing in/i)).not.toBeInTheDocument()
    })
  })

  it("llama a loginUser y muestra modal de éxito si todo es correcto", async () => {
    mockLoginUser.mockResolvedValue({ token: "token-fake" })
    render(<LoginPage />)
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.click(screen.getByRole("button", { name: /explore!/i }))
    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({ nombre: "Judith", password: "123456" })
      expect(screen.getByText(/welcome back!/i)).toBeInTheDocument()
      expect(screen.getByText(/you have successfully logged in/i)).toBeInTheDocument()
    })
  })

  it("permite cerrar el modal de éxito", async () => {
    mockLoginUser.mockResolvedValue({ token: "token-fake" })
    render(<LoginPage />)
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.click(screen.getByRole("button", { name: /explore!/i }))
    await waitFor(() => {
      expect(screen.getByText(/welcome back!/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/start exploring/i))
    await waitFor(() => {
      expect(screen.queryByText(/welcome back!/i)).not.toBeInTheDocument()
    })
  })

  it("maneja errores inesperados del servidor", async () => {
    mockLoginUser.mockRejectedValue(new Error("Network error"))
    render(<LoginPage />)
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.click(screen.getByRole("button", { name: /explore!/i }))
    expect(await screen.findByText(/unexpected error. please try again later/i)).toBeInTheDocument()
  })

  it("deshabilita los campos durante el envío del formulario", async () => {
    mockLoginUser.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ token: "token-fake" }), 100)),
    )
    render(<LoginPage />)
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    fireEvent.click(screen.getByRole("button", { name: /explore!/i }))
    expect(screen.getByPlaceholderText("Username")).toBeDisabled()
    expect(screen.getByPlaceholderText("Password")).toBeDisabled()
    await waitFor(() => {
      expect(screen.queryByText(/signing in/i)).not.toBeInTheDocument()
    })
  })

  it("limpia errores al enviar un nuevo formulario", async () => {
    render(<LoginPage />)
    fireEvent.click(screen.getByRole("button", { name: /explore!/i }))
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "Judith" } })
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } })
    mockLoginUser.mockResolvedValue({ token: "token-fake" })
    fireEvent.click(screen.getByRole("button", { name: /explore!/i }))
    await waitFor(() => {
      expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument()
    })
  })
})
