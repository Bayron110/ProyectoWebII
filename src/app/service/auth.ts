import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private API_FIREBASE = 'https://proyectoapp-b0489-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Record<string, Usuario>>(`${this.API_FIREBASE}/usuarios.json`).pipe(
      map(response => {
        if (!response) return false;

        const usuarios = Object.entries(response).map(([id, data]) => ({ id, ...data }));

        const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

        if (usuarioEncontrado) {

          localStorage.setItem('usuarioLogueado', 'true');
          localStorage.setItem('usuarioNombre', usuarioEncontrado.nombre);
          localStorage.setItem('usuarioId', usuarioEncontrado.id ?? '');
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.clear();
  }

  estaLogueado(): boolean {
    return localStorage.getItem('usuarioLogueado') === 'true';
  }
}
