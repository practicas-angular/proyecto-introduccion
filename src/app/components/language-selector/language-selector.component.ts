import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { share } from 'rxjs';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, SHARED_IMPORTS],
  templateUrl: `./language-selector.component.html`,
  styleUrl: `./language-selector.component.scss`
})
export class LanguageSelectorComponent {
  private translate = inject(TranslateService);

  // Lista de idiomas soportados
  languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ch', name: '中文', flag: '🇨🇳' }
  ];

  // Signal que rastrea el idioma actual
  currentLang = signal(this.translate.currentLang || localStorage.getItem('lang') || 'es');

  changeLanguage(lang: string) {
    // 1. Cambiamos el idioma en el servicio (Actualiza el HTML automáticamente)
    this.translate.use(lang);
    
    // 2. Guardamos en localStorage para persistencia al refrescar
    localStorage.setItem('lang', lang);
    
    // 3. Actualizamos nuestro Signal
    this.currentLang.set(lang);
  }
}