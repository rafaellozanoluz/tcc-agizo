import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { MODEL } from '../../shared';
import { Client } from '../../shared/models/client.model';

@Component({
  selector: 'app-inicial-administrador',
  templateUrl: './inicial-administrador.component.html',
  styleUrls: ['./inicial-administrador.component.scss'],
})
export class InicialAdministradorComponent implements OnInit {
  clients: MODEL.Client[] = [];
  novoNome: string = '';
  novoEmail: string = '';
  novoSenha: string = '';
  showModal: boolean = false;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.obterDadosAdministrador();
  }

  obterDadosAdministrador() {
    this.clientService.getAll().subscribe(
      (data: MODEL.Client[]) => {
        this.clients = data.filter((clients) => clients.type === 'administrador');
      },
      (error) => {
        console.error('Erro ao obter os dados:', error);
      }
    );
  }

  excluirAdministrador(id: number) {
    // Lógica para excluir o item com o ID fornecido
    this.clientService.delete(id).subscribe(
      () => {
        // Atualiza a lista após a exclusão bem-sucedida, se necessário
        this.obterDadosAdministrador();
      },
      (error) => {
        console.error('Erro ao excluir:', error);
      }
    );
  }

  adicionarInformacao() {
    // Criando um novo objeto Administrador com a nova descrição
    const novoAdministrador: Client = new Client();
    novoAdministrador.id = null;
    novoAdministrador.name = this.novoNome;
    novoAdministrador.email = this.novoEmail;
    novoAdministrador.password = this.novoSenha;
    novoAdministrador.type = 'administrador';

    // Chamando o serviço para criar um novo registro
    this.clientService.create(novoAdministrador).subscribe(
      (novoRegistro) => {
        // Atualizando a lista após a adição bem-sucedida, se necessário
        this.obterDadosAdministrador();
        // Limpando a variável de nova descrição após a adição
        this.novoNome = '';
        this.novoEmail = '';
        this.novoSenha = '';
        this.showModal = false;
      },
      (error) => {
        console.error('Erro ao adicionar:', error);
      }
    );
  }
}
