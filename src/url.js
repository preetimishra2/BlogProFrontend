// Check if the app is in production or development environment
const isProduction = process.env.NODE_ENV === "production";

// Set the backend URL based on the environment
export const URL = isProduction 
    ? "https://blogbackendpro-pp5a.onrender.com" // Production backend URL
    : "http://localhost:8000"; // Local development backend URL

// Set the image URL based on the environment
export const IF = isProduction 
    ? "https://blogbackendpro-pp5a.onrender.com/images/" // Production image URL
    : "http://localhost:8000/images/"; // Local development image URL
