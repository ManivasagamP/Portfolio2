import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { BriefcaseBusiness, Heart } from 'lucide-react';

const Header = () => {

  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();

  const handleLayerClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  }

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search])

  return (
    <>
      <nav className="flex justify-between items-center relative py-4 px-4 bg-opacity-50 backdrop-blur-md shadow-md border-b border-white/20">
        {/* Gloss overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/10 pointer-events-none"></div>

        {/* Logo */}
        <Link to="/" >
          <img src="/logo.png" alt="Logo" className="h-8 relative z-10 mx-auto" />
        </Link>

        <div className='flex gap-8'>
          <SignedOut>
            <Button variant="outline" className="cursor-pointer" onClick={() => setShowSignIn(true)}> Login </Button>
          </SignedOut>
          <SignedIn>
            <Link to="/post-job">
              <Button variant="destructive" className="rounded-full cursor-pointer">
                Post a job
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-10 w-10',
                }
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50'
          onClick={(e) => { handleLayerClick(e) }}
        >
          <SignIn
            signUpFallbackRedirectUrl='/onboarding'
            fallbackRedirectUrl='/onboarding'
          />
        </div>
      )}
    </>
  )
}

export default Header