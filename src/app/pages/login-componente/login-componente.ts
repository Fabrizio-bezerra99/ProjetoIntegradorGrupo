import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-login-componente',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-componente.html',
  styleUrl: './login-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponente {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly mostrarSenha = signal(false);
  protected readonly mensagemErro = signal('');
  protected readonly formulario = this.fb.nonNullable.group({
    email: ['admin@email.com', [Validators.required, Validators.email]],
    senha: ['123456', [Validators.required, Validators.minLength(6)]],
    lembrar: [true],
  });

  protected entrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const { email, senha } = this.formulario.getRawValue();
    this.mensagemErro.set('');
    this.authService.login(email, senha).subscribe({
      next: (usuario) => {
        const redirect = this.route.snapshot.queryParamMap.get('redirect');
        void this.router.navigateByUrl(
          redirect || (usuario.perfil === 'admin' ? '/dashboard' : '/perfil'),
        );
      },
      error: (erro: Error) => this.mensagemErro.set(erro.message),
    });
  }
}
