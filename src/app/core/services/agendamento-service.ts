import { Injectable } from '@angular/core';
import { AGENDAMENTOS } from '../data/catalogo.mock';
import { AgendamentoResumo } from '../../models/catalogo';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  listarResumos(): readonly AgendamentoResumo[] {
    return AGENDAMENTOS;
  }
}
