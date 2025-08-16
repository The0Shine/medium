import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslationProgressService, TranslationProgress } from '../../services/translation-progress.service';

@Component({
  selector: 'app-translation-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="progress.isTranslating" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      style="backdrop-filter: blur(4px)"
    >
      <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <!-- Header -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {{ progress.mode === 'update' ? 'Updating Translations' : 'Translating Post' }}
          </h3>
          <p class="text-gray-600">
            {{ progress.mode === 'update'
               ? 'Updating multilingual versions of your content'
               : 'Creating multilingual versions of your content' }}
          </p>
        </div>

        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700">Progress</span>
            <span class="text-sm font-medium text-blue-600">{{ progress.progressPercentage }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div 
              class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
              [style.width.%]="progress.progressPercentage"
            ></div>
          </div>
        </div>

        <!-- Current Status -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-700">Current Language:</span>
            <span class="text-sm font-semibold text-blue-600">{{ progress.currentLanguage || 'Preparing...' }}</span>
          </div>
          
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-700">Languages:</span>
            <span class="text-sm text-gray-600">
              {{ progress.currentLanguageIndex }} / {{ progress.totalLanguages }}
            </span>
          </div>

          <div class="flex items-center justify-between mb-3" *ngIf="progress.estimatedTimeRemaining">
            <span class="text-sm font-medium text-gray-700">Time Remaining:</span>
            <span class="text-sm text-gray-600">{{ progress.estimatedTimeRemaining }}</span>
          </div>
        </div>

        <!-- Status Message -->
        <div class="mb-6">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-gray-700">{{ progress.currentStep }}</span>
          </div>
        </div>

        <!-- Completed/Failed Languages -->
        <div class="space-y-3">
          <!-- Completed Languages -->
          <div *ngIf="progress.completedLanguages.length > 0">
            <h4 class="text-sm font-medium text-green-700 mb-2">
              ✅ Completed ({{ progress.completedLanguages.length }})
            </h4>
            <div class="flex flex-wrap gap-1">
              <span 
                *ngFor="let lang of progress.completedLanguages" 
                class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
              >
                {{ lang }}
              </span>
            </div>
          </div>

          <!-- Failed Languages -->
          <div *ngIf="progress.failedLanguages.length > 0">
            <h4 class="text-sm font-medium text-red-700 mb-2">
              ❌ Failed ({{ progress.failedLanguages.length }})
            </h4>
            <div class="flex flex-wrap gap-1">
              <span 
                *ngFor="let lang of progress.failedLanguages" 
                class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
              >
                {{ lang }}
              </span>
            </div>
          </div>
        </div>

        <!-- Animation for current language -->
        <div class="mt-6 text-center" *ngIf="progress.currentLanguage">
          <div class="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
            <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <span class="text-sm font-medium text-blue-700">
              {{ progress.mode === 'update'
                 ? 'Updating ' + progress.currentLanguage + ' translation...'
                 : 'Translating to ' + progress.currentLanguage + '...' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0,-8px,0);
      }
      70% {
        transform: translate3d(0,-4px,0);
      }
      90% {
        transform: translate3d(0,-2px,0);
      }
    }
    
    .animate-bounce {
      animation: bounce 1s infinite;
    }
  `]
})
export class TranslationProgressComponent implements OnInit, OnDestroy {
  progress: TranslationProgress = {
    isTranslating: false,
    currentLanguage: '',
    currentLanguageIndex: 0,
    totalLanguages: 0,
    completedLanguages: [],
    failedLanguages: [],
    progressPercentage: 0,
    currentStep: ''
  };

  private subscription?: Subscription;

  constructor(private translationProgressService: TranslationProgressService) {}

  ngOnInit() {
    this.subscription = this.translationProgressService.progress$.subscribe(
      progress => {
        this.progress = progress;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
