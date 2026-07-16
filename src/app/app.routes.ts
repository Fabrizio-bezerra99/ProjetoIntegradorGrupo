import { Routes } from '@angular/router';
import { LoginComponente } from './pages/login-componente/login-componente';
import { HomeComponente } from './pages/home-componente/home-componente';
import {ContatoComponente} from './pages/contato-componente/contato-componente';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponente
  },
  {
    path: 'login',
    component: LoginComponente
  },
  {
    path: 'contato',
    component: ContatoComponente
  }

];