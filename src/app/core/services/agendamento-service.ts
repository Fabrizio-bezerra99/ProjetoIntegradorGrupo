import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AGENDAMENTOS } from '../data/catalogo.mock';
import { AgendamentoResumo } from '../../models/catalogo';
import { Agendamento } from '../../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly apiUrl = 'http://localhost:8080/agendamentos';

  constructor(private http: HttpClient) {}

  // Dados simulados usados atualmente pelas páginas
  listarResumos(): readonly AgendamentoResumo[] {
    return AGENDAMENTOS;
  }

  // CRUD conectado ao backend
  listar(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(
      `${this.apiUrl}/${id}`
    );
  }

  cadastrar(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(
      this.apiUrl,
      agendamento
    );
  }

  atualizar(
    id: number,
    agendamento: Agendamento
  ): Observable<Agendamento> {
    return this.http.put<Agendamento>(
      `${this.apiUrl}/${id}`,
      agendamento
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}