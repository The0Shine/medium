class TranslationProgressService {
  constructor() {
    // Store progress for each translation session
    this.progressSessions = new Map();
  }

  // Start a new translation session
  startSession(sessionId, totalLanguages, languages) {
    const session = {
      sessionId,
      totalLanguages,
      languages: languages.map(lang => ({
        languageId: lang.languageid,
        languageName: lang.language_name,
        localeCode: lang.locale_code,
        status: 'pending' // pending, translating, completed, failed
      })),
      currentLanguageIndex: 0,
      completedCount: 0,
      failedCount: 0,
      startTime: new Date(),
      status: 'started' // started, in_progress, completed, failed
    };

    this.progressSessions.set(sessionId, session);
    console.log(`🚀 Translation session ${sessionId} started with ${totalLanguages} languages`);
    return session;
  }

  // Update progress for a specific language
  updateLanguageProgress(sessionId, languageId, status, error = null) {
    const session = this.progressSessions.get(sessionId);
    if (!session) {
      console.error(`Session ${sessionId} not found`);
      return null;
    }

    const language = session.languages.find(lang => lang.languageId === languageId);
    if (!language) {
      console.error(`Language ${languageId} not found in session ${sessionId}`);
      return null;
    }

    const oldStatus = language.status;
    language.status = status;
    language.error = error;
    language.updatedAt = new Date();

    // Update session counters
    if (oldStatus === 'pending' || oldStatus === 'translating') {
      if (status === 'completed') {
        session.completedCount++;
      } else if (status === 'failed') {
        session.failedCount++;
      }
    }

    // Update current language index
    if (status === 'translating') {
      const currentIndex = session.languages.findIndex(lang => lang.languageId === languageId);
      session.currentLanguageIndex = currentIndex;
      session.status = 'in_progress';
    }

    // Check if all languages are processed
    const processedCount = session.completedCount + session.failedCount;
    if (processedCount === session.totalLanguages) {
      session.status = session.failedCount === 0 ? 'completed' : 'completed_with_errors';
      session.endTime = new Date();
      session.duration = session.endTime - session.startTime;
    }

    console.log(`📊 Session ${sessionId}: ${language.languageName} -> ${status}`);
    console.log(`   Progress: ${processedCount}/${session.totalLanguages} (${session.completedCount} success, ${session.failedCount} failed)`);

    return session;
  }

  // Get current progress for a session
  getProgress(sessionId) {
    const session = this.progressSessions.get(sessionId);
    if (!session) {
      return null;
    }

    const processedCount = session.completedCount + session.failedCount;
    const progressPercentage = Math.round((processedCount / session.totalLanguages) * 100);
    
    // Calculate estimated time remaining
    let estimatedTimeRemaining = null;
    if (session.status === 'in_progress' && processedCount > 0) {
      const elapsed = Date.now() - session.startTime.getTime();
      const avgTimePerLanguage = elapsed / processedCount;
      const remaining = (session.totalLanguages - processedCount) * avgTimePerLanguage;
      estimatedTimeRemaining = Math.ceil(remaining / 1000); // in seconds
    }

    return {
      sessionId: session.sessionId,
      status: session.status,
      totalLanguages: session.totalLanguages,
      currentLanguageIndex: session.currentLanguageIndex,
      completedCount: session.completedCount,
      failedCount: session.failedCount,
      progressPercentage,
      estimatedTimeRemaining,
      languages: session.languages,
      startTime: session.startTime,
      endTime: session.endTime,
      duration: session.duration
    };
  }

  // Clean up old sessions (call this periodically)
  cleanupOldSessions(maxAgeHours = 24) {
    const cutoffTime = Date.now() - (maxAgeHours * 60 * 60 * 1000);
    
    for (const [sessionId, session] of this.progressSessions.entries()) {
      if (session.startTime.getTime() < cutoffTime) {
        this.progressSessions.delete(sessionId);
        console.log(`🧹 Cleaned up old session: ${sessionId}`);
      }
    }
  }

  // Remove a specific session
  removeSession(sessionId) {
    const removed = this.progressSessions.delete(sessionId);
    if (removed) {
      console.log(`🗑️ Removed session: ${sessionId}`);
    }
    return removed;
  }

  // Get all active sessions (for debugging)
  getAllSessions() {
    return Array.from(this.progressSessions.values());
  }
}

module.exports = new TranslationProgressService();
