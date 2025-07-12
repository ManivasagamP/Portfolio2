import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { shadesOfPurple } from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// console.log("Clerk Publishable Key:", PUBLISHABLE_KEY)

if (!PUBLISHABLE_KEY) {
  console.log("Clerk Publishable Key is not set in the environment variables.")
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
    appearance={{
      baseTheme: shadesOfPurple
    }}
    publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
