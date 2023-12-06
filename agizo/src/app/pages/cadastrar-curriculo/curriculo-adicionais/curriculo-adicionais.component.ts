import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AdicionaisService } from 'src/app/services/adicionais.service';
import { Adicionais } from 'src/app/shared/models/adicionais.model';
import { AdicionaisGeralService } from 'src/app/services/adicionaisgeral.service';
import { MODEL } from '../../../shared';

@Component({
  selector: 'app-curriculo-adicionais',
  templateUrl: './curriculo-adicionais.component.html',
  styleUrls: ['./curriculo-adicionais.component.scss'],
})
export class CurriculoAdicionaisComponent implements OnInit {
  mostrarBotoes: boolean = true;
  public adicionaisgeral: any[] = [];

  constructor(
    private adicionaisService: AdicionaisService,
    private adicionaisgeralService: AdicionaisGeralService,
    private authService: AuthService
  ) {}

  adicionais: MODEL.Adicionais[] = [];

  adicionarAdicional() {
    this.adicionais.push({ titulo: '', descricao: '', data: '' });
    this.mostrarBotoes = false;
  }

  salvarAdicional() {
    let i: number;

    if (this.adicionais.length === 0) {
      i = 0;
    } else {
      i = this.adicionais.length - 1;
    }
    console.log('I:', i);
    if (i >= 0 && i < this.adicionais.length && this.adicionais[i]) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();

      console.log('Indice:', i);
      console.log('adicionais:', this.adicionais[i]);

      const novaAdicional = {
        id: null,
        titulo: this.adicionais[i].titulo || '',
        descricao: this.adicionais[i].descricao || '',
        data: this.adicionais[i].data || '',
        idusuario: userIdString,
      };

      this.adicionaisService.criarAdicionais(novaAdicional).subscribe(
        (response) => {
          console.log('adicionais salva com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
          this.mostrarBotoes = true;
          this.carregarAdicionaisUsuario();
        },
        (error) => {
          console.error('Erro ao salvar adicionais', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      console.error('Índice inválido ou adicionais indefinida');
    }
  }

  removerAdicional(index: number) {
    const adicionaisRemovida = this.adicionais[index];

    // Remover do banco de dados
    this.adicionaisService.excluirAdicionais(adicionaisRemovida.id).subscribe(
      () => {
        console.log('adicionais removida do banco de dados com sucesso');
      },
      (error) => {
        console.error('Erro ao remover adicionais do banco de dados', error);
        // Aqui você pode tratar o erro adequadamente
      }
    );
    this.adicionais.splice(index, 1);
  }

  ngOnInit(): void {
    this.adicionaisgeralService.obterAdicionaisGeral().subscribe(
      (adicional) => {
        this.adicionaisgeral = adicional;
      },
      (error) => {
        console.error('Erro ao obter as áreas de atuação', error);
      }
    );
    this.carregarAdicionaisUsuario();
  }

  carregarAdicionaisUsuario() {
    const userId = this.authService.userId;
    const userIdString: string = userId.toString();

    this.adicionaisService.obterAdicionaisPorUsuario(userIdString).subscribe(
      (adicionais: MODEL.Adicionais[]) => {
        console.log('adicionais do usuário carregadas:', adicionais);

        if (Array.isArray(adicionais) && adicionais.length > 0) {
          // Cria uma cópia independente para edição
          this.adicionais = adicionais.map((adicionais) => ({ ...adicionais }));
        } else {
          this.adicionais = [];
        }
        console.log('adicionais para edição:', this.adicionais);
      },
      (error) => {
        console.error('Erro ao buscar adicionais do usuário', error);
        // Lógica para lidar com erros
      }
    );
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
