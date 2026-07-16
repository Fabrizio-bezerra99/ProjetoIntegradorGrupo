import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PortifolioService } from '../../core/services/portifolio-service';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { TattooCardComponent } from '../../shared/tattoo-card-component/tattoo-card-component';

@Component({
  selector: 'app-portfolio-componente',
  imports: [HeaderComponent, TattooCardComponent],
  templateUrl: './portfolio-componente.html',
  styleUrl: './portfolio-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponente {
  private readonly portfolioService = inject(PortifolioService);

  protected readonly estilos = this.portfolioService.listarEstilos();
  protected readonly estiloAtivo = signal('Todos');
  protected readonly busca = signal('');

  protected readonly trabalhosFiltrados = computed(() => {
    const termo = this.busca().trim().toLocaleLowerCase('pt-BR');
    return this.portfolioService.listar().filter((trabalho) => {
      const correspondeEstilo =
        this.estiloAtivo() === 'Todos' || trabalho.estilo === this.estiloAtivo();
      const correspondeBusca =
        !termo ||
        `${trabalho.titulo} ${trabalho.artista}`.toLocaleLowerCase('pt-BR').includes(termo);
      return correspondeEstilo && correspondeBusca;
    });
  });

  protected atualizarBusca(event: Event): void {
    this.busca.set((event.target as HTMLInputElement).value);
  }
}
