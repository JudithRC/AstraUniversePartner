"use client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import {
  User,
  LogIn,
  Rocket,
  Sword,
  BookOpen,
  Navigation,
  Github,
  Twitter,
  DiscIcon as Discord,
  Mail,
  Star,
  Zap,
  Globe,
  Menu,
  X,
} from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-purple-900/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <Star className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent truncate">
                Astra Universe Partner
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                Contact
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-purple-900/20 text-xs lg:text-sm"
                >
                  <LogIn className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-purple-900/20 text-xs lg:text-sm"
                >
                  <User className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-purple-900/20 py-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-purple-400 transition-colors px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-purple-400 transition-colors px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-purple-400 transition-colors px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="flex flex-col space-y-2 pt-2 border-t border-purple-900/20">
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white hover:bg-purple-900/20 justify-start w-full"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white hover:bg-purple-900/20 justify-start w-full"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 xl:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 sm:mb-6 bg-purple-900/30 text-purple-300 border-purple-700/50 text-xs sm:text-sm">
              <Zap className="w-3 h-3 mr-1" />
              Now in Beta
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Explore the{" "}
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                Galaxy
              </span>
              <br />
              Create Your Legend
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Immerse yourself in an epic space roleplay adventure. Create unique characters, explore vast galaxies, and
              forge your destiny among the stars.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-base sm:text-lg px-6 sm:px-8 py-3"
                >
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-purple-700 text-purple-300 hover:bg-purple-900/20 text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent"
              >
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black to-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Game Features</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
              Discover the tools and systems that make your space roleplay experience unforgettable
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <Card className="bg-gray-900/50 border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">Character Creation</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Create and customize unique characters with detailed avatars, diverse races, and rich backstories
                  including their planet of origin.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">Interactive Galaxy Map</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Navigate through interactive maps of galaxies and planets, each with detailed information cards and
                  rich lore to discover.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sword className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">Skills & Missions</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Access a comprehensive catalog of abilities and missions, constantly updated through our dynamic API
                  system.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 group">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">Lore & Statistics</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Dive deep into the game's extensive lore and track your character's progress with detailed statistics
                  and achievements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-purple-900/30 hover:border-purple-700/50 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">Intuitive Navigation</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Experience seamless gameplay with our intuitive and visually appealing navigation system designed for
                  immersive roleplay.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-900/20 via-black to-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Begin Your
              <span className="block bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Galactic Adventure?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4 sm:px-0">
              Join thousands of players already exploring the galaxy. Create your character and start your legend today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-base sm:text-lg px-6 sm:px-8 py-3"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Create Account
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-purple-700 text-purple-300 hover:bg-purple-900/20 text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-purple-900/20 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                  <Star className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Astra Universe Partner
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-md">
                The ultimate space roleplay experience. Create, explore, and forge your destiny among the stars.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-2">
                  <Discord className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-2">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-2">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400 p-2">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Game</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Characters
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Galaxies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Missions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Bug Reports
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-900/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              © {new Date().getFullYear()} Astra Universe Partner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
