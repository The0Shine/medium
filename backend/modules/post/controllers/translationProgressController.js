const translationProgressService = require("services/translationProgressService");
const responseUtils = require("utils/responseUtils");

const translationProgressController = {
  // Get translation progress for a session
  getProgress: async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      if (!sessionId) {
        return responseUtils.badRequest(res, "Session ID is required");
      }

      const progress = translationProgressService.getProgress(sessionId);
      
      if (!progress) {
        return responseUtils.notFound(res, "Translation session not found");
      }

      return responseUtils.ok(res, progress, "Translation progress retrieved successfully");
    } catch (error) {
      console.error("Error getting translation progress:", error);
      return responseUtils.internalServerError(res, "Failed to get translation progress");
    }
  },

  // Get all active sessions (for debugging/admin)
  getAllSessions: async (req, res) => {
    try {
      const sessions = translationProgressService.getAllSessions();
      return responseUtils.ok(res, sessions, "All translation sessions retrieved successfully");
    } catch (error) {
      console.error("Error getting all translation sessions:", error);
      return responseUtils.internalServerError(res, "Failed to get translation sessions");
    }
  },

  // Clean up old sessions
  cleanupSessions: async (req, res) => {
    try {
      const { maxAgeHours = 24 } = req.query;
      translationProgressService.cleanupOldSessions(parseInt(maxAgeHours));
      return responseUtils.ok(res, null, "Old translation sessions cleaned up successfully");
    } catch (error) {
      console.error("Error cleaning up translation sessions:", error);
      return responseUtils.internalServerError(res, "Failed to clean up translation sessions");
    }
  },

  // Remove a specific session
  removeSession: async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      if (!sessionId) {
        return responseUtils.badRequest(res, "Session ID is required");
      }

      const removed = translationProgressService.removeSession(sessionId);
      
      if (!removed) {
        return responseUtils.notFound(res, "Translation session not found");
      }

      return responseUtils.ok(res, null, "Translation session removed successfully");
    } catch (error) {
      console.error("Error removing translation session:", error);
      return responseUtils.internalServerError(res, "Failed to remove translation session");
    }
  }
};

module.exports = translationProgressController;
