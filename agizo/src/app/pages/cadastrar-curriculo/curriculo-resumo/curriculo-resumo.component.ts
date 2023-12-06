import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumoService } from 'src/app/services/resumo.service'; // Importe o serviço de resumo
import { AuthService } from 'src/app/services/auth.service';
import { Resumo } from 'src/app/shared/models/resumo.model';
import { MODEL } from '../../../shared';

@Component({
  selector: 'app-curriculo-resumo',
  templateUrl: './curriculo-resumo.component.html',
  styleUrls: ['./curriculo-resumo.component.scss'],
})
export class CurriculoResumoComponent implements OnInit {
  public resumoForm: FormGroup;
  public resumoTexto: string = '';

  public resumoExistente: Resumo | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private resumoService: ResumoService,
    private authService: AuthService
  ) {
    this.resumoForm = this.formBuilder.group({
      texto: [''], // Aqui, você pode personalizar o nome do campo no formulário
    });
  }

  ngOnInit() {
    this.buscarResumoExistente();
  }

  salvarResumo() {
    const { value, valid } = this.resumoForm;

    const userId = this.authService.userId;
    const userIdString: string = userId.toString();

    this.resumoService.obterResumoPorUsuario(userIdString).subscribe(
      (resumo: Resumo | null) => {
        if (resumo[0] && resumo[0].id) {
          this.atualizarResumo();
        } else {
          this.cadastrarResumo();
        }
      },
      (error) => {
        console.error('Erro ao buscar cabeçalho existente', error);
      }
    );
  }

  cadastrarResumo() {
    if (this.resumoTexto) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();
      const resumo = new Resumo(null, this.resumoTexto, userIdString);

      this.resumoService.criarResumo(resumo).subscribe(
        (response) => {
          console.log('Resumo criado com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
        },
        (error) => {
          console.error('Erro ao criar o resumo', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      alert('O resumo não pode estar vazio. Preencha o resumo antes de salvar.');
    }
  }

  atualizarResumo() {
    if (this.resumoTexto) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();
      const resumo = new Resumo(this.resumoExistente[0].id, this.resumoTexto, userIdString);

      this.resumoService.atualizarResumo(resumo).subscribe(
        (response) => {
          console.log('Resumo atualizado com sucesso', response);
          // Lógica para redirecionar ou mostrar mensagem de sucesso
        },
        (error) => {
          console.error('Erro ao atualizar o resumo', error);
          // Lógica para lidar com erros
        }
      );
    } else {
      alert('O resumo não pode estar vazio. Preencha o resumo antes de salvar.');
    }
  }

  buscarResumoExistente() {
    const userId = this.authService.userId;
    const userIdString: string = userId.toString();
    this.resumoService.obterResumoPorUsuario(userIdString).subscribe(
      (resumo: Resumo | null) => {
        if (resumo) {
          this.resumoExistente = resumo;
          this.preencherCamposFormulario(resumo);
        }
      },
      (error) => {
        console.error('Erro ao buscar resumo existente', error);
      }
    );
  }

  preencherCamposFormulario(resumo: Resumo) {
    this.resumoTexto = resumo[0].descricao || '';
  }
}
