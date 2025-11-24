import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  userName: string | null;
  userRol: string | null;
  isAutenticated: boolean;
}

const initialState: AuthState = {
  userName: null,
  userRol: null,
  isAutenticated: false,
}

const authSlice = createSlice({
  name: 'authenticator',
  initialState,
  reducers: {
    login(state, action) {
      state.userName = action.payload.name
      state.userRol = action.payload.rol
      state.isAutenticated = true
    },
    logout(state) {
      state.userName = null
      state.userRol = null
      state.isAutenticated = false
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer // 👈 default export obligatorio
