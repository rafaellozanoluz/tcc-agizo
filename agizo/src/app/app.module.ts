import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginModule } from './login';
import { NavbarModule } from './navbar';
import { FooterModule } from './footer';
import { AutoCadastroModule } from './auto-cadastro';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    NavbarModule,
    FooterModule,
    AutoCadastroModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
