import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AgendamentosAdminComponente } from './agendamentos-admin-componente';

describe('AgendamentosAdminComponente', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [AgendamentosAdminComponente],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('deve mostrar o novo status quando o administrador confirma um agendamento pendente', () => {
    const fixture = TestBed.createComponent(AgendamentosAdminComponente);
    httpTesting.expectOne('http://localhost:8080/api/agendamentos').flush([
      {
        id: 2,
        cliente: 'Maria Santos',
        artista: 'Mariana Costa',
        data: '26/08/2026',
        horario: '10:00',
        status: 'Pendente',
      },
    ]);
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
    httpTesting.expectOne('http://localhost:8080/api/agendamentos').flush([
      {
        id: 2,
        cliente: 'Maria Santos',
        artista: 'Mariana Costa',
        data: '26/08/2026',
        horario: '10:00',
        status: 'Pendente',
      },
    ]);
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
    httpTesting.verify();
    localStorage.clear();
  });
});
