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
import { GerarCurriculoComponent } from '../../pages/gerar-curriculo/gerar-curriculo.component';
import { VisualizarCurriculoComponent } from '../../pages/visualizar-curriculo/visualizar-curriculo.component';
import { CurriculoAdicionaisComponent } from '../../components/curriculo-adicionais/curriculo-adicionais.component';
import { CurriculoAtuacaoComponent } from '../../components/curriculo-atuacao/curriculo-atuacao.component';
import { CurriculoExperienciaComponent } from '../../components/curriculo-experiencia/curriculo-experiencia.component';
import { CurriculoFormacaoComponent } from '../../components/curriculo-formacao/curriculo-formacao.component';
import { CurriculoHabilidadesComponent } from '../../components/curriculo-habilidades/curriculo-habilidades.component';
import { CurriculoResumoComponent } from '../../components/curriculo-resumo/curriculo-resumo.component';
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
  ],
  declarations: [
    InicialCandidatoComponent,
    InicialAdministradorComponent,
    GerarCurriculoComponent,
    InicialRecrutadorComponent,
    VisualizarCurriculoComponent,
    CurriculoAdicionaisComponent,
    CurriculoExperienciaComponent,
    CurriculoFormacaoComponent,
    CurriculoResumoComponent,
    CurriculoHabilidadesComponent,
    CurriculoAtuacaoComponent,
  ],
})
export class AdminLayoutModule {}
