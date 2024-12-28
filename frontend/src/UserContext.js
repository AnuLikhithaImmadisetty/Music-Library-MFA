import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default to null, meaning user is not logged in
  const [login, setLogin] = useState(false); // Track login state

  useEffect(() => {
    // Retrieve user data from localStorage and parse it
    const userData = localStorage.getItem('userData');
    console.log('Retrieved userData from localStorage:', userData); // Log the raw data from localStorage

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData); // Update state with parsed user data
        setLogin(true); // Set login state to true when user is logged in
        console.log('Parsed user data:', parsedUserData); // Log the parsed user data
      } catch (error) {
        console.error('Error parsing user data:', error); // Log error if JSON is invalid
        // Optionally clear invalid data from localStorage
        localStorage.removeItem('userData');
      }
    }
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Update user in both context and localStorage
  const updateUser = (userData) => {
    setUser(userData);
    console.log('Updating user data:', userData); // Log the user data being updated
    localStorage.setItem('userData', JSON.stringify(userData)); // Save updated user data to localStorage
    setLogin(true); // Set login state to true when user is updated
    console.log('User data saved to localStorage:', JSON.stringify(userData)); // Log the updated user data in localStorage
  };

  // Logout function to clear user data and login state
  const logout = () => {
    setUser(null);
    setLogin(false);
    localStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, setLogin, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
