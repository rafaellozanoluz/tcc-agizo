import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { Experiencia } from 'src/app/shared/models/experiencia.model';
import { MODEL } from '../../../shared';

@Component({
  selector: 'app-curriculo-experiencia',
  templateUrl: './curriculo-experiencia.component.html',
  styleUrls: ['./curriculo-experiencia.component.scss'],
})
export class CurriculoExperienciaComponent implements OnInit {
  public experienciaForm: FormGroup;
  mostrarBotoes: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private experienciaService: ExperienciaService,
    private authService: AuthService
  ) {
    this.experienciaForm = this.formBuilder.group({
      local: ['', Validators.required],
      cargo: ['', Validators.required],
      descricao: ['', Validators.required],
      datainicio: ['', Validators.required],
      datafim: ['', Validators.required],
    });
  }

  experiencias: any[] = [
    { id: null, cargo: '', local: '', descricao: '', datainicio: '', datafim: '' },
  ];

  adicionarExperiencia() {
    this.experiencias.push({
      cargo: '',
      local: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
    });
    this.mostrarBotoes = false;
  }

  cadastrarExperiencia() {
    const { value, valid } = this.experienciaForm;

    if (valid) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();

      const experiencia = new Experiencia(
        null,
        value.local,
        value.cargo,
        value.descricao,
        value.datainicio,
        value.datafim,
        userIdString
      );

      this.experienciaService.criarExperiencia(experiencia).subscribe(
        (response) => {
          console.log('Experiencia criado com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
          this.mostrarBotoes = true;
        },
        (error) => {
          console.error('Erro ao criar a experiência', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      alert('Formulário inválido! Preencha todos os campos obrigatórios.');
    }
  }

  removerExperiencia(index: number) {
    this.experiencias.splice(index, 1);
  }

  ngOnInit(): void {}
}
