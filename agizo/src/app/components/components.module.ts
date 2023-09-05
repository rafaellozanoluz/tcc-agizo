import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarDefaultComponent } from './navbar-default/navbar-default.component';
import { CurriculoAtuacaoComponent } from './curriculo-atuacao/curriculo-atuacao.component';
import { CurriculoCabecalhoComponent } from './curriculo-cabecalho/curriculo-cabecalho.component';
import { CurriculoResumoComponent } from './curriculo-resumo/curriculo-resumo.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, NavbarDefaultComponent, CurriculoAtuacaoComponent, CurriculoCabecalhoComponent, CurriculoResumoComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, NavbarDefaultComponent, CurriculoAtuacaoComponent, CurriculoCabecalhoComponent, CurriculoResumoComponent], 
})
export class ComponentsModule {}
