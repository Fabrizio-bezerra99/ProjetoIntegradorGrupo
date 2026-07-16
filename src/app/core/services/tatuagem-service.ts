import { Injectable } from '@angular/core';
import { FLASH_TATTOOS } from '../data/catalogo.mock';
import { FlashTattoo } from '../../models/catalogo';

@Injectable({ providedIn: 'root' })
export class TatuagemService {
  listarFlashTattoos(): readonly FlashTattoo[] {
    return FLASH_TATTOOS;
  }

  listarTamanhos(): readonly string[] {
    return ['Todos', 'Pequeno', 'Médio', 'Grande'];
  }
}
