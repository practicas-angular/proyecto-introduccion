import { Component, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { LocalStorageService } from '../../services/local-storage.service'; // Adjust path as needed

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: `./language-selector.component.html`,
  styleUrl: `./language-selector.component.scss`
})
export class LanguageSelectorComponent {
  private translate = inject(TranslateService);
  private storage = inject(LocalStorageService); // Inject your new service

  languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  currentLang = signal('es');

  constructor() {
    // The service handles the platform check internally now
    const saved = this.storage.get('lang') || 'es';
    
    this.currentLang.set(saved);
    this.translate.use(saved);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);

    // No need for 'if (isPlatformBrowser)' here anymore!
    this.storage.set('lang', lang);
  }
}