import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, User } from 'src/app/shared';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  BASE_URL = env.BASE_URL + 'usuarios/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<User> {
    return this.httpClient.get<User>(this.BASE_URL + id, this.httpOptions);
  }

  inserir(usuario: User): Observable<User> {
    return this.httpClient.post<User>(this.BASE_URL, JSON.stringify(usuario), this.httpOptions);
  }

  remover(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.BASE_URL + id, this.httpOptions);
  }

  alterar(usuario: User): Observable<User> {
    return this.httpClient.put<User>(
      this.BASE_URL + usuario.id,
      JSON.stringify(usuario),
      this.httpOptions
    );
  }

  login(login: Login): Observable<User | null> {
    // return this.buscarPorId(3);

    const params = new HttpParams().set('email', login.login).set('password', login.password);
    return this.httpClient.get<User | null>(this.BASE_URL + 'login/', {
      ...this.httpOptions,
      params,
    });
  }

  listarUsuariosCliente(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.BASE_URL + 'candidato/', this.httpOptions);
  }
}
