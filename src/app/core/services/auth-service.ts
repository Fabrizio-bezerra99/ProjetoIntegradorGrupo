import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//Isso é um login fake/teste, só pra gente fazer a tela funcionar primeiro.
  login(email: string, senha: string): Observable<any> {
    if (email === 'admin@email.com' && senha === '123456') {
      return of({
        email: email,
        perfil: 'admin'
      });
    }

    return throwError(() => new Error('Email ou senha inválidos'));
  }
}