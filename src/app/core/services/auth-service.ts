import { computed, Injectable, signal } from '@angular/core';
import { Observable, of, tap, throwError } from 'rxjs';

export type PerfilUsuario = 'admin' | 'cliente' | 'tatuador';

export interface UsuarioAutenticado {
  nome: string;
  email: string;
  perfil: PerfilUsuario;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'codeInk.usuario';
  private readonly usuarioSignal = signal<UsuarioAutenticado | null>(this.carregarUsuario());

  readonly usuarioAtual = this.usuarioSignal.asReadonly();
  readonly estaAutenticado = computed(() => this.usuarioSignal() !== null);

  login(email: string, senha: string): Observable<UsuarioAutenticado> {
    const emailNormalizado = email.trim().toLowerCase();

    if (senha !== '123456') {
      return throwError(() => new Error('Email ou senha inválidos.'));
    }

    const usuario: UsuarioAutenticado =
      emailNormalizado === 'admin@email.com'
        ? { nome: 'Administrador', email: emailNormalizado, perfil: 'admin' }
        : emailNormalizado === 'cliente@email.com'
          ? { nome: 'João Silva', email: emailNormalizado, perfil: 'cliente' }
          : {
              nome: emailNormalizado.split('@')[0] || 'Cliente',
              email: emailNormalizado,
              perfil: 'cliente',
            };

    return of(usuario).pipe(tap((valor) => this.salvarUsuario(valor)));
  }

  cadastrar(nome: string, email: string): Observable<UsuarioAutenticado> {
    const usuario: UsuarioAutenticado = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      perfil: 'cliente',
    };

    return of(usuario).pipe(tap((valor) => this.salvarUsuario(valor)));
  }

  logout(): void {
    this.usuarioSignal.set(null);
    localStorage.removeItem(this.storageKey);
  }

  private salvarUsuario(usuario: UsuarioAutenticado): void {
    this.usuarioSignal.set(usuario);
    localStorage.setItem(this.storageKey, JSON.stringify(usuario));
  }

  private carregarUsuario(): UsuarioAutenticado | null {
    try {
      const valor = localStorage.getItem(this.storageKey);
      return valor ? (JSON.parse(valor) as UsuarioAutenticado) : null;
    } catch {
      return null;
    }
  }
}
