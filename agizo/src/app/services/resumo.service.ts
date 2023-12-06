import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resumo } from '../shared/models/resumo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResumoService {
  private BASE_URL = environment.BASE_URL + 'resumo';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  criarResumo(resumo: Resumo): Observable<Resumo> {
    return this.httpClient.post<Resumo>(this.BASE_URL, resumo, this.httpOptions);
  }

  obterResumo(id: string): Observable<Resumo> {
    return this.httpClient.get<Resumo>(`${this.BASE_URL}/${id}`);
  }

  obterTodosResumos(): Observable<Resumo[]> {
    return this.httpClient.get<Resumo[]>(this.BASE_URL);
  }

  obterResumoPorUsuario(idUsuario: string): Observable<Resumo> {
    return this.httpClient.get<Resumo>(`${this.BASE_URL}/${idUsuario}`);
  }

  atualizarResumo(resumo: Resumo): Observable<Resumo> {
    return this.httpClient.put<Resumo>(`${this.BASE_URL}/${resumo.id}`, resumo, this.httpOptions);
  }

  excluirResumo(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
