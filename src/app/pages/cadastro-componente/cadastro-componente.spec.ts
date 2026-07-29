import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CadastroComponente } from './cadastro-componente';

describe('CadastroComponente', () => {
  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [CadastroComponente],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve iniciar com a senha oculta e o botão acessível', () => {
    const fixture = TestBed.createComponent(CadastroComponente);
    fixture.detectChanges();

    const campoSenha = fixture.nativeElement.querySelector(
      'input[formControlName="senha"]',
    ) as HTMLInputElement;

    const botaoSenha = fixture.nativeElement.querySelector(
      '.password-field button',
    ) as HTMLButtonElement;

    expect(campoSenha.type).toBe('password');
    expect(botaoSenha.getAttribute('aria-label')).toBe('Mostrar senha');
    expect(botaoSenha.getAttribute('aria-pressed')).toBe('false');

    botaoSenha.click();
    fixture.detectChanges();

    expect(campoSenha.type).toBe('text');
    expect(botaoSenha.getAttribute('aria-label')).toBe('Ocultar senha');
    expect(botaoSenha.getAttribute('aria-pressed')).toBe('true');
  });
});
