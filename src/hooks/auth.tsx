import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface RequestDTO {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_full_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  signOut(): void;
  signIn(credentials: RequestDTO): Promise<void>;
  updateUser(user: User): void;
  user: User;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@goBarber:token');
    const user = localStorage.getItem('@goBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return ({ token, user: JSON.parse(user) });
    }


    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/auth', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('@goBarber:token', token);
    localStorage.setItem('@goBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@goBarber:token');
    localStorage.removeItem('@goBarber:user');
    setData({} as AuthState);
  }, []);


  const updateUser = useCallback((user: User) => {
    setData({
      token: data.token,
      user
    });

    localStorage.setItem('@goBarber:user', JSON.stringify(user));


  }, [setData, data.token]);

  return (
    <AuthContext.Provider value={{ signOut, signIn, user: data.user, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw Error("No context available");

  return context;
}
