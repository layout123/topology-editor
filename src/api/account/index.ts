import { ApiManager } from '@/utils/request';

import { LoginRequest } from './type';

const suffix = '/api';

const api = new ApiManager({ baseURL: '/', timeout: 10000 });

export const login = (params: LoginRequest) => api.post(`${suffix}/login`, params);

export const register = (params: LoginRequest) => api.post(`${suffix}/register`, params);
