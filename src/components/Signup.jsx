import React from 'react'
import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../store/authSlice"
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    // const { register, handleSubmit } = useForm()
    const { register, handleSubmit, formState: { errors } } = useForm()

    console.log(errors);

    const create = async (data) => {

        setLoading(true)
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                console.log("Navigating...");
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
                    Create a new account
                </h2>

                {/* Login link */}
                <p className="mt-2 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Error message */}
                {error && (
                    <p className="text-red-500 text-sm text-center mt-6">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">

                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                    />

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email must be valid",
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
                        className="w-full"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>

                </form>

            </div>
        </div>
    )
}

export default Signup