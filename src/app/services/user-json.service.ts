import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserJsonService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  getUserRoleByEmail(email: string): Observable<string | null> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users) => {
        if (users.length > 0) {
          return users[0].role; // Devuelve 'admin', 'user', etc.
        }
        return null; // No encontrado
      }),
      catchError(() => of(null)), // En caso de error de red, devolvemos null
    );
  }
}
