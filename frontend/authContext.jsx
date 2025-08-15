import React, { createContext, useState, useEffect } from 'react';

// Export the context so it can be imported in authUtils.js
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if(userId){
            setCurrentUser(userId);
        }
    }, []);

    const value = {
        currentUser, setCurrentUser
    }

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}