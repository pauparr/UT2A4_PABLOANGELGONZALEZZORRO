import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice' // 👈 asegúrate de usar "default export" en tu slice

export const store = configureStore({
  reducer: {
    authenticator: authReducer, // 👈 nombre lógico de tu slice
  },
})

// Tipos del store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
