import React, { useState, useCallback, createContext, useContext } from 'react';
import ToastContainer from '../components/ToastContainer';
import {uuid} from 'uuidv4';

interface ToastContextData {
  addToast(data: ToastMessage): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id?: string;
  type?: "sucess" | "error" | "info";
  title: string;
  description ?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);


export const ToastProvider: React.FC = ({children}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    }

    setMessages(oldMessages => [...oldMessages, toast ]);

  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages => oldMessages.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{removeToast, addToast}}>
      {children}
      <ToastContainer messages={messages}/>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if(!context) throw Error("No context available for toast!");

  return context;
}
