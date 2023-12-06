import { Component, OnInit } from '@angular/core';
import { AdicionaisGeralService } from '../../services/adicionaisgeral.service';
import { MODEL } from '../../shared';
import { AdicionaisGeral } from '../../shared/models/adicionaisgeral.model';

@Component({
  selector: 'app-adicionais',
  templateUrl: './adicionais.component.html',
  styleUrls: ['./adicionais.component.scss'],
})
export class AdicionaisComponent implements OnInit {
  adicionais: MODEL.AdicionaisGeral[] = [];
  novaDescricao: string = '';
  showModal: boolean = false;

  constructor(private adicionaisGeralService: AdicionaisGeralService) {}

  ngOnInit() {
    this.obterDadosAdicionaisGeral();
  }

  obterDadosAdicionaisGeral() {
    this.adicionaisGeralService.obterAdicionaisGeral().subscribe(
      (data: MODEL.AdicionaisGeral[]) => {
        this.adicionais = data;
      },
      (error) => {
        console.error('Erro ao obter os dados:', error);
      }
    );
  }

  excluirAdicional(id: string) {
    // Lógica para excluir o item com o ID fornecido
    this.adicionaisGeralService.excluirAdicionaisGeral(id).subscribe(
      () => {
        // Atualiza a lista após a exclusão bem-sucedida, se necessário
        this.obterDadosAdicionaisGeral();
      },
      (error) => {
        console.error('Erro ao excluir:', error);
      }
    );
  }

  adicionarInformacao() {
    // Criando um novo objeto AdicionaisGeral com a nova descrição
    const novoAdicional: AdicionaisGeral = new AdicionaisGeral();
    novoAdicional.descricao = this.novaDescricao;

    // Chamando o serviço para criar um novo registro
    this.adicionaisGeralService.criarAdicionaisGeral(novoAdicional).subscribe(
      (novoRegistro) => {
        // Atualizando a lista após a adição bem-sucedida, se necessário
        this.obterDadosAdicionaisGeral();
        // Limpando a variável de nova descrição após a adição
        this.novaDescricao = '';
        this.showModal = false;
      },
      (error) => {
        console.error('Erro ao adicionar:', error);
      }
    );
  }
}
