import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TatuadorService } from '../../core/services/tatuador-service';
import { ArtistCardComponent } from '../../shared/artist-card-component/artist-card-component';
import { HeaderComponent } from '../../shared/header-component/header-component';

@Component({
  selector: 'app-tatuadores-componente',
  imports: [HeaderComponent, ArtistCardComponent],
  templateUrl: './tatuadores-componente.html',
  styleUrl: './tatuadores-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TatuadoresComponente {
  protected readonly artistas = inject(TatuadorService).listar();
}
