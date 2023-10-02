import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userLogged = this.authService.userLogged;
    const url = state.url;

    if (userLogged) {
      console.log('usuario logado', userLogged.type);
      const role = route.data?.['role'];
      console.log('role', role);

      if (role && role.indexOf(userLogged.type) === -1) {
        this.router.navigate(['/login'], {
          queryParams: { error: 'Proibido o acesso a ' + url },
        });
        return false;
      }
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { error: 'Deve fazer o login antes de acessar ' + url },
    });

    return false;
  }
}
