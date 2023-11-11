import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class NivelService {
  private BASE_URL = env.BASE_URL + 'nivel';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de Nivel
  criarNivel(nivel: MODEL.Nivel): Observable<MODEL.Nivel> {
    return this.httpClient.post<MODEL.Nivel>(`${this.BASE_URL}`, nivel);
  }

  // Método para obter todos os registros de Nivel
  obterNivel(): Observable<MODEL.Nivel[]> {
    return this.httpClient.get<MODEL.Nivel[]>(`${this.BASE_URL}`);
  }

  obterNivelPorId(id: string): Observable<MODEL.Nivel> {
    return this.httpClient.get<MODEL.Nivel>(`${this.BASE_URL}/${id}`);
  }

  // Método para atualizar um registro de Nivel
  atualizarNivel(nivel: MODEL.Nivel): Observable<MODEL.Nivel> {
    return this.httpClient.put<MODEL.Nivel>(`${this.BASE_URL}/${nivel.id}`, nivel);
  }

  // Método para excluir um registro de Nivel
  excluirNivel(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
