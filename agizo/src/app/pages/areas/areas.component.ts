import { Component, OnInit } from '@angular/core';
import { AreaAtuacaoService } from '../../services/areaatuacao.service';
import { MODEL } from '../../shared';
import { AreaAtuacao } from '../../shared/models/areaatuacao.model';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
})
export class AreasComponent implements OnInit {
  areas: MODEL.AreaAtuacao[] = [];
  novaArea: string = '';
  showModal: boolean = false;

  constructor(private areaService: AreaAtuacaoService) {}

  ngOnInit() {
    this.obterDadosArea();
  }

  obterDadosArea() {
    this.areaService.obterAreaAtuacao().subscribe(
      (data: MODEL.AreaAtuacao[]) => {
        this.areas = data;
      },
      (error) => {
        console.error('Erro ao obter os dados:', error);
      }
    );
  }

  excluirArea(id: string) {
    // Lógica para excluir o item com o ID fornecido
    this.areaService.excluirAreaAtuacao(id).subscribe(
      () => {
        // Atualiza a lista após a exclusão bem-sucedida, se necessário
        this.obterDadosArea();
      },
      (error) => {
        console.error('Erro ao excluir:', error);
      }
    );
  }

  adicionarInformacao() {
    // Criando um novo objeto AdicionaisGeral com a nova descrição
    const novaArea: AreaAtuacao = new AreaAtuacao();
    novaArea.descricao = this.novaArea;

    // Chamando o serviço para criar um novo registro
    this.areaService.criarAreaAtuacao(novaArea).subscribe(
      (novoRegistro) => {
        // Atualizando a lista após a adição bem-sucedida, se necessário
        this.obterDadosArea();
        // Limpando a variável de nova descrição após a adição
        this.novaArea = '';
        this.showModal = false;
      },
      (error) => {
        console.error('Erro ao adicionar:', error);
      }
    );
  }
}
