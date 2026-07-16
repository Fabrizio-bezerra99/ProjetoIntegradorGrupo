import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TatuagemService } from '../../core/services/tatuagem-service';
import { HeaderComponent } from '../../shared/header-component/header-component';

@Component({
  selector: 'app-flash-tattoos-componente',
  imports: [RouterLink, HeaderComponent, CurrencyPipe],
  templateUrl: './flash-tattoos-componente.html',
  styleUrl: './flash-tattoos-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlashTattoosComponente {
  private readonly tatuagemService = inject(TatuagemService);
  protected readonly tamanhos = this.tatuagemService.listarTamanhos();
  protected readonly tamanhoAtivo = signal('Todos');
  protected readonly tattoos = computed(() =>
    this.tatuagemService
      .listarFlashTattoos()
      .filter((item) => this.tamanhoAtivo() === 'Todos' || item.tamanho === this.tamanhoAtivo()),
  );
}
