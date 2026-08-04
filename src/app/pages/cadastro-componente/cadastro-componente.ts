import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

function senhasIguais(control: AbstractControl): ValidationErrors | null {
  return control.get('senha')?.value === control.get('confirmacaoSenha')?.value
    ? null
    : { senhasDiferentes: true };
}

@Component({
  selector: 'app-cadastro-componente',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro-componente.html',
  styleUrl: './cadastro-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroComponente {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly mostrarSenha = signal(false);
  protected readonly mostrarConfirmacaoSenha = signal(false);
  private readonly formularioNativo =
    viewChild.required<ElementRef<HTMLFormElement>>('formularioNativo');

  protected readonly formulario = this.fb.nonNullable.group(
    {
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoSenha: ['', Validators.required],
    },
    { validators: senhasIguais },
  );

  private lerValorDoCampo(nome: string): string {
    const campo = this.formularioNativo().nativeElement.elements.namedItem(nome);

    return campo instanceof HTMLInputElement ? campo.value : '';
  }

  private sincronizarValoresDoNavegador(): void {
    this.formulario.patchValue({
      nome: this.lerValorDoCampo('nome'),
      email: this.lerValorDoCampo('email'),
      telefone: this.lerValorDoCampo('telefone'),
      senha: this.lerValorDoCampo('senha'),
      confirmacaoSenha: this.lerValorDoCampo('confirmacaoSenha'),
    });
  }

  protected cadastrar(): void {
    this.sincronizarValoresDoNavegador();
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const { nome, email } = this.formulario.getRawValue();
    this.authService.cadastrar(nome, email).subscribe(() => void this.router.navigate(['/perfil']));
  }
}
