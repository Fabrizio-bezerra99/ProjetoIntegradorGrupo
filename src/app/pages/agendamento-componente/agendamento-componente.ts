import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TatuadorService } from '../../core/services/tatuador-service';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { toSignal } from '@angular/core/rxjs-interop';

type OpcaoAgendamento = 'portfolio' | 'referencia';

@Component({
  selector: 'app-agendamento-componente',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './agendamento-componente.html',
  styleUrl: './agendamento-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendamentoComponente {
  protected readonly etapas = ['Opção', 'Tatuador', 'Data e horário', 'Confirmação'] as const;
  protected readonly horarios = [
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ] as const;
  private readonly tatuadorService = inject(TatuadorService);
  protected readonly artistas = toSignal(
    this.tatuadorService.listar(),
    {
      initialValue: [],
    },
  );
  protected readonly etapa = signal(0);
  protected readonly opcao = signal<OpcaoAgendamento | null>(null);
  protected readonly artistaId = signal<number | null>(null);
  protected readonly data = signal('');
  protected readonly horario = signal('');
  protected readonly dataMinima = new Date().toISOString().slice(0, 10);
  protected readonly artistaSelecionado = computed(() =>
  this.artistas().find(
    (artista) => artista.id === this.artistaId(),
  ),
);

  protected podeAvancar(): boolean {
    if (this.etapa() === 0) return this.opcao() !== null;
    if (this.etapa() === 1) return this.artistaId() !== null;
    if (this.etapa() === 2) return Boolean(this.data() && this.horario());
    return true;
  }

  protected avancar(): void {
    if (this.podeAvancar()) this.etapa.update((valor) => Math.min(3, valor + 1));
  }
  protected voltar(): void {
    this.etapa.update((valor) => Math.max(0, valor - 1));
  }
  protected atualizarData(event: Event): void {
    this.data.set((event.target as HTMLInputElement).value);
  }
}
