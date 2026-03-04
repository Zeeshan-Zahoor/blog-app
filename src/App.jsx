import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import authService from "./appwrite/auth";
import {login, logout} from "./store/authSlice"
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch  = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4">

      <Header />

      <main className="grow w-full">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default App
