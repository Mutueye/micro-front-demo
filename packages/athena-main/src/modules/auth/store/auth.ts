import { defineStore } from 'pinia';

interface AuthState {
  token: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: '',
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage,
      },
    ],
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
});
