import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class AdicionaisGeralService {
  private BASE_URL = env.BASE_URL + 'adicionaisgeral';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de AdicionaisGeral
  criarAdicionaisGeral(adicionaisgeral: MODEL.AdicionaisGeral): Observable<MODEL.AdicionaisGeral> {
    return this.httpClient.post<MODEL.AdicionaisGeral>(`${this.BASE_URL}`, adicionaisgeral);
  }

  // Método para obter todos os registros de AdicionaisGeral
  obterAdicionaisGeral(): Observable<MODEL.AdicionaisGeral[]> {
    return this.httpClient.get<MODEL.AdicionaisGeral[]>(`${this.BASE_URL}`);
  }

  obterAdicionaisGeralPorId(id: string): Observable<MODEL.AdicionaisGeral> {
    return this.httpClient.get<MODEL.AdicionaisGeral>(`${this.BASE_URL}/${id}`);
  }

  // Método para atualizar um registro de AdicionaisGeral
  atualizarAdicionaisGeralo(
    adicionaisgeral: MODEL.AdicionaisGeral
  ): Observable<MODEL.AdicionaisGeral> {
    return this.httpClient.put<MODEL.AdicionaisGeral>(
      `${this.BASE_URL}/${adicionaisgeral.id}`,
      adicionaisgeral
    );
  }

  // Método para excluir um registro de AdicionaisGeral
  excluirAdicionaisGeral(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
