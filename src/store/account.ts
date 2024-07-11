import { defineStore } from 'pinia';

import { login } from '@/api/account';
import { LoginRequest } from '@/api/account/type';

export interface AccountState {
  token: string;
  username: string;
}

export interface AccountGetters {
  role: (state: AccountState) => string;
}

export interface AccountActions {
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const useAccountStore = defineStore('account', {
  state: (): AccountState => ({
    username: '',
    token: '',
  }),
  actions: {
    async login({ username, password }: LoginRequest) {
      try {
        const response = await login({ username, password });
        // this.username = response.username;
        if (response.code === 200 && response.token) {
          this.token = response.token;
          localStorage.setItem('csrf-token', this.token);
        }
        return response;
      } catch {
        console.log('error');
      }
    },
    async logout() {
      this.token = '';
      this.username = '';
      localStorage.setItem('csrf-token', this.token);
    },
  },
});

export default useAccountStore;
