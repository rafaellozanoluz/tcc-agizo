import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { InicialCandidatoComponent } from '../../pages/inicial-candidato/inicial-candidato.component';
import { InicialRecrutadorComponent } from '../../pages/inicial-recrutador/inicial-recrutador.component';
import { InicialAdministradorComponent } from '../../pages/inicial-administrador/inicial-administrador.component';
import { VisualizarCurriculoComponent } from '../../pages/visualizar-curriculo/visualizar-curriculo.component';
import { CurriculogeralComponent } from '../../pages/curriculogeral/curriculogeral.component';
import { CadastrarCurriculoModule } from '../../pages/cadastrar-curriculo/cadastrar-curriculo.module';
import { RelatorioComponent } from '../../pages/relatorio/relatorio.component';
import { AdicionaisComponent } from '../../pages/adicionais/adicionais.component';
import { NiveisComponent } from '../../pages/niveis/niveis.component';
import { AreasComponent } from '../../pages/areas/areas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    CadastrarCurriculoModule,
  ],
  declarations: [
    InicialCandidatoComponent,
    InicialAdministradorComponent,
    InicialRecrutadorComponent,
    VisualizarCurriculoComponent,
    CurriculogeralComponent,
    RelatorioComponent,
    AdicionaisComponent,
    NiveisComponent,
    AreasComponent,
  ],
})
export class AdminLayoutModule {}
