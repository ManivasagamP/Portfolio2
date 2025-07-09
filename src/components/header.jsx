import React from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  return (
    <>
      <nav className="flex justify-between items-center relative py-4 px-4 bg-opacity-50 backdrop-blur-md shadow-md border-b border-white/20">
        {/* Gloss overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/10 pointer-events-none"></div>

        {/* Logo */}
        <Link to="/" >
          <img src="/logo.png" alt="Logo" className="h-8 relative z-10 mx-auto" />
        </Link>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </>
  )
}

export default Header