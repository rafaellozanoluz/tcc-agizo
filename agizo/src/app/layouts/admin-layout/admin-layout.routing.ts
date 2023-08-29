import { Routes } from '@angular/router';

import { InicialCandidatoComponent } from '../../pages/inicial-candidato/inicial-candidato.component';
import { InicialRecrutadorComponent } from '../../pages/inicial-recrutador/inicial-recrutador.component';
import { InicialAdministradorComponent } from '../../pages/inicial-administrador/inicial-administrador.component';
import { AuthGuard } from '../auth-layout/auth.guard';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'inicial-candidato',
    component: InicialCandidatoComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'candidato',
    },
  },
  {
    path: 'inicial-recrutador',
    component: InicialRecrutadorComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'recrutador',
    },
  },
  { path: 'inicial-administrador', component: InicialAdministradorComponent },
];
