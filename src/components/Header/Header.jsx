import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '..'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Option } from 'lucide'

function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    {
      name: "Home",
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className="bg-gray-50 border-b sticky top-0 z-50">

      <Container>

        <nav className="flex items-center justify-between py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo width="70px" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-black transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-2 pb-4 border-t pt-4">

            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug)
                      setMenuOpen(false)
                    }}
                    className="text-left px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
                  >
                    {item.name}
                  </button>
                )
            )}

            {authStatus && <LogoutBtn />}

          </div>
        )}

      </Container>

    </header>
  )
}

export default Header