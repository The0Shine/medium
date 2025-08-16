import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TranslationProgress {
  isTranslating: boolean;
  currentLanguage: string;
  currentLanguageIndex: number;
  totalLanguages: number;
  completedLanguages: string[];
  failedLanguages: string[];
  progressPercentage: number;
  currentStep: string;
  estimatedTimeRemaining?: string;
  startTime?: Date;
  mode?: 'create' | 'update'; // New field to distinguish between create and update
}

@Injectable({
  providedIn: 'root'
})
export class TranslationProgressService {
  private progressSubject = new BehaviorSubject<TranslationProgress>({
    isTranslating: false,
    currentLanguage: '',
    currentLanguageIndex: 0,
    totalLanguages: 0,
    completedLanguages: [],
    failedLanguages: [],
    progressPercentage: 0,
    currentStep: ''
  });

  public progress$ = this.progressSubject.asObservable();

  constructor() { }

  startTranslation(totalLanguages: number, mode: 'create' | 'update' = 'create') {
    const stepMessage = mode === 'create' ? 'Preparing translation...' : 'Preparing translation updates...';

    this.progressSubject.next({
      isTranslating: true,
      currentLanguage: '',
      currentLanguageIndex: 0,
      totalLanguages,
      completedLanguages: [],
      failedLanguages: [],
      progressPercentage: 0,
      currentStep: stepMessage,
      startTime: new Date(),
      estimatedTimeRemaining: 'Calculating...',
      mode
    });
  }

  updateProgress(
    currentLanguage: string,
    currentIndex: number,
    step: string = 'Translating...'
  ) {
    const current = this.progressSubject.value;
    const progressPercentage = Math.round((currentIndex / current.totalLanguages) * 100);

    // Calculate estimated time remaining
    let estimatedTimeRemaining = 'Calculating...';
    if (current.startTime && currentIndex > 0) {
      const elapsed = Date.now() - current.startTime.getTime();
      const avgTimePerLanguage = elapsed / currentIndex;
      const remaining = (current.totalLanguages - currentIndex) * avgTimePerLanguage;

      if (remaining > 60000) {
        estimatedTimeRemaining = `${Math.ceil(remaining / 60000)} min`;
      } else {
        estimatedTimeRemaining = `${Math.ceil(remaining / 1000)} sec`;
      }
    }

    this.progressSubject.next({
      ...current,
      currentLanguage,
      currentLanguageIndex: currentIndex,
      progressPercentage,
      currentStep: step,
      estimatedTimeRemaining
    });
  }

  completeLanguage(language: string) {
    const current = this.progressSubject.value;
    const completedLanguages = [...current.completedLanguages, language];
    const progressPercentage = Math.round((completedLanguages.length / current.totalLanguages) * 100);
    
    this.progressSubject.next({
      ...current,
      completedLanguages,
      progressPercentage,
      currentStep: `Completed ${language}`
    });
  }

  failLanguage(language: string, error?: string) {
    const current = this.progressSubject.value;
    const failedLanguages = [...current.failedLanguages, language];
    
    this.progressSubject.next({
      ...current,
      failedLanguages,
      currentStep: `Failed to translate ${language}${error ? ': ' + error : ''}`
    });
  }

  finishTranslation(success: boolean = true) {
    const current = this.progressSubject.value;
    
    this.progressSubject.next({
      ...current,
      isTranslating: false,
      progressPercentage: 100,
      currentStep: success ? 'Translation completed!' : 'Translation finished with errors'
    });

    // Reset after 2 seconds
    setTimeout(() => {
      this.resetProgress();
    }, 2000);
  }

  resetProgress() {
    this.progressSubject.next({
      isTranslating: false,
      currentLanguage: '',
      currentLanguageIndex: 0,
      totalLanguages: 0,
      completedLanguages: [],
      failedLanguages: [],
      progressPercentage: 0,
      currentStep: ''
    });
  }

  getCurrentProgress(): TranslationProgress {
    return this.progressSubject.value;
  }
}
