import { apiAutentificacion } from './axios';

// Registro de usuario
export const register = async (userData) => {
  return await apiAutentificacion.post('/auth/register', userData);
};

// Inicio de sesión
export const login = async (credentials) => {
  return await apiAutentificacion.post('/auth/login', credentials);
};

// Obtener preguntas comunes de recuperación
export const getRecoveryQuestions = async () => {
  return await apiAutentificacion.get('/auth/recovery-questions');
};

// Verificar respuesta de recuperación
export const verifyRecoveryAnswer = async (data) => {
  return await apiAutentificacion.post('/auth/verify-recovery', data);
};

// Restablecer contraseña
export const resetPassword = async (data) => {
  return await apiAutentificacion.post('/auth/reset-password', data);
};


// Obtener la pregunta de recuperación específica de un usuario
export const getUserRecoveryQuestion = async (username) => {
  return await apiAutentificacion.get(`/auth/recovery-question/${username}`);
};


