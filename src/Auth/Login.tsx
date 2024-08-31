import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../Redux/Api/Auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser, TUser } from '../Redux/Fetures/loginSlice';
import { verifyToken } from '../utils/verifyToke';

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('john.doe@example5.com');
    const [password, setPassword] = useState<string>('securepassword123');
    const navigate = useNavigate();

    const [login, {error}] = useLoginMutation();

    // const handleLogin = async () => {
    //     await login({variables: {email, password}});
    // }

    // const handleSubmit =async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //    const userinfo ={
    //     email,
    //     password
    //    };
    //    console.log(userinfo)
    //    const res = await login( userinfo).unwrap();
    //    dispatch(setUser({user :{},token: res.data.token}))
    //    console.log(res)
    // };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userinfo = { email, password };
    
        try {
            const res = await login(userinfo).unwrap();
            console.log('Login response:', res);  // Check the entire response here
    
            const token = res.token;
            const user = verifyToken(res.token) as TUser;
            console.log(user)
    
            if (token) {
                dispatch(setUser({ user: user, token }));
                navigate('/')
             
            } else {
                console.error('Token not found in response');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
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
                    {error && error?.status === 500 && (
                    <div className="mb-4 text-center text-red-600">
                        {error?.data?.message || "An unexpected error occurred. Please try again."}
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
