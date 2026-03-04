import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const login = async(data) => {
    setError("")
    setLoading(true)
    try {
     const session = await authService.login(data)
     if(session) {
      const userData = await authService.getCurrentUser()
      if(userData) dispatch(authLogin(userData))
      navigate("/")
     }
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-gray-200">

      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <span className="inline-block w-full max-w-22.5">
          <Logo width="100%" />
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Sign in to your account
      </h2>

      {/* Signup link */}
      <p className="mt-2 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </p>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm text-center mt-6">
          {error}
        </p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">

        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be valid",
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
          })}
        />

        <Button 
          type="submit"
          className="w-full">
            {loading? "Signing in..." : "Sign In"}
        </Button>

      </form>
    </div>
  </div>
)
}

export default Login