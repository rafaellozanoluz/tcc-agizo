import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { MODEL } from "../shared";

@Injectable({
  providedIn: "root",
})
export class CepService {
  private BASE_URL = "https://viacep.com.br";
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getCep(cep: string): Observable<MODEL.Cep> {
    const endpoint = this.BASE_URL + `/ws/${cep}/json/`;
    return this.httpClient.get<MODEL.Cep>(endpoint, this.httpOptions);
  }
}
