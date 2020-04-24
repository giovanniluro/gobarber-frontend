import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface RequestDTO {
  email: string;
  password: string;
}

interface AuthState{
  token: string;
  user: object;
}

interface AuthContextData {
  signIn(credentials: RequestDTO): Promise<void>;
  user: object;
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
    const response = await api.post('/sessions', {email, password});
    const {token, user} = response.data;
    localStorage.setItem('@goBarber:token', token);
    localStorage.setItem('@goBarber:user', JSON.stringify(user));

    setData({token, user});
  }, []);

  return (
    <AuthContext.Provider value={{signIn, user: data.user}}>
      {children}
    </AuthContext.Provider>
  )
}
