import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Onboarding from './pages/onboarding'
import JobPage from './pages/jobs'
import PostJob from './pages/post-jobs'
import SavedJobs from './pages/saved-jobs'
import JobListing from './pages/job-listing'
import MyJobs from './pages/my-jobs'
import ProtectedRoute from './components/protected-route'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/onboarding',
        element:
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
      },
      {
        path: '/jobs',
        element:
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
      },
      {
        path: '/job/:id',
        element: <JobPage />
      },
      {
        path: '/post-job',
        element:
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
      },
      {
        path: '/saved-jobs',
        element:
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
      },
      {
        path: '/my-jobs',
        element:
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
