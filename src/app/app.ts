import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponente } from './pages/login-componente/login-componente';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('codeInk');
}