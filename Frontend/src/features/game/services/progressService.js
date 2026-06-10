import { apiClient } from '../../../shared/services/apiClient.js';

export const progressService = {
  async getProgress(usuarioId) {
    return apiClient.get(`/progreso/${usuarioId}`);
  },

  async getLevelProgress(usuarioId, nivel) {
    return apiClient.get(`/progreso/${usuarioId}/nivel/${nivel}`);
  },

  async saveLevelProgress({ usuarioId, nivel, subnivelMaximo, subnivel, wpm, precision, tiempoUsado, gano, completado }) {
    return apiClient.put('/progreso', {
      usuario_id: usuarioId,
      nivel,
      subnivel_maximo: subnivelMaximo,
      subnivel,
      wpm,
      precision,
      tiempo_usado: tiempoUsado,
      gano,
      completado,
    });
  },
};
