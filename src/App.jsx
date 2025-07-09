import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import  LandingPage  from './pages/landing'
import Onboarding from './pages/onboarding'
import JobPage from './pages/jobs'
import PostJob from './pages/post-jobs'
import SavedJobs from './pages/saved-jobs'
import JobListing from './pages/job-listing'
import MyJobs from './pages/my-jobs'

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
        element: <Onboarding />
      },
      {
        path: '/jobs',
        element: <JobListing />
      },
      {
        path: '/job/:id',
        element: <JobPage />
      },
      {
        path: '/post-job',
        element: <PostJob />
      },
      {
        path: '/saved-jobs',
        element: <SavedJobs />
      },
      {
        path: '/my-jobs',
        element: <MyJobs />
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
