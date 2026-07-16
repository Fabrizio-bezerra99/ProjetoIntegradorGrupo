import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-login-componente',
  imports: [FormsModule],
  templateUrl: './login-componente.html',
  styleUrl: './login-componente.css'
})
export class LoginComponente {

  // Guarda o email digitado no input
  email: string = '';

  // Guarda a senha digitada no input
  senha: string = '';

  // Guarda a mensagem de erro, se o login falhar
  mensagemErro: string = '';

  constructor(
    // Service que vai cuidar da lógica de login
    private authService: AuthService,

    // Router que permite mudar de página
    private router: Router
  ) {}

  // Função chamada quando clicar no botão Entrar
  entrar() {
    this.authService.login(this.email, this.senha).subscribe({
      next: (usuario) => {
        console.log('Login realizado:', usuario);

        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.error('Erro no login:', erro);
        this.mensagemErro = 'Email ou senha inválidos';
      }
    });
  }
}