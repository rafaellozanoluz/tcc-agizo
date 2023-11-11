import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { MODEL } from 'src/app/shared';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission?: string[];
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/inicial-candidato',
    title: 'Página Inicial - Candidato',
    icon: 'ni-tv-2 text-primary',
    class: '',
    permission: ['candidato'],
  },
  {
    path: '/visualizar-curriculo',
    title: 'Ver Currículo',
    icon: 'fa fa-shopping-cart text-green',
    class: '',
    permission: ['candidato'],
  },
  {
    path: '/inicial-recrutador',
    title: 'Página Inicial - Recrutador',
    icon: 'ni-tv-2 text-primary',
    class: '',
    permission: ['recrutador'],
  },
  {
    path: '/curriculogeral',
    title: 'Buscar Currículos',
    icon: 'ni-tv-2 text-primary',
    class: '',
    permission: ['recrutador'],
  },
  {
    path: '/inicial-administrador',
    title: 'Página Inicial - Administrador',
    icon: 'fa fa-shopping-cart text-green',
    class: '',
    permission: ['administrador'],
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => {
      if (menuItem?.permission?.includes(this.userLogged.type)) {
        return menuItem;
      }
    });

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  get userLogged(): MODEL.User | null {
    return this.authService.userLogged;
  }
}
