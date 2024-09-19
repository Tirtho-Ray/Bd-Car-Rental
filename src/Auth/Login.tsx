import React, { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../Redux/Api/Auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser, TUser } from '../Redux/Fetures/loginSlice';
import { verifyToken } from '../utils/verifyToke';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();
    const location = useLocation();

    const [login, { error }] = useLoginMutation();

    // Capture the initial route
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userinfo = { email, password };

        try {
            const res = await login(userinfo).unwrap();
            const token = res.token;

            if (token) {
                // Store only the token in local storage
                localStorage.setItem('token', token);

                // Extract user data from token
                const user = verifyToken(token) as TUser;

                // Dispatch the setUser action with user data
                dispatch(setUser({ user, token }));

                // Redirect to the route they came from or default to home
                navigate(from, { replace: true });
            } else {
                console.error('Token not found in response');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // Type guard to check if the error is a FetchBaseQueryError
    const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
        return (error as FetchBaseQueryError).status !== undefined;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required 
                        />
                    </div>
                    {error && isFetchBaseQueryError(error) && error.status === 500 && (
                        <div className="mb-4 text-center text-red-600">
                            {(error.data as { message?: string })?.message || "An unexpected error occurred. Please try again."}
                        </div>
                    )}
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-800">Forgot Password?</Link>
                </div>
                <div className="mt-2 text-center text-sm">
                    <p>Don't have an account? <Link to="/sign-up" className="text-indigo-600 hover:text-indigo-800">Sign Up Instead</Link></p>
                </div>
                <div className="mt-4 text-center text-xs text-gray-500">
                    <Link to="/privacy-policy" className="hover:text-gray-700">Privacy Policy</Link> | 
                    <Link to="/terms-of-service" className="hover:text-gray-700"> Terms of Service</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
