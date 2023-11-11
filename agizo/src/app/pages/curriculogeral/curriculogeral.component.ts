import { Component, OnInit } from '@angular/core';
import { Candidato } from 'src/app/shared/models/candidato.model';
import { Cabecalho } from 'src/app/shared/models/cabecalho.model';
import { AreaAtuacaoService } from 'src/app/services/areaatuacao.service';
import { CabecalhoService } from 'src/app/services/cabecalho.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-curriculogeral',
  templateUrl: './curriculogeral.component.html',
  styleUrls: ['./curriculogeral.component.scss'],
})
export class CurriculogeralComponent implements OnInit {
  public cargos: any[] = [];
  public cidades: any[] = [];
  public estados: any[] = [];

  constructor(
    private areaatuacaoService: AreaAtuacaoService,
    private cabecalhoService: CabecalhoService
  ) {}

  ngOnInit(): void {
    this.areaatuacaoService.obterAreaAtuacao().subscribe((cargos) => {
      this.cargos = cargos;
    });
    this.cabecalhoService.obterCidades().subscribe((cidade) => {
      this.cidades = cidade;
    });
    this.cabecalhoService.obterEstados().subscribe((estado) => {
      this.estados = estado;
    });
    this.cabecalhoService.obterTodosCabecalhos().subscribe((cabecalhos: Cabecalho[]) => {
      const observables = cabecalhos.map((cabecalho) => {
        const idAreaAtuacao = cabecalho.cargo;
        console.log('Id:', idAreaAtuacao);

        return this.areaatuacaoService.obterAreaAtuacaoPorId(idAreaAtuacao);
      });

      forkJoin(observables).subscribe(
        (responses: any[]) => {
          this.candidates = cabecalhos.map((cabecalho, index) => {
            const areaAtuacao = responses[index][0]; // Acessa o primeiro elemento do array retornado
            const cargos = areaAtuacao ? areaAtuacao.descricao : '';
            console.log('Descricao:', cargos);

            return {
              nome: cabecalho.name,
              email: cabecalho.email,
              telefone: cabecalho.telefone,
              cargo: cargos,
              cidade: cabecalho.cidade,
              estado: cabecalho.estado,
            };
          });
        },
        (error) => {
          console.error('Erro ao buscar área de atuação:', error);
        }
      );
    });
  }

  // Variáveis para armazenar seleções do usuário
  selectedCargo: string = '';
  selectedCidade: string = '';
  selectedEstado: string = '';

  candidates: Candidato[] = []; // Lista de candidatos

  // Função para limpar as seleções
  clearSelections() {
    this.selectedCargo = '';
    this.selectedCidade = '';
    this.selectedEstado = '';
    this.noCandidatesFound = false;

    this.areaatuacaoService.obterAreaAtuacao().subscribe((cargos) => {
      this.cargos = cargos;
    });
    this.cabecalhoService.obterCidades().subscribe((cidade) => {
      this.cidades = cidade;
    });
    this.cabecalhoService.obterEstados().subscribe((estado) => {
      this.estados = estado;
    });
    this.cabecalhoService.obterTodosCabecalhos().subscribe((cabecalhos: Cabecalho[]) => {
      const observables = cabecalhos.map((cabecalho) => {
        const idAreaAtuacao = cabecalho.cargo;
        console.log('Id:', idAreaAtuacao);

        return this.areaatuacaoService.obterAreaAtuacaoPorId(idAreaAtuacao);
      });

      forkJoin(observables).subscribe(
        (responses: any[]) => {
          this.candidates = cabecalhos.map((cabecalho, index) => {
            const areaAtuacao = responses[index][0]; // Acessa o primeiro elemento do array retornado
            const cargos = areaAtuacao ? areaAtuacao.descricao : '';
            console.log('Descricao:', cargos);

            return {
              nome: cabecalho.name,
              email: cabecalho.email,
              telefone: cabecalho.telefone,
              cargo: cargos,
              cidade: cabecalho.cidade,
              estado: cabecalho.estado,
            };
          });
        },
        (error) => {
          console.error('Erro ao buscar área de atuação:', error);
        }
      );
    });
  }

  noCandidatesFound: boolean = false;

  // Função para buscar candidatos
  searchCandidates(): void {
    // Aplicar filtros com base nas seleções do usuário
    const filteredCandidates = this.candidates.filter((candidate) => {
      const cargoMatch =
        !this.selectedCargo || candidate.cargo.toLowerCase() === this.selectedCargo.toLowerCase();
      const cidadeMatch =
        !this.selectedCidade ||
        candidate.cidade.toLowerCase() === this.selectedCidade.toLowerCase();
      const estadoMatch =
        !this.selectedEstado ||
        candidate.estado.toLowerCase() === this.selectedEstado.toLowerCase();

      return cargoMatch && cidadeMatch && estadoMatch;
    });

    // Atualizar a lista de candidatos exibidos na tabela
    this.candidates = filteredCandidates;

    // Atualizar a variável para controlar a exibição da mensagem
    this.noCandidatesFound = filteredCandidates.length === 0;
  }

  // Função para ver o currículo de um candidato
  viewResume(candidate: Candidato): void {
    console.log('Ver currículo de:', candidate.nome);
  }
}
