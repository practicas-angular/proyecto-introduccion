import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // Importante para SSR
import { TranslateService } from '@ngx-translate/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: `./language-selector.component.html`,
  styleUrl: `./language-selector.component.scss`
})
export class LanguageSelectorComponent {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID); // Inyectamos el ID de plataforma

  // Seguimos necesitando este array para que el Select sepa qué mostrar
  languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  // Inicializamos el signal con un valor por defecto seguro
  currentLang = signal('es');

  constructor() {
    // Solo si estamos en el navegador, leemos el localStorage
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('lang') || 'es';
      this.currentLang.set(saved);
      this.translate.use(saved);
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);

    // Solo si estamos en el navegador, guardamos en localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }
}