import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private BASE_URL = env.BASE_URL + 'users/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<MODEL.Client[]> {
    return this.httpClient.get<MODEL.Client[]>(this.BASE_URL, this.httpOptions);
  }

  getById(id: number): Observable<MODEL.Client> {
    return this.httpClient.get<MODEL.Client>(this.BASE_URL + id, this.httpOptions);
  }

  create(client: MODEL.Client): Observable<MODEL.Client> {
    return this.httpClient.post<MODEL.Client>(
      this.BASE_URL,
      JSON.stringify(client),
      this.httpOptions
    );
  }

  update(client: MODEL.Client): Observable<MODEL.Client> {
    return this.httpClient.put<MODEL.Client>(
      this.BASE_URL + client.id,
      JSON.stringify(client),
      this.httpOptions
    );
  }

  delete(id: number): Observable<MODEL.Client> {
    return this.httpClient.delete<MODEL.Client>(this.BASE_URL + id, this.httpOptions);
  }
}
