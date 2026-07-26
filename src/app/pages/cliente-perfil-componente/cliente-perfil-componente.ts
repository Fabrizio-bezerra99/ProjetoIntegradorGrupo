import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AgendamentoService } from '../../core/services/agendamento-service';
import { AuthService } from '../../core/services/auth-service';
import { CatalogoService } from '../../core/services/catalogo-service';

@Component({
  selector: 'app-cliente-perfil-componente',
  imports: [RouterLink],
  templateUrl: './cliente-perfil-componente.html',
  styleUrl: './cliente-perfil-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientePerfilComponente {
  private readonly router = inject(Router);
  private readonly agendamentoService = inject(AgendamentoService);

  protected readonly authService = inject(AuthService);
  protected readonly agendamentos = this.agendamentoService
    .listarResumos()
    .filter((item) => item.cliente === this.authService.usuarioAtual()?.nome);
  protected readonly favoritos = inject(CatalogoService).listarTrabalhosPortfolio().slice(0, 5);
  protected readonly totalAgendamentos = this.agendamentos.length;

  protected sair(): void {
    this.authService.logout();
    void this.router.navigate(['/']);
  }
}
