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
  protected readonly authService = inject(AuthService);
  protected readonly agendamentos = inject(AgendamentoService).listarResumos().slice(0, 3);
  protected readonly favoritos = inject(CatalogoService)
  .listarTrabalhosPortfolio()
  .slice(0, 5);
  private readonly router = inject(Router);

  protected sair(): void {
    this.authService.logout();
    void this.router.navigate(['/']);
  }
}
