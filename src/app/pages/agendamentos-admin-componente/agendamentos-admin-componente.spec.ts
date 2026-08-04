import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AgendamentosAdminComponente } from './agendamentos-admin-componente';

describe('AgendamentosAdminComponente', () => {
  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [AgendamentosAdminComponente],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('deve mostrar o novo status quando o administrador confirma um agendamento pendente', () => {
    const fixture = TestBed.createComponent(AgendamentosAdminComponente);
    fixture.detectChanges();

    const botoesConfirmar = Array.from(
      fixture.nativeElement.querySelectorAll('.action-button--confirm'),
    ) as HTMLButtonElement[];

    const botaoConfirmar = botoesConfirmar.find((botao) => !botao.disabled);

    if (!botaoConfirmar) {
      throw new Error('O teste precisa de um agendamento pendente.');
    }

    const linhaDoAgendamento = botaoConfirmar.closest('tr');

    botaoConfirmar.click();
    fixture.detectChanges();

    expect(linhaDoAgendamento?.textContent).toContain('Confirmado');
    expect(botaoConfirmar.disabled).toBe(true);
  });

  it('deve mostrar o novo status quando o administrador cancela um agendamento', () => {
    const fixture = TestBed.createComponent(AgendamentosAdminComponente);
    fixture.detectChanges();

    const botoesCancelar = Array.from(
      fixture.nativeElement.querySelectorAll('.action-button--cancel'),
    ) as HTMLButtonElement[];

    const botaoCancelar = botoesCancelar.find((botao) => !botao.disabled);

    if (!botaoCancelar) {
      throw new Error('O teste precisa de um agendamento que possa ser cancelado.');
    }

    const linhaDoAgendamento = botaoCancelar.closest('tr');

    botaoCancelar.click();
    fixture.detectChanges();

    expect(linhaDoAgendamento?.textContent).toContain('Cancelado');
    expect(botaoCancelar.disabled).toBe(true);
  });

  afterEach(() => {
    localStorage.clear();
  });
});
