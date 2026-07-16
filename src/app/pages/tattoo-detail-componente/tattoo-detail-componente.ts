import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { PortifolioService } from '../../core/services/portifolio-service';
import { TatuadorService } from '../../core/services/tatuador-service';

@Component({
  selector: 'app-tattoo-detail-componente',
  imports: [RouterLink],
  templateUrl: './tattoo-detail-componente.html',
  styleUrl: './tattoo-detail-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TattooDetailComponente {
  private readonly route = inject(ActivatedRoute);
  private readonly portfolioService = inject(PortifolioService);
  private readonly tatuadorService = inject(TatuadorService);
  private readonly trabalhos = this.portfolioService.listar();

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: 1 },
  );
  protected readonly favorito = signal(false);
  protected readonly trabalho = computed(
    () => this.portfolioService.buscarPorId(this.id()) ?? this.trabalhos[0],
  );
  protected readonly artista = computed(
    () =>
      this.tatuadorService.buscarPorNome(this.trabalho().artista) ??
      this.tatuadorService.listar()[0],
  );
  protected readonly indiceAtual = computed(() =>
    this.trabalhos.findIndex((item) => item.id === this.trabalho().id),
  );
  protected readonly anterior = computed(() => this.trabalhos[this.indiceAtual() - 1]);
  protected readonly proximo = computed(() => this.trabalhos[this.indiceAtual() + 1]);
  protected readonly semelhantes = computed(() =>
    this.trabalhos.filter((item) => item.id !== this.trabalho().id).slice(0, 4),
  );
}
