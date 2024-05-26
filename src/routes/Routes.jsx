import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import Main from '../layouts/Main'
import ManageUser from '../pages/Dashboard/Admin/ManageUser'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import AddRoom from '../pages/Dashboard/Host/AddRoom'
import MyListings from '../pages/Dashboard/Host/MyListings'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import SignUp from '../pages/SignUp/SignUp'
import AdminRoute from './AdminRoute'
import HostRoute from './HostRoute'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute> <RoomDetails /></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><Statistics></Statistics></PrivateRoute>
      },
      {
        path: 'add-room',
        element: <PrivateRoute>
          <HostRoute>
            <AddRoom></AddRoom>
          </HostRoute>
        </PrivateRoute>
      },
      { 
        path: 'my-listings',
        element: <PrivateRoute>
          <HostRoute>
            <MyListings></MyListings>
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: 'manage-user',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
    ]
  }
])
