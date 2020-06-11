import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface RequestDTO {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  avatar_full_url: string;
}

interface AuthState{
  token: string;
  user: User;
}

interface AuthContextData {
  signOut(): void;
  signIn(credentials: RequestDTO): Promise<void>;
  user: User;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@goBarber:token');
    const user = localStorage.getItem('@goBarber:user');

    if(token && user){
      return ({token, user: JSON.parse(user)});
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('/auth', {email, password});
    const {token, user} = response.data;
    localStorage.setItem('@goBarber:token', token);
    localStorage.setItem('@goBarber:user', JSON.stringify(user));

    setData({token, user});
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@goBarber:token');
    localStorage.removeItem('@goBarber:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{signOut, signIn, user: data.user}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context) throw Error("No context available");

  return context;
}
