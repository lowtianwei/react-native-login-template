import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

interface AuthProps {
  authState?: {token: string | null; authenticated: boolean | null};
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}
//https://www.youtube.com/watch?v=9vydY9SDtAo&t=415s
export const API_URL = 'http://localhost:3000';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await EncryptedStorage.getItem("TOKEN_KEY");
      console.log("stored:", token);

      if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  },[])
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const register = async (email: string, password: string) => {
    try {
      await axios.post(`${API_URL}/users`, {email, password});
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.get(`${API_URL}/auth`);
      //const result = await axios.post(`${API_URL}/auth`, {email, password});
      //const result = "aaaa";
      console.log(JSON.stringify(result.data.token))
      setAuthState({
        token: result.data.token,
        authenticated: true
      });

      // Store token into local storage
      await EncryptedStorage.setItem("TOKEN_KEY", JSON.stringify(result.data.token));

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    try{
      // Delete token from storage
      await EncryptedStorage.removeItem("TOKEN_KEY");

      // Update HTTP Headers

      setAuthState({
        token: null,
        authenticated: false
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};