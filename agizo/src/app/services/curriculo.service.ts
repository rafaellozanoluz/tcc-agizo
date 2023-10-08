import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class CurriculoService {
  private BASE_URL = env.BASE_URL + 'curriculo/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de Curriculo
  criarCurriculo(curriculo: MODEL.Curriculo): Observable<MODEL.Curriculo> {
    return this.httpClient.post<MODEL.Curriculo>(`${this.BASE_URL}`, curriculo);
  }

  // Método para obter todos os registros de Curriculo
  obterCurriculo(): Observable<MODEL.Curriculo[]> {
    return this.httpClient.get<MODEL.Curriculo[]>(`${this.BASE_URL}`);
  }

  // Método para atualizar um registro de Curriculo
  atualizarCurriculo(curriculo: MODEL.Curriculo): Observable<MODEL.Curriculo> {
    return this.httpClient.put<MODEL.Curriculo>(`${this.BASE_URL}${curriculo.id}`, curriculo);
  }

  // Método para excluir um registro de Curriculo
  excluirCurriculo(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}${id}`);
  }
}
