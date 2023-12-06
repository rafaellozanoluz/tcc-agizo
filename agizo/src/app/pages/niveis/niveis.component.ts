import { Component, OnInit } from '@angular/core';
import { NivelService } from '../../services/nivel.service';
import { MODEL } from '../../shared';
import { Nivel } from '../../shared/models/nivel.model';

@Component({
  selector: 'app-niveis',
  templateUrl: './niveis.component.html',
  styleUrls: ['./niveis.component.scss'],
})
export class NiveisComponent implements OnInit {
  niveis: MODEL.Nivel[] = [];
  novoNivel: string = '';
  showModal: boolean = false;

  constructor(private nivelService: NivelService) {}

  ngOnInit() {
    this.obterDadosNivel();
  }

  obterDadosNivel() {
    this.nivelService.obterNivel().subscribe(
      (data: MODEL.Nivel[]) => {
        this.niveis = data;
      },
      (error) => {
        console.error('Erro ao obter os dados:', error);
      }
    );
  }

  excluirNivel(id: string) {
    // Lógica para excluir o item com o ID fornecido
    this.nivelService.excluirNivel(id).subscribe(
      () => {
        // Atualiza a lista após a exclusão bem-sucedida, se necessário
        this.obterDadosNivel();
      },
      (error) => {
        console.error('Erro ao excluir:', error);
      }
    );
  }

  adicionarInformacao() {
    // Criando um novo objeto AdicionaisGeral com a nova descrição
    const novoNivel: Nivel = new Nivel();
    novoNivel.nivel = this.novoNivel;

    // Chamando o serviço para criar um novo registro
    this.nivelService.criarNivel(novoNivel).subscribe(
      (novoRegistro) => {
        // Atualizando a lista após a adição bem-sucedida, se necessário
        this.obterDadosNivel();
        // Limpando a variável de nova descrição após a adição
        this.novoNivel = '';
        this.showModal = false;
      },
      (error) => {
        console.error('Erro ao adicionar:', error);
      }
    );
  }
}
