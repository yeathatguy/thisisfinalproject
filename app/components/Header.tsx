"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Ship, Phone, Menu, X, Loader } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false) // Loading state
  const pathname = usePathname()

  // Show the loader on route change and hide it after a short delay
  React.useEffect(() => {
    setLoading(true) // Show loader when path changes
    const timeout = setTimeout(() => setLoading(false), 500) // Simulate loading time for 500ms
    return () => clearTimeout(timeout) // Clear the timeout if the component unmounts
  }, [pathname]) // Trigger when `pathname` changes

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center mx-auto justify-between px-4 lg:px-10">
        
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Ship className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Safe Ship Logistics</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-blue-600">Our Services</Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600">About Us</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600">Contact</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Phone Number (Visible on Desktop) */}
          <div className="hidden md:flex items-center space-x-2 text-blue-600">
            <Phone className="h-5 w-5" />
            <span className="text-sm font-medium">+91 8000800046</span>
          </div>

          {/* Get Quote Button */}
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/get-quote">Get Quote</Link>
          </Button>

          {/* Mobile Menu Toggle (Hamburger) */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-blue-600 focus:outline-none">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute top-16 left-0 w-full flex justify-center bg-white">
          <Loader className="h-6 w-6 text-blue-600 animate-spin" />
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Our Services</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
