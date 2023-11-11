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

  constructor(
    private formBuilder: FormBuilder,
    private resumoService: ResumoService,
    private authService: AuthService
  ) {
    this.resumoForm = this.formBuilder.group({
      texto: [''], // Aqui, você pode personalizar o nome do campo no formulário
    });
  }

  ngOnInit() {}

  salvarResumo() {
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
}
