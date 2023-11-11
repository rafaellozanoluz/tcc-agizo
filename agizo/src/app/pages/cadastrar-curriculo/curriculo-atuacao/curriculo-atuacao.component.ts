import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabecalhoService } from 'src/app/services/cabecalho.service';
import { AuthService } from 'src/app/services/auth.service';
import { AreaAtuacaoService } from 'src/app/services/areaatuacao.service';
import { Cabecalho } from 'src/app/shared/models/cabecalho.model';
import { MODEL } from '../../../shared';

@Component({
  selector: 'app-curriculo-atuacao',
  templateUrl: './curriculo-atuacao.component.html',
  styleUrls: ['./curriculo-atuacao.component.scss'],
})
export class CurriculoAtuacaoComponent implements OnInit {
  public cabecalhoForm: FormGroup;
  public areasAtuacao: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cabecalhoService: CabecalhoService,
    private authService: AuthService,
    private areaAtuacaoService: AreaAtuacaoService
  ) {
    this.cabecalhoForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      areaAtuacao: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.areaAtuacaoService.obterAreaAtuacao().subscribe(
      (areas) => {
        this.areasAtuacao = areas;
      },
      (error) => {
        console.error('Erro ao obter as áreas de atuação', error);
      }
    );
  }

  cadastrarCabecalho() {
    const { value, valid } = this.cabecalhoForm;

    if (valid) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();
      const cabecalho = new Cabecalho(
        null,
        value.name,
        value.telefone,
        value.email,
        value.cidade,
        value.estado,
        value.areaAtuacao,
        userIdString
      );

      this.cabecalhoService.criarCabecalho(cabecalho).subscribe(
        (response) => {
          console.log('Cabeçalho criado com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
        },
        (error) => {
          console.error('Erro ao criar o cabeçalho', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      alert('Formulário inválido! Preencha todos os campos obrigatórios.');
    }
  }
}
