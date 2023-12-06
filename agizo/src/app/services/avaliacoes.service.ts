import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class AvaliacoesService {
  private BASE_URL = env.BASE_URL + 'avaliacoes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de Avaliacoes
  criarAvaliacoes(avaliacoes: MODEL.Avaliacoes): Observable<MODEL.Avaliacoes> {
    return this.httpClient.post<MODEL.Avaliacoes>(`${this.BASE_URL}`, avaliacoes);
  }

  // Método para obter todos os registros de Avaliacoes
  obterAvaliacoes(): Observable<MODEL.Avaliacoes[]> {
    return this.httpClient.get<MODEL.Avaliacoes[]>(`${this.BASE_URL}`);
  }

  obterAvaliacoesPorUsuario(idUsuario: string): Observable<MODEL.Avaliacoes> {
    return this.httpClient.get<MODEL.Avaliacoes>(`${this.BASE_URL}/${idUsuario}`);
  }

  // Método para atualizar um registro de Avaliacoes
  atualizarAvaliacoes(avaliacoes: MODEL.Avaliacoes): Observable<MODEL.Avaliacoes> {
    return this.httpClient.put<MODEL.Avaliacoes>(`${this.BASE_URL}/${avaliacoes.id}`, avaliacoes);
  }

  // Método para excluir um registro de Avaliacoes
  excluirAvaliacoes(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
