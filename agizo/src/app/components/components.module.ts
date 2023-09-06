import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarDefaultComponent } from './navbar-default/navbar-default.component';
import { CurriculoAtuacaoComponent } from './curriculo-atuacao/curriculo-atuacao.component';
import { CurriculoResumoComponent } from './curriculo-resumo/curriculo-resumo.component';
import { CurriculoExperienciaComponent } from './curriculo-experiencia/curriculo-experiencia.component';
import { CurriculoFormacaoComponent } from './curriculo-formacao/curriculo-formacao.component';
import { CurriculoHabilidadesComponent } from './curriculo-habilidades/curriculo-habilidades.component';
import { CurriculoAdicionaisComponent } from './curriculo-adicionais/curriculo-adicionais.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, NavbarDefaultComponent, CurriculoAtuacaoComponent, CurriculoResumoComponent, CurriculoExperienciaComponent, CurriculoFormacaoComponent, CurriculoHabilidadesComponent, CurriculoAdicionaisComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, NavbarDefaultComponent, CurriculoAtuacaoComponent, CurriculoResumoComponent, CurriculoExperienciaComponent, CurriculoFormacaoComponent, CurriculoHabilidadesComponent, CurriculoAdicionaisComponent], 
})
export class ComponentsModule {}
