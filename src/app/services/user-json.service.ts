import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserJsonService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  getUserByEmail(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      // Si el array tiene longitud > 0, el usuario existe
      map((users) => users.length > 0),
      catchError(() => of(false)),
    );
  }
}
