import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { MODEL } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private BASE_URL = env.BASE_URL + 'experiencia/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Método para criar um novo registro de Experiencia
  criarExperiencia(experiencia: MODEL.Experiencia): Observable<MODEL.Experiencia> {
    return this.httpClient.post<MODEL.Experiencia>(`${this.BASE_URL}/experiencia`, experiencia);
  }

  // Método para obter todos os registros de Experiencia
  obterExperiencia(): Observable<MODEL.Experiencia[]> {
    return this.httpClient.get<MODEL.Experiencia[]>(`${this.BASE_URL}/experiencia`);
  }

  // Método para atualizar um registro de Experiencia
  atualizarExperiencia(experiencia: MODEL.Experiencia): Observable<MODEL.Experiencia> {
    return this.httpClient.put<MODEL.Experiencia>(
      `${this.BASE_URL}/experiencia/${experiencia.id}`,
      experiencia
    );
  }

  // Método para excluir um registro de Experiencia
  excluirExperiencia(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/experiencia/${id}`);
  }
}
