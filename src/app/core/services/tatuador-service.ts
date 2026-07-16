import { Injectable } from '@angular/core';
import { ARTISTAS, AVALIACOES_ARTISTA } from '../data/catalogo.mock';
import { ArtistaCatalogo, AvaliacaoArtista } from '../../models/catalogo';

@Injectable({ providedIn: 'root' })
export class TatuadorService {
  listar(): readonly ArtistaCatalogo[] {
    return ARTISTAS;
  }

  buscarPorId(id: number): ArtistaCatalogo | undefined {
    return ARTISTAS.find((artista) => artista.id === id);
  }

  buscarPorNome(nome: string): ArtistaCatalogo | undefined {
    return ARTISTAS.find((artista) => artista.nome === nome);
  }

  listarAvaliacoes(): readonly AvaliacaoArtista[] {
    return AVALIACOES_ARTISTA;
  }
}
