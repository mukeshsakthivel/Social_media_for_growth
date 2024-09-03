import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Network from './pages/Network';
import Message from './pages/messaging';
import Notification from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings'
import Layout from './components/Layout'
import Terms from './components/termsAndConditions';
import PageNotFound from './components/PageNotFound';
import './styles/index.css'
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/userContext';
import UserProfile from './pages/UserProfile';

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/connection',
          element: <Network />
        },
        {
          path: '/message',
          element: <Message />
        },
        {
          path: '/notification',
          element: <Notification />
        },
        {
          path: '/profile',
          element: <Profile />
        },
      ]
    },
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/policies',
      element: <Terms />
    },
    {
      path: '/settings',
      element: <Settings />
    },
    {
      path: '*',
      element: <PageNotFound />
    },
    {
      path:'/data',
      element:<UserProfile/>
    }
  ]);

  return (
    
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster position='top-center' toastOptions={{duration: 2000}} />
      </UserProvider>
    
  )
}

export default App;