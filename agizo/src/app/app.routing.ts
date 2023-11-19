import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home', // Define a rota para o componente Home
    component: HomeComponent,
  },
  {
    path: 'chat', // Define a rota para o componente Home
    component: ChatComponent,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/layouts/admin-layout/admin-layout.module').then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/layouts/auth-layout/auth-layout.module').then((m) => m.AuthLayoutModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
