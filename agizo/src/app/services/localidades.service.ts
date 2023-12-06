import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocalidadesService {
  private baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) {}

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estados`);
  }

  getCidades(estadoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estados/${estadoId}/municipios`);
  }

  getNomeEstado(estadoId: number): Observable<string> {
    return this.http
      .get<any>(`${this.baseUrl}/estados/${estadoId}`)
      .pipe(map((estado: any) => estado.nome));
  }

  getSiglaEstado(estadoId: number): Observable<string> {
    return this.http
      .get<any>(`${this.baseUrl}/estados/${estadoId}`)
      .pipe(map((estado: any) => estado.sigla));
  }
}
