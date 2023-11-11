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
  public formacaoForm: FormGroup;
  mostrarBotoes: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private formacaoService: FormacaoService,
    private authService: AuthService
  ) {
    this.formacaoForm = this.formBuilder.group({
      curso: ['', Validators.required],
      local: ['', Validators.required],
      datainicio: ['', Validators.required],
      datafim: ['', Validators.required],
    });
  }

  formacoes: any[] = [{ curso: '', local: '', dataInicio: '', dataFim: '' }];

  adicionarFormacao() {
    this.formacoes.push({ curso: '', local: '', dataInicio: '', dataFim: '' });
    this.mostrarBotoes = false;
  }

  cadastrarFormacao() {
    const { value, valid } = this.formacaoForm;

    if (valid) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();
      const formacao = new Formacao(
        null,
        value.curso,
        value.local,
        value.datainicio,
        value.datafim,
        userIdString
      );

      this.formacaoService.criarFormacao(formacao).subscribe(
        (response) => {
          console.log('Formacao criado com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
          this.mostrarBotoes = true;
        },
        (error) => {
          console.error('Erro ao criar a formacao', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      alert('Formulário inválido! Preencha todos os campos obrigatórios.');
    }
  }

  removerFormacao(index: number) {
    this.formacoes.splice(index, 1);
  }

  ngOnInit(): void {}
}
