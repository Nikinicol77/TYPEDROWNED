import { apiClient } from '../../../shared/services/apiClient.js';

export const dashboardService = {
  getRanking() {
    return apiClient.get('/dashboard/ranking');
  },

  getProfile(usuarioId) {
    return apiClient.get(`/dashboard/perfil/${usuarioId}`);
  },

  getAdminSummary() {
    return apiClient.get('/dashboard/admin');
  },

  deleteUser(usuarioId) {
    return apiClient.delete(`/dashboard/admin/usuarios/${usuarioId}`);
  },
};
