import React, { useState, useEffect } from "react";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "@env";
import SInfo from "react-native-sensitive-info";
import Auth0 from "react-native-auth0";
import { jwtDecode } from 'jwt-decode';

// Create an instance of Auth0
const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

// Create an authentication context
const AuthContext = React.createContext();

// AuthContextProvider component
const AuthContextProvider = (props) => {
  // State variables to track loading, login status, and user data
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  // Function to get user data from the ID token
  const getUserData = async (id) => {
    try {
      // Retrieve the ID token from storage or the provided parameter
      const idToken = id ? id : await SInfo.getItem('idToken', {});
      console.log("ID token:", idToken);

      // Decode the ID token
      console.log("Decoding ID token...");
      const decoded = jwtDecode(idToken);
      console.log("Decoded:", decoded);

      // Extract relevant information from the decoded token
      const { name, picture, exp } = decoded;

      // Check if the token is expired
      if (exp < Date.now() / 1000) {
        throw new Error('ID token expired!');
      }

      // Return user data
      return {
        name,
        picture,
      };
    } catch (error) {
      // Handle errors while decoding or retrieving user data
      // console.error('Error decoding ID token:', error);
      throw error;
    }
  };

  // Executed when the component is rendered (on initial load)
  useEffect(() => {
    // Log initial state
    console.log("Initial login state:", loggedIn);
    console.log("Initial user data:", userData);

    // Fetch user data if logged in, set login state accordingly
    (async () => {
      try {
        const user_data = await getUserData();
        if (user_data) {
          setLoggedIn(true);
          setUserData(user_data);
        }
      } catch (err) {
        setLoggedIn(false);
      } finally {
        // Set loading state to false when done
        setLoading(false);
      }
    })();
  }, []);

  // Executed after the user logs in or out
  useEffect(() => {
    // Log relevant information
    console.log("Login state after effect:", loggedIn);
    console.log("User data after effect:", userData);

    // Fetch user data if logged in
    const fetchData = async () => {
      try {
        if (loggedIn) {
          const user_data = await getUserData();
          setUserData(user_data);
        }
      } catch (err) {
        // Handle errors while fetching user data
        // console.error('Error fetching user data:', err);
        alert('Error logging in');
      }
    };

    // Execute the fetchData function
    fetchData();
  }, [loggedIn]);

  // Function to handle user login
  const login = async () => {
    try {
      // Authorize with Auth0 and retrieve credentials
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid email profile',
      });

      // Store the ID token and fetch user data
      await SInfo.setItem('idToken', credentials.idToken, {});
      const user_data = await getUserData(credentials.idToken);

      // Update state variables
      setLoggedIn(true);
      setUserData(user_data);
    } catch (err) {
      // Handle errors during login
      alert('Error logging in');
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      // Clear Auth0 session and remove ID token from storage
      await auth0.webAuth.clearSession({});
      await SInfo.deleteItem('idToken', {});

      // Update state variables
      setLoggedIn(false);
      setUserData(null);
    } catch (err) {
      // Handle errors during logout
      alert('Error logging out');
    }
  };

  // Create a context value with relevant functions and state
  const value = {
    loading,
    loggedIn,
    login,
    logout,
    userData,
  };

  // Provide the context value to the children components
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

// Export the AuthContext and AuthContextProvider
export { AuthContext, AuthContextProvider };
