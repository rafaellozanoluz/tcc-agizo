import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cabecalho } from '../shared/models/cabecalho.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CabecalhoService {
  private BASE_URL = environment.BASE_URL + 'cabecalho';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  criarCabecalho(cabecalho: Cabecalho): Observable<Cabecalho> {
    return this.httpClient.post<Cabecalho>(this.BASE_URL, cabecalho, this.httpOptions);
  }

  obterTodosCabecalhos(): Observable<Cabecalho[]> {
    return this.httpClient.get<Cabecalho[]>(this.BASE_URL);
  }

  obterCidades(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.BASE_URL}/cidades`);
  }

  obterEstados(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.BASE_URL}/estados`);
  }

  obterCabecalhoPorUsuario(idUsuario: string): Observable<Cabecalho> {
    return this.httpClient.get<Cabecalho>(`${this.BASE_URL}/${idUsuario}`);
  }

  atualizarCabecalho(cabecalho: Cabecalho): Observable<Cabecalho> {
    return this.httpClient.put<Cabecalho>(
      `${this.BASE_URL}/${cabecalho.id}`,
      cabecalho,
      this.httpOptions
    );
  }

  excluirCabecalho(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
