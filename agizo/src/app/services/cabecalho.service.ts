import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class CabecalhoService {
  private BASE_URL = env.BASE_URL + 'cabecalho/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de Cabecalho
  criarCabecalho(cabecalho: MODEL.Cabecalho): Observable<MODEL.Cabecalho> {
    return this.httpClient.post<MODEL.Cabecalho>(`${this.BASE_URL}/cabecalho`, cabecalho);
  }

  // Método para obter todos os registros de Cabecalho
  obterCabecalho(): Observable<MODEL.Cabecalho[]> {
    return this.httpClient.get<MODEL.Cabecalho[]>(`${this.BASE_URL}/cabecalho`);
  }

  // Método para atualizar um registro de Cabecalho
  atualizarCabecalho(cabecalho: MODEL.Cabecalho): Observable<MODEL.Cabecalho> {
    return this.httpClient.put<MODEL.Cabecalho>(
      `${this.BASE_URL}/cabecalho/${cabecalho.id}`,
      cabecalho
    );
  }

  // Método para excluir um registro de Cabecalho
  excluirCabecalho(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/cabecalho/${id}`);
  }
}
