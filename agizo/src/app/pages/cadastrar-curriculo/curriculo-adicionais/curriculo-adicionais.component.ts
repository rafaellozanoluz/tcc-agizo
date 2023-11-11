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
  public adicionaisForm: FormGroup;
  mostrarBotoes: boolean = false;
  public adicionaisgeral: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adicionaisService: AdicionaisService,
    private adicionaisgeralService: AdicionaisGeralService,
    private authService: AuthService
  ) {
    this.adicionaisForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      data: ['', Validators.required],
    });
  }

  adicionais: any[] = [{ tipo: '', descricao: '', dataAquisicao: '' }];

  adicionarAdicional() {
    this.adicionais.push({ tipo: '', descricao: '', dataAquisicao: '' });
    this.mostrarBotoes = false;
  }

  cadastrarAdicionais() {
    const { value, valid } = this.adicionaisForm;

    if (valid) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();
      const adicionais = new Adicionais(
        null,
        value.titulo,
        value.descricao,
        value.data,
        userIdString
      );

      this.adicionaisService.criarAdicionais(adicionais).subscribe(
        (response) => {
          console.log('Informações adicionais criado com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
          this.mostrarBotoes = true;
        },
        (error) => {
          console.error('Erro ao criar informações adicionais', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      alert('Formulário inválido! Preencha todos os campos obrigatórios.');
    }
  }

  removerAdicional(index: number) {
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
  }
}
