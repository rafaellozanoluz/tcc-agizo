import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import { Login, User } from 'src/app/shared';

const LS_KEY: string = 'userLogged';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private usuarioService: UsuarioService) {}

  public get userLogged(): User {
    let user = localStorage[LS_KEY];
    return user ? JSON.parse(user) : null;
  }

  public set userLogged(user: User) {
    localStorage[LS_KEY] = JSON.stringify(user);
  }

  logout() {
    delete localStorage[LS_KEY];
  }
}
