import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { MODEL } from '../../../shared';

@Component({
  selector: 'app-curriculo-experiencia',
  templateUrl: './curriculo-experiencia.component.html',
  styleUrls: ['./curriculo-experiencia.component.scss'],
})
export class CurriculoExperienciaComponent implements OnInit {
  mostrarBotoes: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private experienciaService: ExperienciaService,
    private authService: AuthService
  ) {}

  experiencias: MODEL.Experiencia[] = [];

  adicionarExperiencia() {
    this.experiencias.push({
      cargo: '',
      local: '',
      descricao: '',
      datainicio: '',
      datafim: '',
    });
    this.mostrarBotoes = false;
  }

  salvarExperiencia() {
    let i: number;

    if (this.experiencias.length === 0) {
      i = 0;
    } else {
      i = this.experiencias.length - 1;
    }
    console.log('I:', i);
    if (i >= 0 && i < this.experiencias.length && this.experiencias[i]) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();

      console.log('Indice:', i);
      console.log('Experiencia:', this.experiencias[i]);

      const novaExperiencia = {
        id: null,
        local: this.experiencias[i].local || '', // Verifique se o campo local está corretamente atribuído
        cargo: this.experiencias[i].cargo || '', // Verifique se o campo cargo está corretamente atribuído
        descricao: this.experiencias[i].descricao || '', // Verifique se o campo descricao está corretamente atribuído
        datainicio: this.experiencias[i].datainicio || '', // Verifique se o campo datainicio está corretamente atribuído
        datafim: this.experiencias[i].datafim || '', // Verifique se o campo datafim está corretamente atribuído
        idusuario: userIdString,
      };

      this.experienciaService.criarExperiencia(novaExperiencia).subscribe(
        (response) => {
          console.log('Experiência salva com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
          this.mostrarBotoes = true;
          this.carregarExperienciasUsuario();
        },
        (error) => {
          console.error('Erro ao salvar a experiência', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      console.error('Índice inválido ou experiência indefinida');
    }
  }

  removerExperiencia(index: number) {
    const experienciaRemovida = this.experiencias[index];

    // Remover do banco de dados
    this.experienciaService.excluirExperiencia(experienciaRemovida.id).subscribe(
      () => {
        console.log('Experiência removida do banco de dados com sucesso');
      },
      (error) => {
        console.error('Erro ao remover experiência do banco de dados', error);
        // Aqui você pode tratar o erro adequadamente
      }
    );
    this.experiencias.splice(index, 1);
  }

  ngOnInit(): void {
    this.carregarExperienciasUsuario();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  carregarExperienciasUsuario() {
    const userId = this.authService.userId;
    const userIdString: string = userId.toString();

    this.experienciaService.obterExperienciaPorUsuario(userIdString).subscribe(
      (experiencias: MODEL.Experiencia[]) => {
        console.log('Experiências do usuário carregadas:', experiencias);

        if (Array.isArray(experiencias) && experiencias.length > 0) {
          // Cria uma cópia independente para edição
          this.experiencias = experiencias.map((experiencia) => ({ ...experiencia }));
        } else {
          this.experiencias = [];
        }
        console.log('Experiências para edição:', this.experiencias);
      },
      (error) => {
        console.error('Erro ao buscar experiências do usuário', error);
        // Lógica para lidar com erros
      }
    );
  }

  verificarDataFim(i: number) {
    const experiencia = this.experiencias[i];
    if (experiencia.datainicio && experiencia.datafim) {
      const dataInicio = new Date(experiencia.datainicio);
      const dataFim = new Date(experiencia.datafim);
      if (dataFim < dataInicio) {
        experiencia.datafimInvalid = true;
      } else {
        experiencia.datafimInvalid = false;
      }
    }
  }
}
