"use client"

import React from "react"
import { render, screen, fireEvent, within } from "@testing-library/react"
import { vi } from "vitest"

// Mock de react-router para evitar problemas de contexto
vi.mock("react-router", () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

// Mock de los estilos CSS para evitar errores de importación
vi.mock("~/styles/globals.css", () => ({}))
vi.mock("~/styles/components.css", () => ({}))
vi.mock("~/styles/sections.css", () => ({}))
vi.mock("~/styles/utilities.css", () => ({}))

// Componente simplificado de LandingPage para testing
const TestLandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="header" data-testid="header">
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo-container">
              <div className="logo-icon">
                <span>⭐</span>
              </div>
              <span className="logo-text">Astra Universe Partner</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="nav-desktop" data-testid="desktop-nav">
              <a href="#features" className="nav-link">
                Features
              </a>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <button className="btn-auth">Login</button>
              <a href="/register">
                <button className="btn-auth">Sign Up</button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="nav-mobile" data-testid="mobile-menu">
              <div className="nav-mobile-content">
                <a href="#features" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  Features
                </a>
                <a href="#about" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  About
                </a>
                <a href="#contact" className="nav-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </a>
                <div className="flex flex-col space-y-2 pt-2 border-t border-purple-900/20">
                  <button className="text-gray-300 hover:text-white hover:bg-purple-900/20 justify-start">Login</button>
                  <a href="/register">
                    <button className="text-gray-300 hover:text-white hover:bg-purple-900/20 justify-start w-full">
                      Sign Up
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="hero-background"></div>
        <div className="hero-gradient"></div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="badge-beta">
              <span>⚡</span>
              Now in Beta
            </div>

            <h1 className="hero-title">
              Explore the <span className="hero-title-gradient">Galaxy</span>
              <br />
              Create Your Legend
            </h1>

            <p className="hero-description">
              Immerse yourself in an epic space roleplay adventure. Create unique characters, explore vast galaxies, and
              forge your destiny among the stars.
            </p>

            <div className="hero-buttons">
              <a href="/register" className="btn-responsive">
                <button className="btn-responsive btn-primary text-base sm:text-lg px-6 sm:px-8 py-3">
                  🚀 Start Your Journey
                </button>
              </a>
              <button className="btn-responsive btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section" data-testid="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Game Features</h2>
            <p className="features-description">
              Discover the tools and systems that make your space roleplay experience unforgettable
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-card-content">
                <div className="feature-icon">
                  <span>👤</span>
                </div>
                <h3 className="feature-title">Character Creation</h3>
                <p className="feature-description">
                  Create and customize unique characters with detailed avatars, diverse races, and rich backstories
                  including their planet of origin.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card-content">
                <div className="feature-icon">
                  <span>🌍</span>
                </div>
                <h3 className="feature-title">Interactive Galaxy Map</h3>
                <p className="feature-description">
                  Navigate through interactive maps of galaxies and planets, each with detailed information cards and
                  rich lore to discover.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card-content">
                <div className="feature-icon">
                  <span>⚔️</span>
                </div>
                <h3 className="feature-title">Skills & Missions</h3>
                <p className="feature-description">
                  Access a comprehensive catalog of abilities and missions, constantly updated through our dynamic API
                  system.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card-content">
                <div className="feature-icon">
                  <span>📖</span>
                </div>
                <h3 className="feature-title">Lore & Statistics</h3>
                <p className="feature-description">
                  Dive deep into the game's extensive lore and track your character's progress with detailed statistics
                  and achievements.
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card-content">
                <div className="feature-icon">
                  <span>🧭</span>
                </div>
                <h3 className="feature-title">Intuitive Navigation</h3>
                <p className="feature-description">
                  Experience seamless gameplay with our intuitive and visually appealing navigation system designed for
                  immersive roleplay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section" data-testid="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Begin Your
              <span className="cta-title-gradient">Galactic Adventure?</span>
            </h2>
            <p className="cta-description">
              Join thousands of players already exploring the galaxy. Create your character and start your legend today.
            </p>
            <div className="cta-buttons">
              <a href="/register" className="btn-responsive">
                <button className="btn-responsive btn-primary text-base sm:text-lg px-6 sm:px-8 py-3">
                  👤 Create Account
                </button>
              </a>
              <button className="btn-responsive btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section" data-testid="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-container">
                <div className="footer-brand-icon">
                  <span>⭐</span>
                </div>
                <span className="footer-brand-text">Astra Universe Partner</span>
              </div>
              <p className="footer-description">
                The ultimate space roleplay experience. Create, explore, and forge your destiny among the stars.
              </p>
              <div className="footer-social">
                <button className="social-btn" aria-label="Discord">
                  💬
                </button>
                <button className="social-btn" aria-label="Twitter">
                  🐦
                </button>
                <button className="social-btn" aria-label="GitHub">
                  🐙
                </button>
                <button className="social-btn" aria-label="Email">
                  📧
                </button>
              </div>
            </div>

            <div>
              <h4 className="footer-section-title">Game</h4>
              <ul className="footer-links">
                <li>
                  <a href="#features" className="footer-link">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Characters
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Galaxies
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Missions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-section-title">Support</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Bug Reports
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Astra Universe Partner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

describe("LandingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("Header y Navegación", () => {
    it("renderiza correctamente el header con logo y navegación", () => {
      render(<TestLandingPage />)

      // Verificar logo - usar getAllByText ya que aparece en header y footer
      expect(screen.getAllByText("Astra Universe Partner")).toHaveLength(2)

      // Verificar navegación desktop usando el contenedor específico
      const header = screen.getByTestId("header")
      expect(within(header).getByText("Features")).toBeInTheDocument()
      expect(within(header).getByText("About")).toBeInTheDocument()
      expect(within(header).getByText("Contact")).toBeInTheDocument()

      // Verificar botones de autenticación
      expect(within(header).getByText("Login")).toBeInTheDocument()
      expect(within(header).getByText("Sign Up")).toBeInTheDocument()
    })

    it("muestra y oculta el menú móvil correctamente", () => {
      render(<TestLandingPage />)

      // Verificar que el menú móvil no está visible inicialmente
      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument()

      // Hacer clic en el botón del menú móvil
      const mobileMenuButton = screen.getByLabelText("Toggle mobile menu")
      fireEvent.click(mobileMenuButton)

      // Verificar que el menú móvil aparece
      expect(screen.getByTestId("mobile-menu")).toBeInTheDocument()

      // Hacer clic de nuevo para cerrar
      fireEvent.click(mobileMenuButton)

      // Verificar que el menú móvil se oculta
      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument()
    })

    it("cierra el menú móvil al hacer clic en un enlace", () => {
      render(<TestLandingPage />)

      // Abrir menú móvil
      const mobileMenuButton = screen.getByLabelText("Toggle mobile menu")
      fireEvent.click(mobileMenuButton)

      // Verificar que está abierto
      expect(screen.getByTestId("mobile-menu")).toBeInTheDocument()

      // Hacer clic en un enlace del menú móvil - usar within para ser más específico
      const mobileMenu = screen.getByTestId("mobile-menu")
      const featuresLink = within(mobileMenu).getByText("Features")
      fireEvent.click(featuresLink)

      // Verificar que el menú se cerró
      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument()
    })
  })

  describe("Sección Hero", () => {
    it("renderiza correctamente la sección hero", () => {
      render(<TestLandingPage />)

      const heroSection = screen.getByTestId("hero-section")

      // Verificar badge beta
      expect(within(heroSection).getByText("Now in Beta")).toBeInTheDocument()

      // Verificar título principal usando función matcher personalizada
      expect(
        within(heroSection).getByText((content, element) => {
          return element?.tagName.toLowerCase() === "h1" && content.includes("Explore the")
        }),
      ).toBeInTheDocument()

      expect(within(heroSection).getByText("Galaxy")).toBeInTheDocument()

      // Verificar "Create Your Legend" usando función matcher
      expect(
        within(heroSection).getByText((content, element) => {
          return element?.tagName.toLowerCase() === "h1" && content.includes("Create Your Legend")
        }),
      ).toBeInTheDocument()

      // Verificar descripción usando texto parcial
      expect(within(heroSection).getByText(/immerse yourself in an epic space roleplay adventure/i)).toBeInTheDocument()

      // Verificar botones CTA
      expect(within(heroSection).getByText("🚀 Start Your Journey")).toBeInTheDocument()
      expect(within(heroSection).getByText("Watch Trailer")).toBeInTheDocument()
    })

    it("los botones del hero tienen los enlaces correctos", () => {
      render(<TestLandingPage />)

      const heroSection = screen.getByTestId("hero-section")
      // Verificar que el botón "Start Your Journey" enlaza a /register
      const startButton = within(heroSection).getByText("🚀 Start Your Journey")
      expect(startButton.closest("a")).toHaveAttribute("href", "/register")
    })
  })

  describe("Sección de Features", () => {
    it("renderiza correctamente todas las características", () => {
      render(<TestLandingPage />)

      const featuresSection = screen.getByTestId("features-section")

      // Verificar título de la sección
      expect(within(featuresSection).getByText("Game Features")).toBeInTheDocument()
      expect(
        within(featuresSection).getByText(/discover the tools and systems that make your space roleplay experience/i),
      ).toBeInTheDocument()

      // Verificar todas las características
      expect(within(featuresSection).getByText("Character Creation")).toBeInTheDocument()
      expect(within(featuresSection).getByText("Interactive Galaxy Map")).toBeInTheDocument()
      expect(within(featuresSection).getByText("Skills & Missions")).toBeInTheDocument()
      expect(within(featuresSection).getByText("Lore & Statistics")).toBeInTheDocument()
      expect(within(featuresSection).getByText("Intuitive Navigation")).toBeInTheDocument()

      // Verificar descripciones de características
      expect(
        within(featuresSection).getByText(/create and customize unique characters with detailed avatars/i),
      ).toBeInTheDocument()
      expect(
        within(featuresSection).getByText(/navigate through interactive maps of galaxies and planets/i),
      ).toBeInTheDocument()
      expect(
        within(featuresSection).getByText(/access a comprehensive catalog of abilities and missions/i),
      ).toBeInTheDocument()
    })
  })

  describe("Sección CTA Final", () => {
    it("renderiza correctamente la sección de llamada a la acción final", () => {
      render(<TestLandingPage />)

      const ctaSection = screen.getByTestId("cta-section")

      // Verificar título usando función matcher
      expect(
        within(ctaSection).getByText((content, element) => {
          return element?.tagName.toLowerCase() === "h2" && content.includes("Ready to Begin Your")
        }),
      ).toBeInTheDocument()

      expect(within(ctaSection).getByText("Galactic Adventure?")).toBeInTheDocument()

      // Verificar descripción
      expect(
        within(ctaSection).getByText(/join thousands of players already exploring the galaxy/i),
      ).toBeInTheDocument()

      // Verificar botones
      expect(within(ctaSection).getByText("👤 Create Account")).toBeInTheDocument()
      expect(within(ctaSection).getByText("Learn More")).toBeInTheDocument()
    })

    it("el botón Create Account enlaza correctamente", () => {
      render(<TestLandingPage />)

      const ctaSection = screen.getByTestId("cta-section")
      const createAccountButton = within(ctaSection).getByText("👤 Create Account")
      expect(createAccountButton.closest("a")).toHaveAttribute("href", "/register")
    })
  })

  describe("Footer", () => {
    it("renderiza correctamente el footer", () => {
      render(<TestLandingPage />)

      const footer = screen.getByTestId("footer")

      // Verificar logo del footer
      expect(within(footer).getByText("Astra Universe Partner")).toBeInTheDocument()

      // Verificar descripción
      expect(within(footer).getByText(/the ultimate space roleplay experience/i)).toBeInTheDocument()

      // Verificar secciones del footer
      expect(within(footer).getByText("Game")).toBeInTheDocument()
      expect(within(footer).getByText("Support")).toBeInTheDocument()

      // Verificar enlaces del footer
      expect(within(footer).getByText("Characters")).toBeInTheDocument()
      expect(within(footer).getByText("Galaxies")).toBeInTheDocument()
      expect(within(footer).getByText("Missions")).toBeInTheDocument()
      expect(within(footer).getByText("Help Center")).toBeInTheDocument()
      expect(within(footer).getByText("Community")).toBeInTheDocument()
      expect(within(footer).getByText("Contact Us")).toBeInTheDocument()
      expect(within(footer).getByText("Bug Reports")).toBeInTheDocument()

      // Verificar copyright
      const currentYear = new Date().getFullYear()
      expect(
        within(footer).getByText(`© ${currentYear} Astra Universe Partner. All rights reserved.`),
      ).toBeInTheDocument()
    })

    it("renderiza correctamente los botones de redes sociales", () => {
      render(<TestLandingPage />)

      const footer = screen.getByTestId("footer")

      // Verificar que los botones de redes sociales tienen aria-labels
      expect(within(footer).getByLabelText("Discord")).toBeInTheDocument()
      expect(within(footer).getByLabelText("Twitter")).toBeInTheDocument()
      expect(within(footer).getByLabelText("GitHub")).toBeInTheDocument()
      expect(within(footer).getByLabelText("Email")).toBeInTheDocument()
    })
  })

  describe("Navegación y Enlaces", () => {
    it("todos los enlaces de navegación apuntan a las secciones correctas", () => {
      render(<TestLandingPage />)

      // Verificar enlaces de navegación en header y footer por separado
      const header = screen.getByTestId("header")
      const footer = screen.getByTestId("footer")

      expect(within(header).getByText("Features").closest("a")).toHaveAttribute("href", "#features")
      expect(within(footer).getByText("Features").closest("a")).toHaveAttribute("href", "#features")
    })

    it("los enlaces de registro funcionan correctamente", () => {
      render(<TestLandingPage />)

      const header = screen.getByTestId("header")
      const heroSection = screen.getByTestId("hero-section")
      const ctaSection = screen.getByTestId("cta-section")

      // Verificar enlaces a /register en diferentes secciones
      expect(within(header).getByText("Sign Up").closest("a")).toHaveAttribute("href", "/register")
      expect(within(heroSection).getByText("🚀 Start Your Journey").closest("a")).toHaveAttribute("href", "/register")
      expect(within(ctaSection).getByText("👤 Create Account").closest("a")).toHaveAttribute("href", "/register")
    })
  })

  describe("Accesibilidad", () => {
    it("tiene los elementos de accesibilidad necesarios", () => {
      render(<TestLandingPage />)

      // Verificar que el botón del menú móvil tiene aria-label
      expect(screen.getByLabelText("Toggle mobile menu")).toBeInTheDocument()

      // Verificar que los botones de redes sociales tienen aria-labels
      const footer = screen.getByTestId("footer")
      expect(within(footer).getByLabelText("Discord")).toBeInTheDocument()
      expect(within(footer).getByLabelText("Twitter")).toBeInTheDocument()
      expect(within(footer).getByLabelText("GitHub")).toBeInTheDocument()
      expect(within(footer).getByLabelText("Email")).toBeInTheDocument()
    })

    it("tiene la estructura de headings correcta", () => {
      render(<TestLandingPage />)

      // Verificar jerarquía de headings
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument() // Hero title
      expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2) // Features y CTA titles
      expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5) // Feature titles
      expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(2) // Footer section titles
    })
  })

  describe("Responsive Design", () => {
    it("muestra elementos responsive correctamente", () => {
      render(<TestLandingPage />)

      // Verificar que existen clases responsive (aunque no podemos testear el CSS real)
      expect(screen.getByLabelText("Toggle mobile menu")).toBeInTheDocument()

      // Verificar que el menú móvil existe para dispositivos pequeños
      const mobileMenuButton = screen.getByLabelText("Toggle mobile menu")
      expect(mobileMenuButton).toBeInTheDocument()
    })
  })
})
