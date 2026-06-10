import { STORAGE_KEYS } from '../../../shared/utils/storageKeys.js';
import { storage } from '../../../shared/utils/localStorageHelper.js';
import { apiClient } from '../../../shared/services/apiClient.js';

export const authService = {
  async register({ username, password }) {
    const response = await apiClient.post('/auth/register', { username, password });
    return response;
  },

  async recoverPassword({ username, newPassword }) {
    return apiClient.post('/auth/recover', { username, newPassword });
  },

  async login({ username, password }) {
    const response = await apiClient.post('/auth/login', { username, password });

    if (response.ok && response.user) {
      storage.set(STORAGE_KEYS.currentUser, response.user);
    }

    return response;
  },

  logout() {
    storage.remove(STORAGE_KEYS.currentUser);
  },

  getCurrentUser() {
    return storage.get(STORAGE_KEYS.currentUser, null);
  },

  startGuestSession() {
    storage.remove(STORAGE_KEYS.currentUser);
    sessionStorage.setItem('tq_guest_active', 'true');
  },
};
