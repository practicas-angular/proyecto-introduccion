import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  set(key: string, value: string) {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  get(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  remove(key: string) {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}