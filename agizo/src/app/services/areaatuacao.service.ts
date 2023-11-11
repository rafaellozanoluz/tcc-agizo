import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class AreaAtuacaoService {
  private BASE_URL = env.BASE_URL + 'areaatuacao';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de AreaAtuacao
  criarAreaAtuacao(areaatuacao: MODEL.AreaAtuacao): Observable<MODEL.AreaAtuacao> {
    return this.httpClient.post<MODEL.AreaAtuacao>(`${this.BASE_URL}`, areaatuacao);
  }

  // Método para obter todos os registros de AreaAtuacao
  obterAreaAtuacao(): Observable<MODEL.AreaAtuacao[]> {
    return this.httpClient.get<MODEL.AreaAtuacao[]>(`${this.BASE_URL}`);
  }

  obterAreaAtuacaoPorId(id: string): Observable<MODEL.AreaAtuacao> {
    return this.httpClient.get<MODEL.AreaAtuacao>(`${this.BASE_URL}/${id}`);
  }

  // Método para atualizar um registro de AreaAtuacao
  atualizarAreaAtuacao(areaatuacao: MODEL.AreaAtuacao): Observable<MODEL.AreaAtuacao> {
    return this.httpClient.put<MODEL.AreaAtuacao>(
      `${this.BASE_URL}/${areaatuacao.id}`,
      areaatuacao
    );
  }

  // Método para excluir um registro de Adicionais
  excluirAreaAtuacao(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
