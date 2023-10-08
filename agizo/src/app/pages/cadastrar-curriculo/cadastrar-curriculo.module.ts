import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculoAdicionaisComponent } from '../../pages/cadastrar-curriculo/curriculo-adicionais/curriculo-adicionais.component';
import { CurriculoAtuacaoComponent } from '../../pages/cadastrar-curriculo/curriculo-atuacao/curriculo-atuacao.component';
import { CurriculoExperienciaComponent } from '../../pages/cadastrar-curriculo/curriculo-experiencia/curriculo-experiencia.component';
import { CurriculoFormacaoComponent } from '../../pages/cadastrar-curriculo/curriculo-formacao/curriculo-formacao.component';
import { CurriculoHabilidadesComponent } from '../../pages/cadastrar-curriculo/curriculo-habilidades/curriculo-habilidades.component';
import { CurriculoResumoComponent } from '../../pages/cadastrar-curriculo/curriculo-resumo/curriculo-resumo.component';
import { GerarCurriculoComponent } from '../../pages/cadastrar-curriculo/gerar-curriculo/gerar-curriculo.component';

@NgModule({
  declarations: [
    CurriculoAdicionaisComponent,
    CurriculoExperienciaComponent,
    CurriculoFormacaoComponent,
    CurriculoResumoComponent,
    CurriculoHabilidadesComponent,
    CurriculoAtuacaoComponent,
    GerarCurriculoComponent,
  ],
  imports: [CommonModule],
})
export class CadastrarCurriculoModule {}
