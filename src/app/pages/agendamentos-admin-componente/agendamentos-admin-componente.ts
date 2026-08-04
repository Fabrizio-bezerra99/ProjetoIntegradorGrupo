import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { AgendamentoService } from '../../core/services/agendamento-service';
import type { AgendamentoResumo, StatusAgendamento } from '../../models/catalogo';

@Component({
  selector: 'app-agendamentos-admin-componente',
  imports: [],
  templateUrl: './agendamentos-admin-componente.html',
  styleUrl: './agendamentos-admin-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendamentosAdminComponente {
  private readonly agendamentoService = inject(AgendamentoService);

  private readonly agendamentosState = signal<readonly AgendamentoResumo[]>([]);
  protected readonly agendamentos = this.agendamentosState.asReadonly();

  constructor() {
    this.agendamentoService.listarResumos().subscribe({
      next: (agendamentos) => this.agendamentosState.set(agendamentos),
      error: () => this.agendamentosState.set([]),
    });
  }

  protected atualizarStatus(id: number, status: StatusAgendamento): void {
    const atualizou = this.agendamentoService.atualizarStatusResumo(id, status);

    if (atualizou) {
      this.agendamentosState.update((agendamentos) =>
        agendamentos.map((agendamento) =>
          agendamento.id === id ? { ...agendamento, status } : agendamento,
        ),
      );
    }
  }
}
