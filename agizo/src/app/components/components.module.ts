import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, CommonModule, RouterModule, NgbModule, FormsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, ChatComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, ChatComponent],
})
export class ComponentsModule {}
