import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AgendamentoService } from '../../core/services/agendamento-service';
import type { StatusAgendamento } from '../../models/catalogo';

@Component({
  selector: 'app-agendamentos-admin-componente',
  imports: [],
  templateUrl: './agendamentos-admin-componente.html',
  styleUrl: './agendamentos-admin-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendamentosAdminComponente {
  private readonly agendamentoService = inject(AgendamentoService);

  protected agendamentos = this.agendamentoService.listarResumos();

  protected atualizarStatus(id: number, status: StatusAgendamento): void {
    const atualizou = this.agendamentoService.atualizarStatusResumo(id, status);

    if (atualizou) {
      this.agendamentos = this.agendamentoService.listarResumos();
    }
  }
}
