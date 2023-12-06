import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class VisualizacoesService {
  private BASE_URL = env.BASE_URL + 'visualizacoes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de Visualizacoes
  criarVisualizacoes(visualizacoes: MODEL.Visualizacoes): Observable<MODEL.Visualizacoes> {
    return this.httpClient.post<MODEL.Visualizacoes>(`${this.BASE_URL}`, visualizacoes);
  }

  // Método para obter todos os registros de Visualizacoes
  obterVisualizacoes(): Observable<MODEL.Visualizacoes[]> {
    return this.httpClient.get<MODEL.Visualizacoes[]>(`${this.BASE_URL}`);
  }

  obterVisualizacoesPorUsuario(idUsuario: string): Observable<MODEL.Visualizacoes> {
    return this.httpClient.get<MODEL.Visualizacoes>(`${this.BASE_URL}/${idUsuario}`);
  }

  // Método para atualizar um registro de Visualizacoes
  atualizarVisualizacoes(visualizacoes: MODEL.Visualizacoes): Observable<MODEL.Visualizacoes> {
    return this.httpClient.put<MODEL.Visualizacoes>(
      `${this.BASE_URL}/${visualizacoes.id}`,
      visualizacoes
    );
  }

  // Método para incrementar a quantidade por idusuario
  incrementarQuantidade(idUsuario: string): Observable<void> {
    return this.httpClient.put<void>(`${this.BASE_URL}/incrementar-quantidade/${idUsuario}`, null);
  }

  // Método para excluir um registro de Visualizacoes
  excluirVisualizacoes(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
