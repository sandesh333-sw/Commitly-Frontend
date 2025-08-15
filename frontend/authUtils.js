import { useContext } from 'react';
import { AuthContext } from './authContextStore';

export const useAuth = () => {
    return useContext(AuthContext);
}