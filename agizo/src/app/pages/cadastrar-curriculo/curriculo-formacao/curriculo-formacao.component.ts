import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FormacaoService } from 'src/app/services/formacao.service';
import { Formacao } from 'src/app/shared/models/formacao.model';
import { MODEL } from '../../../shared';

@Component({
  selector: 'app-curriculo-formacao',
  templateUrl: './curriculo-formacao.component.html',
  styleUrls: ['./curriculo-formacao.component.scss'],
})
export class CurriculoFormacaoComponent implements OnInit {
  mostrarBotoes: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private formacaoService: FormacaoService,
    private authService: AuthService
  ) {}

  formacoes: MODEL.Formacao[] = [];

  adicionarFormacao() {
    this.formacoes.push({ curso: '', local: '', datainicio: '', datafim: '' });
    this.mostrarBotoes = false;
  }

  salvarFormacao() {
    let i: number;

    if (this.formacoes.length === 0) {
      i = 0;
    } else {
      i = this.formacoes.length - 1;
    }
    console.log('I:', i);
    if (i >= 0 && i < this.formacoes.length && this.formacoes[i]) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();

      console.log('Indice:', i);
      console.log('Formacao:', this.formacoes[i]);

      const novaFormacao = {
        id: null,
        local: this.formacoes[i].local || '', // Verifique se o campo local está corretamente atribuído
        curso: this.formacoes[i].curso || '', // Verifique se o campo curso está corretamente atribuído
        datainicio: this.formacoes[i].datainicio || '', // Verifique se o campo datainicio está corretamente atribuído
        datafim: this.formacoes[i].datafim || '', // Verifique se o campo datafim está corretamente atribuído
        idusuario: userIdString,
      };

      this.formacaoService.criarFormacao(novaFormacao).subscribe(
        (response) => {
          console.log('Formacao salva com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
          this.mostrarBotoes = true;
          this.carregarFormacaoUsuario();
        },
        (error) => {
          console.error('Erro ao salvar a Formacao', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      console.error('Índice inválido ou Formacao indefinida');
    }
  }

  removerFormacao(index: number) {
    const formacaoRemovida = this.formacoes[index];

    // Remover do banco de dados
    this.formacaoService.excluirFormacao(formacaoRemovida.id).subscribe(
      () => {
        console.log('Formacao removida do banco de dados com sucesso');
      },
      (error) => {
        console.error('Erro ao remover formacao do banco de dados', error);
        // Aqui você pode tratar o erro adequadamente
      }
    );
    this.formacoes.splice(index, 1);
  }

  ngOnInit(): void {
    this.carregarFormacaoUsuario();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  carregarFormacaoUsuario() {
    const userId = this.authService.userId;
    const userIdString: string = userId.toString();

    this.formacaoService.obterFormacaoPorUsuario(userIdString).subscribe(
      (formacoes: MODEL.Formacao[]) => {
        console.log('Formacoes do usuário carregadas:', formacoes);

        if (Array.isArray(formacoes) && formacoes.length > 0) {
          // Cria uma cópia independente para edição
          this.formacoes = formacoes.map((formacoes) => ({ ...formacoes }));
        } else {
          this.formacoes = [];
        }
        console.log('Formacoes para edição:', this.formacoes);
      },
      (error) => {
        console.error('Erro ao buscar formacoes do usuário', error);
        // Lógica para lidar com erros
      }
    );
  }
}
