// tokenUtils.ts

import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  name?: string;
  role?: string;
  // Add other fields based on your token structure
}

export const getUserData = (): DecodedToken | null => {
  const token =localStorage.getItem('token')
  // console.log(token)
  if (token) {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};
