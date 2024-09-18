import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../Redux/Api/Auth/authApi';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [signUp, { isLoading }] = useSignUpMutation();

    const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsTermsChecked(e.target.checked);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (value) setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let hasError = false;
        const newErrors: { [key: string]: string } = {};

        // Check if terms and conditions are accepted
        if (!isTermsChecked) {
            newErrors.terms = 'You must agree to the terms and conditions';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            await signUp(formData).unwrap();
            navigate('/sign-in'); 
        } catch (err) {
            console.error('Registration failed:', err);
            const errorMessage = err?.data?.message || 'Registration failed. Please try again.';
            setErrors(prev => ({
                ...prev,
                server: errorMessage
            }));
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="block text-gray-700 text-xs font-medium mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            required
                            onChange={handleChange}
                            className={`w-full p-2 border rounded text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="block text-gray-700 text-xs font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            className={`w-full p-2 border rounded text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="flex mb-3 gap-2">
                        <div className="relative flex-1">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                required
                                onChange={handleChange}
                                className={`w-full p-2 border rounded text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="relative flex-1">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                required
                                onChange={handleChange}
                                className={`w-full p-2 border rounded text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Confirm Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="block text-gray-700 text-xs font-medium mb-1">Phone Number (optional)</label>
                        <input
                            type="text"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-sm border-gray-300"
                            placeholder="123-456-7890"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={isTermsChecked}
                            onChange={handleCheckboxChange}
                            className={`mr-2 h-4 w-4 border rounded ${errors.terms ? 'border-red-500' : 'border-gray-300'} transition duration-300`}
                        />
                        <label htmlFor="terms" className="text-gray-600 text-xs">
                            I agree to the <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a>
                        </label>
                    </div>
                    {errors.terms && <p className="text-red-500 text-xs mt-2">{errors.terms}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded text-sm font-semibold hover:bg-blue-600 transition duration-150"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Sign Up'}
                    </button>

                    {errors.server && <p className="text-red-500 text-xs mt-2">{errors.server}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
