import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AgendamentoService } from '../../core/services/agendamento-service';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-dashboard-componente',
  imports: [RouterLink],
  templateUrl: './dashboard-componente.html',
  styleUrl: './dashboard-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponente {
  protected readonly agendamentos = inject(AgendamentoService).listarResumos();
  protected readonly indicadores = [
    { rotulo: 'Agendamentos', valor: '24', detalhe: '+3 esta semana' },
    { rotulo: 'Clientes', valor: '52', detalhe: '+8 este mês' },
    { rotulo: 'Tatuagens', valor: '18', detalhe: 'este mês' },
    { rotulo: 'Avaliações', valor: '35', detalhe: '4,8 de média' },
  ] as const;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected sair(): void {
    this.authService.logout();
    void this.router.navigate(['/']);
  }
}
