import { Injectable } from '@angular/core';
import { TRABALHOS_PORTFOLIO } from '../data/catalogo.mock';
import { TrabalhoPortfolio } from '../../models/catalogo';

@Injectable({ providedIn: 'root' })
export class PortifolioService {
  listar(): readonly TrabalhoPortfolio[] {
    return TRABALHOS_PORTFOLIO;
  }

  buscarPorId(id: number): TrabalhoPortfolio | undefined {
    return TRABALHOS_PORTFOLIO.find((trabalho) => trabalho.id === id);
  }

  listarEstilos(): readonly string[] {
    return ['Todos', ...new Set(TRABALHOS_PORTFOLIO.map((trabalho) => trabalho.estilo))];
  }
}
