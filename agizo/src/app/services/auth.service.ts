import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { MODEL } from "../shared";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private BASE_URL = env.BASE_URL + "users/";
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  private readonly LS_KEY: string = "userLogged";

  constructor(private httpClient: HttpClient) {}

  public get userLogged(): MODEL.User | null {
    let user = localStorage[this.LS_KEY];
    return user ? JSON.parse(user) : null;
  }

  public set userLogged(user: MODEL.User) {
    localStorage[this.LS_KEY] = JSON.stringify(user);
  }

  login(login: MODEL.Login): Observable<MODEL.User | null> {
    const params = new HttpParams()
      .set("email", login.email)
      .set("password", login.password);
    return this.httpClient.get<MODEL.User | null>(this.BASE_URL, {
      ...this.httpOptions,
      params,
    });
    // return this.httpClient.post<MODEL.Login | null>(this.BASE_URL, login, {
    //   ...this.httpOptions,
    // });
    // TROCAR PARA ENDPOINT DE LOGIN
  }

  logout() {
    delete localStorage[this.LS_KEY];
  }
}
