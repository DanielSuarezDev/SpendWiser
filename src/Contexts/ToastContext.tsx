import React, { createContext, useContext, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IToastContext {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
}

const ToastContext = createContext<IToastContext | null>(null);

const ToastProvider: React.FC<any> = ({ children }) => {
  const toastOptions: any = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  const success = useCallback((message: string) => {
    toast.success(message, toastOptions);
  }, []);

  const error = useCallback((message: string) => {
    toast.error(message, toastOptions);
  }, []);

  const info = useCallback((message: string) => {
    toast.info(message, toastOptions);
  }, []);

  const warn = useCallback((message: string) => {
    toast.warn(message, toastOptions);
  }, []);

  return (
    <ToastContext.Provider value={{ success, error, info, warn }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default ToastProvider;
