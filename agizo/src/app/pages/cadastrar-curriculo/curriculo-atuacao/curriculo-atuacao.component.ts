import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CabecalhoService } from 'src/app/services/cabecalho.service';
import { AuthService } from 'src/app/services/auth.service';
import { AreaAtuacaoService } from 'src/app/services/areaatuacao.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { Cabecalho } from 'src/app/shared/models/cabecalho.model';

@Component({
  selector: 'app-curriculo-atuacao',
  templateUrl: './curriculo-atuacao.component.html',
  styleUrls: ['./curriculo-atuacao.component.scss'],
})
export class CurriculoAtuacaoComponent implements OnInit {
  public cabecalhoForm: FormGroup;
  public areasAtuacao: any[] = [];

  estados: any[] = [];
  cidades: any[] = [];
  selectedEstado: number = 0;
  idestado: number = 0;

  public cabecalhoExistente: Cabecalho | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private cabecalhoService: CabecalhoService,
    private authService: AuthService,
    private areaAtuacaoService: AreaAtuacaoService,
    private localidadesService: LocalidadesService
  ) {
    this.cabecalhoForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      estado: [null, Validators.required],
      cidade: [null, Validators.required],
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

    function validarEmail(): void {
      const campoEmail = document.getElementById('email') as HTMLInputElement;
      const mensagemErro = document.getElementById('mensagemErro') as HTMLElement;

      const email = campoEmail.value;
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regexEmail.test(email)) {
        mensagemErro.style.display = 'block';
      } else {
        mensagemErro.style.display = 'none';
      }
    }

    // Adiciona um listener para verificar a validade do e-mail ao perder o foco
    const campoEmail = document.getElementById('email') as HTMLInputElement;
    campoEmail.addEventListener('blur', validarEmail);

    function formatarTelefone(): void {
      const campoTelefone = document.getElementById('telefone') as HTMLInputElement;
      const mensagemErro = document.getElementById('mensagemErroTelefone') as HTMLElement;

      let telefone = campoTelefone.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      const regexTelefone = /^(\d{2})(\d{4,5})(\d{4})$/;

      if (regexTelefone.test(telefone)) {
        telefone = telefone.replace(regexTelefone, '($1) $2-$3');
        campoTelefone.value = telefone;
        mensagemErro.style.display = 'none'; // Esconde a mensagem de erro se o formato estiver correto
      } else {
        mensagemErro.style.display = 'block'; // Exibe a mensagem de erro se o formato estiver incorreto
      }
    }

    // Adiciona um listener para formatar o telefone ao perder o foco
    const campoTelefone = document.getElementById('telefone') as HTMLInputElement;
    campoTelefone.addEventListener('blur', formatarTelefone);

    this.buscarEstados();
    this.buscarCabecalhoExistente();
  }

  cadastrarCabecalho() {
    const { value, valid } = this.cabecalhoForm;

    if (valid) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();
      // Busca o nome do estado pelo ID antes de criar o objeto Cabecalho
      this.localidadesService.getSiglaEstado(value.estado).subscribe((nomeEstado: string) => {
        const cabecalho = new Cabecalho(
          null,
          value.name,
          value.telefone,
          value.email,
          nomeEstado, // Utiliza o nome do estado em vez do ID
          value.cidade,
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
      });
    } else {
      alert('Formulário inválido! Preencha todos os campos obrigatórios.');
    }
  }

  salvarCabecalho() {
    const { value, valid } = this.cabecalhoForm;

    const userId = this.authService.userId;
    const userIdString: string = userId.toString();

    this.cabecalhoService.obterCabecalhoPorUsuario(userIdString).subscribe(
      (cabecalho: Cabecalho | null) => {
        if (cabecalho[0] && cabecalho[0].id) {
          this.atualizarCabecalho(value);
        } else {
          this.cadastrarCabecalho();
        }
      },
      (error) => {
        console.error('Erro ao buscar cabeçalho existente', error);
      }
    );
  }

  atualizarCabecalho(cabecalhoData: any) {
    const { value, valid } = this.cabecalhoForm;

    if (valid) {
      const userId = this.authService.userId;
      const userIdString: string = userId.toString();
      // Busca o nome do estado pelo ID antes de criar o objeto Cabecalho
      this.localidadesService.getSiglaEstado(value.estado).subscribe((nomeEstado: string) => {
        const cabecalho = new Cabecalho(
          this.cabecalhoExistente[0].id,
          value.name,
          value.telefone,
          value.email,
          nomeEstado, // Utiliza o nome do estado em vez do ID
          value.cidade,
          value.areaAtuacao,
          userIdString
        );

        this.cabecalhoService.atualizarCabecalho(cabecalho).subscribe(
          (response) => {
            console.log('Cabeçalho atualizado com sucesso', response);
            // Lógica para redirecionar ou mostrar mensagem de sucesso
          },
          (error) => {
            console.error('Erro ao atualizar o cabeçalho', error);
            // Lógica para lidar com erros
          }
        );
      });
    } else {
      alert('Formulário inválido! Preencha todos os campos obrigatórios.');
    }
  }

  buscarEstados(): void {
    this.localidadesService.getEstados().subscribe((estados) => {
      this.estados = estados;
    });
  }

  buscarCidades(): void {
    if (this.selectedEstado !== 0) {
      console.log('Estado:', this.selectedEstado);
      this.localidadesService.getCidades(this.selectedEstado).subscribe((cidades) => {
        this.cidades = cidades;
      });
    } else {
      this.cidades = [];
    }
  }

  capturarEstado(estadoId: any): void {
    this.selectedEstado = estadoId;
    console.log('Estado selecionado:', this.selectedEstado);
    this.buscarCidades();
    // Atualize o valor do controle do formulário após capturar o estado
    this.cabecalhoForm.patchValue({ estado: this.selectedEstado });
  }

  buscarCabecalhoExistente() {
    const userId = this.authService.userId;
    const userIdString: string = userId.toString();
    this.cabecalhoService.obterCabecalhoPorUsuario(userIdString).subscribe(
      (cabecalho: Cabecalho | null) => {
        if (cabecalho) {
          this.cabecalhoExistente = cabecalho;
          this.preencherCamposFormulario(cabecalho);
          this.idestado = cabecalho[0].estado;
          this.capturarEstado(this.idestado);
          this.obterSiglaEstado(cabecalho[0].estado);
        }
      },
      (error) => {
        console.error('Erro ao buscar cabeçalho existente', error);
      }
    );
  }

  preencherCamposFormulario(cabecalho: Cabecalho) {
    this.cabecalhoForm.patchValue({
      name: cabecalho[0].name || '',
      email: cabecalho[0].email || '',
      telefone: cabecalho[0].telefone || '',
      estado: cabecalho[0].estado || null,
      cidade: cabecalho[0].cidade || null,
      areaAtuacao: cabecalho[0].cargo || '',
    });
  }

  obterSiglaEstado(estadoId: number) {
    this.localidadesService.getSiglaEstado(estadoId).subscribe(
      (sigla: string) => {
        this.cabecalhoExistente.estado = sigla; // Adicionando a sigla ao cabeçalho existente
        this.preencherSiglaEstadoFormulario(sigla); // Preenchendo o campo de estado com a sigla
      },
      (error) => {
        console.error('Erro ao buscar sigla do estado', error);
      }
    );
  }

  preencherSiglaEstadoFormulario(sigla: string) {
    this.cabecalhoForm.get('estado')?.setValue(sigla); // Define a sigla no campo de estado do formulário
  }
}
