import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
    return jwtDecode(token);
}

// // Function to get user data from token stored in local storage
// const getUserDataFromToken = () => {
//     // Retrieve token from local storage
//     const token = localStorage.getItem('token'); // Ensure 'token' is the key you used to store it

//     // Check if token exists
//     if (token) {
//         // Decode token to get user data
//         return verifyToken(token);
//     } else {
//         // Handle case where token is not available
//         // console.error('No token found in local storage');
//         return null;
//     }
// }

// Example usage
// const userData = getUserDataFromToken();
// // console.log(userData);
