import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { TatuadorService } from '../../core/services/tatuador-service';

@Component({
  selector: 'app-tatuador-perfil-componente',
  imports: [RouterLink],
  templateUrl: './tatuador-perfil-componente.html',
  styleUrl: './tatuador-perfil-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TatuadorPerfilComponente {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TatuadorService);
  private readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: 1 },
  );
  protected readonly artista = computed(
    () => this.service.buscarPorId(this.id()) ?? this.service.listar()[0],
  );
  protected readonly avaliacoes = this.service.listarAvaliacoes();
}
