import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class AdicionaisService {
  private BASE_URL = env.BASE_URL + 'adicionais';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de Adicionais
  criarAdicionais(adicionais: MODEL.Adicionais): Observable<MODEL.Adicionais> {
    return this.httpClient.post<MODEL.Adicionais>(`${this.BASE_URL}`, adicionais);
  }

  // Método para obter todos os registros de Adicionais
  obterAdicionais(): Observable<MODEL.Adicionais[]> {
    return this.httpClient.get<MODEL.Adicionais[]>(`${this.BASE_URL}`);
  }

  obterAdicionaisPorUsuario(idUsuario: string): Observable<MODEL.Adicionais[]> {
    return this.httpClient.get<MODEL.Adicionais[]>(`${this.BASE_URL}/${idUsuario}`);
  }

  // Método para atualizar um registro de Adicionais
  atualizarAdicionais(adicionais: MODEL.Adicionais): Observable<MODEL.Adicionais> {
    return this.httpClient.put<MODEL.Adicionais>(`${this.BASE_URL}/${adicionais.id}`, adicionais);
  }

  // Método para excluir um registro de Adicionais
  excluirAdicionais(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
