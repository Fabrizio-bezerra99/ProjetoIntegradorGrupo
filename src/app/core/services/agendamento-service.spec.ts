import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AGENDAMENTOS } from '../data/catalogo.mock';
import type { AgendamentoResumo } from '../../models/catalogo';
import { AgendamentoService } from './agendamento-service';

describe('AgendamentoService', () => {
  let service: AgendamentoService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });

    service = TestBed.inject(AgendamentoService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve criar o service', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar os agendamentos mockados quando não existem dados salvos', () => {
    const agendamentos = service.listarResumos();

    expect(agendamentos).toHaveLength(AGENDAMENTOS.length);
    expect(agendamentos.map((item) => item.id)).toEqual(AGENDAMENTOS.map((item) => item.id));
  });

  it('deve cadastrar um resumo com os dados formatados', () => {
    const agendamento = service.cadastrarResumo('  Ana Lima  ', {
      artista: 'Mariana Costa',
      data: '2026-09-10',
      horario: '14:00',
      projeto: 'Referência própria',
    });

    expect(agendamento).toEqual({
      id: Math.max(...AGENDAMENTOS.map((item) => item.id)) + 1,
      cliente: 'Ana Lima',
      artista: 'Mariana Costa',
      data: '10/09/2026',
      horario: '14:00',
      status: 'Pendente',
      projeto: 'Referência própria',
    });
  });

  it('deve salvar o novo agendamento no localStorage', () => {
    const agendamento = service.cadastrarResumo('Ana Lima', {
      artista: 'Mariana Costa',
      data: '2026-09-10',
      horario: '14:00',
      projeto: 'Referência própria',
    });

    const valorSalvo = localStorage.getItem('codeInk.agendamentos');
    const agendamentosSalvos = JSON.parse(valorSalvo ?? '[]') as unknown;

    expect(agendamentosSalvos).toEqual([agendamento]);
  });

  it('deve atualizar o status de um agendamento personalizado', () => {
    const agendamento = service.cadastrarResumo('Ana Lima', {
      artista: 'Mariana Costa',
      data: '2026-09-10',
      horario: '14:00',
      projeto: 'Referência própria',
    });

    const atualizou = service.atualizarStatusResumo(agendamento.id, 'Confirmado');

    const agendamentoAtualizado = service
      .listarResumos()
      .find((item) => item.id === agendamento.id);

    expect(atualizou).toBe(true);
    expect(agendamentoAtualizado?.status).toBe('Confirmado');
  });

  it('deve atualizar um agendamento mockado sem duplicá-lo', () => {
    const agendamentoMock = AGENDAMENTOS.find((item) => item.status === 'Pendente');

    if (!agendamentoMock) {
      throw new Error('O teste precisa de um agendamento mockado pendente.');
    }

    const atualizou = service.atualizarStatusResumo(agendamentoMock.id, 'Confirmado');

    const ocorrencias = service.listarResumos().filter((item) => item.id === agendamentoMock.id);

    expect(atualizou).toBe(true);
    expect(ocorrencias).toHaveLength(1);
    expect(ocorrencias[0].status).toBe('Confirmado');
  });

  it('deve retornar false sem alterar a lista quando o ID não existe', () => {
    const listaAntes = service.listarResumos();

    const atualizou = service.atualizarStatusResumo(999, 'Cancelado');

    const listaDepois = service.listarResumos();

    expect(atualizou).toBe(false);
    expect(listaDepois).toEqual(listaAntes);
    expect(localStorage.getItem('codeInk.agendamentos')).toBeNull();
  });

  it('deve persistir o novo status de um agendamento mockado', () => {
    const agendamentoMock = AGENDAMENTOS.find((item) => item.status === 'Pendente');

    if (!agendamentoMock) {
      throw new Error('O teste precisa de um agendamento mockado pendente.');
    }

    service.atualizarStatusResumo(agendamentoMock.id, 'Confirmado');

    const valorSalvo = localStorage.getItem('codeInk.agendamentos');
    const agendamentosSalvos = JSON.parse(valorSalvo ?? '[]') as AgendamentoResumo[];

    const agendamentoSalvo = agendamentosSalvos.find((item) => item.id === agendamentoMock.id);

    expect(agendamentoSalvo?.status).toBe('Confirmado');
  });

  it('deve carregar o agendamento salvo na chave antiga', () => {
    TestBed.resetTestingModule();

    localStorage.setItem(
      'codeInk.ultimoAgendamento',
      JSON.stringify({
        artista: 'Lucas Oliveira',
        data: '2026-09-11',
        horario: '15:00',
        projeto: 'Inspiração do portfólio',
      }),
    );

    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });

    const serviceComDadoAntigo = TestBed.inject(AgendamentoService);
    const [agendamentoMigrado] = serviceComDadoAntigo.listarResumos();

    expect(agendamentoMigrado).toEqual({
      id: Math.max(...AGENDAMENTOS.map((item) => item.id)) + 1,
      cliente: 'João Silva',
      artista: 'Lucas Oliveira',
      data: '11/09/2026',
      horario: '15:00',
      status: 'Pendente',
      projeto: 'Inspiração do portfólio',
    });
  });

  it('deve ignorar dados inválidos e manter os agendamentos mockados', () => {
    TestBed.resetTestingModule();

    localStorage.setItem('codeInk.agendamentos', 'conteúdo que não é um JSON válido');

    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });

    const serviceComDadoInvalido = TestBed.inject(AgendamentoService);
    const agendamentos = serviceComDadoInvalido.listarResumos();

    expect(agendamentos).toHaveLength(AGENDAMENTOS.length);
    expect(agendamentos.map((item) => item.id)).toEqual(AGENDAMENTOS.map((item) => item.id));
  });
});
