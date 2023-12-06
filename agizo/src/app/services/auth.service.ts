import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { MODEL } from '../shared';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = env.BASE_URL + 'users/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private readonly LS_KEY: string = 'userLogged';

  constructor(private httpClient: HttpClient) {}

  public get userLogged(): MODEL.User | null {
    let user = localStorage[this.LS_KEY];
    return user ? JSON.parse(user) : null;
  }

  public set userLogged(user: MODEL.User) {
    localStorage[this.LS_KEY] = JSON.stringify(user);
  }

  public get userId(): number | null {
    const user = this.userLogged;
    return user ? Number(user.id) : null;
  }

  login(login: MODEL.Login): Observable<MODEL.User | null> {
    const params = new HttpParams().set('email', login.email).set('password', login.password);
    return this.httpClient
      .get<MODEL.User | null>(this.BASE_URL, {
        ...this.httpOptions,
        params,
      })
      .pipe(
        tap((user) => {
          if (user) {
            this.userLogged = user;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro durante o login:', error);
          // Trate o erro aqui, exibindo uma mensagem de erro para o usuário, por exemplo
          return throwError(
            'Falha no login. Por favor, verifique suas credenciais e tente novamente.'
          );
        })
      );
  }

  logout() {
    delete localStorage[this.LS_KEY];
  }
}
