import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { LoginModule } from './login';
import { NavbarModule } from './navbar';
import { FooterModule } from './footer';
import { AutoCadastroModule } from './auto-cadastro';
=======
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared';
import { InicialRecrutadorComponent } from './pages/inicial-recrutador/inicial-recrutador.component';
import { InicialAdministradorComponent } from './pages/inicial-administrador/inicial-administrador.component';
import { InicialCandidatoComponent } from './pages/inicial-candidato/inicial-candidato.component';

>>>>>>> login-cadastro
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
<<<<<<< HEAD
  ],
  imports: [
    BrowserModule,
    LoginModule,
    NavbarModule,
    FooterModule,
    AutoCadastroModule,
=======
    AdminLayoutComponent,
    AuthLayoutComponent,
    InicialRecrutadorComponent,
    InicialAdministradorComponent,
    InicialCandidatoComponent,
>>>>>>> login-cadastro
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
