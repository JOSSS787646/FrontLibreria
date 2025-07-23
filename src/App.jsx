import React from 'react';
import { AuthProvider } from '../src/context/AuthContext'; // o utils/AuthContext
import AppRouter from '../src/routes/AppRouter'; // o donde tengas tu router

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
