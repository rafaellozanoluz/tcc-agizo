import { Routes } from '@angular/router';

import { InicialCandidatoComponent } from '../../pages/inicial-candidato/inicial-candidato.component';
import { InicialRecrutadorComponent } from '../../pages/inicial-recrutador/inicial-recrutador.component';
import { InicialAdministradorComponent } from '../../pages/inicial-administrador/inicial-administrador.component';
import { VisualizarCurriculoComponent } from '../../pages/visualizar-curriculo/visualizar-curriculo.component';
import { CadastrarCurriculoComponent } from '../../pages/cadastrar-curriculo/cadastrar-curriculo.component';
import { CurriculogeralComponent } from '../../pages/curriculogeral/curriculogeral.component';
import { RelatorioComponent } from '../../pages/relatorio/relatorio.component';
import { AdicionaisComponent } from '../../pages/adicionais/adicionais.component';
import { NiveisComponent } from '../../pages/niveis/niveis.component';
import { AreasComponent } from '../../pages/areas/areas.component';

import { AuthGuard } from './auth.guard';

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
    path: 'cadastrar-curriculo',
    component: CadastrarCurriculoComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'candidato',
    },
  },
  {
    path: 'cadastrar-curriculo',
    loadChildren: () =>
      import('../../pages/cadastrar-curriculo/cadastrar-curriculo.module').then(
        (m) => m.CadastrarCurriculoModule
      ),
    canActivate: [AuthGuard],
    data: {
      role: 'candidato',
    },
  },
  {
    path: 'visualizar-curriculo',
    component: VisualizarCurriculoComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'candidato',
    },
  },
  {
    path: 'relatorio',
    component: RelatorioComponent,
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
  {
    path: 'curriculogeral',
    component: CurriculogeralComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'recrutador',
    },
  },
  {
    path: 'inicial-administrador',
    component: InicialAdministradorComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'administrador',
    },
  },
  {
    path: 'adicionais',
    component: AdicionaisComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'administrador',
    },
  },
  {
    path: 'niveis',
    component: NiveisComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'administrador',
    },
  },
  {
    path: 'areas',
    component: AreasComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'administrador',
    },
  },
];
