import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class FormacaoService {
  private BASE_URL = env.BASE_URL + 'formacao';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de Formacao
  criarFormacao(formacao: MODEL.Formacao): Observable<MODEL.Formacao> {
    return this.httpClient.post<MODEL.Formacao>(`${this.BASE_URL}`, formacao);
  }

  // Método para obter todos os registros de Formacao
  obterFormacao(): Observable<MODEL.Formacao[]> {
    return this.httpClient.get<MODEL.Formacao[]>(`${this.BASE_URL}`);
  }

  obterFormacaoPorUsuario(idUsuario: string): Observable<MODEL.Formacao> {
    return this.httpClient.get<MODEL.Formacao>(`${this.BASE_URL}/${idUsuario}`);
  }

  obterFormacaoUnica(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.BASE_URL}/geral`);
  }

  // Método para atualizar um registro de Formacao
  atualizarFormacao(formacao: MODEL.Formacao): Observable<MODEL.Formacao> {
    return this.httpClient.put<MODEL.Formacao>(`${this.BASE_URL}/${formacao.id}`, formacao);
  }

  // Método para excluir um registro de Formacao
  excluirFormacao(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
