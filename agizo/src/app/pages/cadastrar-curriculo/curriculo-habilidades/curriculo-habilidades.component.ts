import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { NivelService } from 'src/app/services/nivel.service';
import { MODEL } from '../../../shared';

@Component({
  selector: 'app-curriculo-habilidades',
  templateUrl: './curriculo-habilidades.component.html',
  styleUrls: ['./curriculo-habilidades.component.scss'],
})
export class CurriculoHabilidadesComponent implements OnInit {
  mostrarBotoes: boolean = true;
  public nivel: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private habilidadesService: HabilidadesService,
    private nivelService: NivelService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.nivelService.obterNivel().subscribe(
      (niveis) => {
        this.nivel = niveis;
      },
      (error) => {
        console.error('Erro ao obter nivel', error);
      }
    );
    this.carregarHabilidadesUsuario();
  }

  habilidades: MODEL.Habilidades[] = [];

  adicionarHabilidade() {
    this.habilidades.push({ descricao: '', nivel: '' });
    this.mostrarBotoes = false;
  }

  salvarHabilidade() {
    let i: number;

    if (this.habilidades.length === 0) {
      i = 0;
    } else {
      i = this.habilidades.length - 1;
    }
    console.log('I:', i);
    if (i >= 0 && i < this.habilidades.length && this.habilidades[i]) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();

      console.log('Indice:', i);
      console.log('Habilidades:', this.habilidades[i]);

      const novaExperiencia = {
        id: null,
        descricao: this.habilidades[i].descricao || '',
        nivel: this.habilidades[i].nivel || '',
        idusuario: userIdString,
      };

      this.habilidadesService.criarHabilidades(novaExperiencia).subscribe(
        (response) => {
          console.log('Habilidades salva com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
          this.mostrarBotoes = true;
          this.carregarHabilidadesUsuario();
        },
        (error) => {
          console.error('Erro ao salvar habilidades', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      console.error('Índice inválido ou habilidades indefinida');
    }
  }

  removerHabilidade(index: number) {
    const experienciaRemovida = this.habilidades[index];

    // Remover do banco de dados
    this.habilidadesService.excluirHabilidades(experienciaRemovida.id).subscribe(
      () => {
        console.log('Habilidade removida do banco de dados com sucesso');
      },
      (error) => {
        console.error('Erro ao remover habilidades do banco de dados', error);
        // Aqui você pode tratar o erro adequadamente
      }
    );
    this.habilidades.splice(index, 1);
  }

  carregarHabilidadesUsuario() {
    const userId = this.authService.userId;
    const userIdString: string = userId.toString();

    this.habilidadesService.obterHabilidadesPorUsuario(userIdString).subscribe(
      (habilidades: MODEL.Habilidades[]) => {
        console.log('Habilidades do usuário carregadas:', habilidades);

        if (Array.isArray(habilidades) && habilidades.length > 0) {
          // Cria uma cópia independente para edição
          this.habilidades = habilidades.map((habilidades) => ({ ...habilidades }));
        } else {
          this.habilidades = [];
        }
        console.log('Habilidades para edição:', this.habilidades);
      },
      (error) => {
        console.error('Erro ao buscar habilidades do usuário', error);
        // Lógica para lidar com erros
      }
    );
  }
}
