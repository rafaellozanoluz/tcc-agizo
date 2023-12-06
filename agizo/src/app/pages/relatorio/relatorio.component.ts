import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliacoesService } from 'src/app/services/avaliacoes.service';
import { ClientService } from 'src/app/services/client.service';
import { VisualizacoesService } from 'src/app/services/visualizacoes.service';
import { Avaliacoes } from 'src/app/shared/models/avaliacoes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss'],
})
export class RelatorioComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private avaliacoesService: AvaliacoesService,
    private visualizacoesService: VisualizacoesService,
    private clientService: ClientService
  ) {}

  noCandidatesFound: boolean = false;
  userId = this.authService.userId.toString();
  recrutadorNomes: { [key: number]: string } = {};
  totalVisualizacoes$: Observable<string>;
  quantidade: string = '';

  avaliacoes: Avaliacoes[] = []; // Use o tipo Avaliacoes[]

  ngOnInit(): void {
    this.avaliacoesService.obterAvaliacoesPorUsuario(this.userId).subscribe(
      (avaliacoes) => {
        if (Array.isArray(avaliacoes) && avaliacoes.length > 0) {
          this.avaliacoes = avaliacoes;
          this.noCandidatesFound = false;

          // Chame getRecrutadorName para cada avaliação
          avaliacoes.forEach((avaliacao) => this.getRecrutadorName(avaliacao.idrecrutador));
        } else {
          console.error('Resposta do serviço não é um array:', avaliacoes);
          this.noCandidatesFound = true;
        }
      },
      (error) => {
        console.error('Erro ao obter as avaliações', error);
        this.noCandidatesFound = true;
      }
    );

    const idUsuario: string = this.authService.userLogged.id;

    this.visualizacoesService.obterVisualizacoesPorUsuario(idUsuario).subscribe((visualizacoes) => {
      if (visualizacoes) {
        this.quantidade = visualizacoes[0].quantidade;
      }
    });
  }

  getStarRating(avaliacao: number): string {
    const roundedRating = Math.round(avaliacao);
    const starArray = new Array(roundedRating).fill('&#9733;'); // Preenche um array com 'star' de acordo com a avaliação
    return starArray.join(' '); // Converte o array em uma string separada por espaços
  }

  getRecrutadorName(idrecrutador: number): void {
    this.clientService.getById(idrecrutador).subscribe(
      (recrutador) => {
        // Supondo que o objeto retornado pelo serviço tenha um campo 'nome'
        const nomeRecrutador = recrutador.name;
        this.recrutadorNomes[idrecrutador] = nomeRecrutador;
      },
      (error) => {
        console.error('Erro ao obter o nome do recrutador', error);
      }
    );
  }
}
