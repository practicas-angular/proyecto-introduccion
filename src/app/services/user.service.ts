import { Injectable, inject, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../models/user.model';
import { catchError, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // 1. Cargamos los usuarios una sola vez en el servicio
  private usersRaw$ = this.http.get<User[]>(this.apiUrl).pipe(
    catchError(() => of([]))
  );

  // 2. Exponemos los usuarios como Signal
  users = toSignal(this.usersRaw$, { initialValue: undefined });

  // 3. Estado de los filtros
  filterUsername = signal('');
  filterCity = signal('');

  // 4. Lista de ciudades (Derivado de los usuarios cargados)
  cities = computed(() => {
    const list = this.users()?.map(u => u.address.city) || [];
    return [...new Set(list)].sort();
  });

  // 5. Lista filtrada (Derivado de usuarios + filtros)
  filteredUsers = computed(() => {
    const term = this.filterUsername().toLowerCase();
    const city = this.filterCity();
    return this.users()?.filter(u =>
      u.username.toLowerCase().includes(term) &&
      (city === '' || u.address.city === city)
    );
  });

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  resetFilters() {
    this.filterUsername.set('');
    this.filterCity.set('');
  }
}