import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { Habilidades } from 'src/app/shared/models/habilidades.model';
import { NivelService } from 'src/app/services/nivel.service';
import { MODEL } from '../../../shared';

@Component({
  selector: 'app-curriculo-habilidades',
  templateUrl: './curriculo-habilidades.component.html',
  styleUrls: ['./curriculo-habilidades.component.scss'],
})
export class CurriculoHabilidadesComponent implements OnInit {
  public habilidadeForm: FormGroup;
  mostrarBotoes: boolean = false;
  public nivel: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private habilidadesService: HabilidadesService,
    private nivelService: NivelService,
    private authService: AuthService
  ) {
    this.habilidadeForm = this.formBuilder.group({
      habilidade: ['', Validators.required],
      nivel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.nivelService.obterNivel().subscribe(
      (niveis) => {
        this.nivel = niveis;
      },
      (error) => {
        console.error('Erro ao obter nivel', error);
      }
    );
  }

  habilidades: any[] = [{ habilidade: '', nivel: '' }];

  adicionarHabilidade() {
    this.habilidades.push({ habilidade: '', nivel: '' });
    this.mostrarBotoes = false;
  }

  cadastrarHabilidade() {
    const { value, valid } = this.habilidadeForm;

    if (valid) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();
      const habilidade = new Habilidades(null, value.habilidade, value.nivel, userIdString);

      this.habilidadesService.criarHabilidades(habilidade).subscribe(
        (response) => {
          console.log('Habilidade criado com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
          this.mostrarBotoes = true;
        },
        (error) => {
          console.error('Erro ao criar a habilidade', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      alert('Formulário inválido! Preencha todos os campos obrigatórios.');
    }
  }

  removerHabilidade(index: number) {
    this.habilidades.splice(index, 1);
  }
}
