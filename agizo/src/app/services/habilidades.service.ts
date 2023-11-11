import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class HabilidadesService {
  private BASE_URL = env.BASE_URL + 'habilidade';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de Habilidades
  criarHabilidades(habilidades: MODEL.Habilidades): Observable<MODEL.Habilidades> {
    return this.httpClient.post<MODEL.Habilidades>(`${this.BASE_URL}`, habilidades);
  }

  // Método para obter todos os registros de Habilidades
  obterHabilidades(): Observable<MODEL.Habilidades[]> {
    return this.httpClient.get<MODEL.Habilidades[]>(`${this.BASE_URL}`);
  }

  obterHabilidadesUnica(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.BASE_URL}/geral`);
  }

  obterHabilidadesPorUsuario(idUsuario: string): Observable<MODEL.Habilidades> {
    return this.httpClient.get<MODEL.Habilidades>(`${this.BASE_URL}/${idUsuario}`);
  }

  // Método para atualizar um registro de Habilidades
  atualizarHabilidades(habilidades: MODEL.Habilidades): Observable<MODEL.Habilidades> {
    return this.httpClient.put<MODEL.Habilidades>(
      `${this.BASE_URL}/${habilidades.id}`,
      habilidades
    );
  }

  // Método para excluir um registro de Habilidades
  excluirHabilidades(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
