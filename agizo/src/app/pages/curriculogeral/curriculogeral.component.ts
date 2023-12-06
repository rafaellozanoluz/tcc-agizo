import { Component, OnInit, ViewChild } from '@angular/core';
import { Candidato } from 'src/app/shared/models/candidato.model';
import { Cabecalho } from 'src/app/shared/models/cabecalho.model';
import { Avaliacoes } from 'src/app/shared/models/avaliacoes.model';
import { AreaAtuacaoService } from 'src/app/services/areaatuacao.service';
import { CabecalhoService } from 'src/app/services/cabecalho.service';
import { ResumoService } from '../../services/resumo.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { HabilidadesService } from '../../services/habilidades.service';
import { AdicionaisService } from '../../services/adicionais.service';
import { FormacaoService } from '../../services/formacao.service';
import { VisualizacoesService } from '../../services/visualizacoes.service';
import { AvaliacoesService } from '../../services/avaliacoes.service';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-curriculogeral',
  templateUrl: './curriculogeral.component.html',
  styleUrls: ['./curriculogeral.component.scss'],
})
export class CurriculogeralComponent implements OnInit {
  public cargos: any[] = [];
  public cidades: any[] = [];
  public estados: any[] = [];
  quantidade: number = 0;
  comment: string | undefined;

  stars: boolean[] = Array(5).fill(false);
  showErrorMessage: boolean = false;

  // Função para lidar com a avaliação
  rate(stars: number): void {
    // Atualiza o estado das estrelas
    this.stars = this.stars.map((star, i) => i + 1 <= stars);

    // Faça o que for necessário com a avaliação (por exemplo, enviar para o servidor)
    console.log(`Avaliação recebida: ${stars} estrelas`);
  }

  // Função para destacar estrelas ao passar o mouse
  highlightStars(index: number): void {
    this.stars = this.stars.map((star, i) => i <= index);
  }

  // Função para resetar destaque das estrelas ao remover o mouse
  resetStars(): void {
    // Mantenha o estado das estrelas conforme a avaliação
  }

  submitRating() {
    // Conta a quantidade de estrelas preenchidas
    const filledStarsCount = this.stars.filter((star) => star).length;

    // Verifica se pelo menos uma estrela foi selecionada e se o campo de comentário está preenchido
    if (filledStarsCount === 0 || !this.comment) {
      // Exibe a mensagem de erro
      this.showErrorMessage = true;
    } else {
      // Reseta a mensagem de erro
      this.showErrorMessage = false;
      const userId = this.authService.userId;

      console.log('Avaliação: ', filledStarsCount);
      console.log('Comentários: ', this.comment);
      console.log('ID Usuário:', this.idusuario);
      console.log('ID Recrutador:', userId);

      // Cria um objeto Avaliacoes com as informações
      const avaliacaoData = new Avaliacoes(
        undefined, // O ID será gerado automaticamente no servidor
        filledStarsCount.toString(),
        userId.toString(),
        this.idusuario,
        this.comment
      );

      // Chama o serviço para criar uma nova avaliação
      this.avaliacoesService.criarAvaliacoes(avaliacaoData).subscribe(
        (response) => {
          // A resposta do servidor pode ser manipulada aqui, se necessário
          console.log('Avaliação criada com sucesso:', response);
        },
        (error) => {
          // Trata erros aqui, se necessário
          console.error('Erro ao criar avaliação:', error);
        }
      );

      this.showModal1 = false;
    }
  }

  title = 'html-to-pdf-angular-application';
  habilidades: any[] = [];
  formacao: any[] = [];
  experiencias: any[] = [];
  adicionais: any[] = [];
  areaAtuacao: any[] = [];
  nivel: any[] = [];

  nome: string = '';
  cargo: string = '';
  telefone: string = '';
  email: string = '';
  cidade: string = '';
  estado: string = '';
  resumo: string = '';
  idusuario: string;

  @ViewChild('resumeModal') resumeModal: any;

  constructor(
    private areaatuacaoService: AreaAtuacaoService,
    private cabecalhoService: CabecalhoService,
    private resumoService: ResumoService,
    private experienciaService: ExperienciaService,
    private habilidadesService: HabilidadesService,
    private adicionaisService: AdicionaisService,
    private formacaoService: FormacaoService,
    private visualizacoesService: VisualizacoesService,
    private avaliacoesService: AvaliacoesService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.areaatuacaoService.obterAreaAtuacao().subscribe((cargos) => {
      this.cargos = cargos;
    });
    this.cabecalhoService.obterCidades().subscribe((cidade) => {
      this.cidades = cidade;
    });
    this.cabecalhoService.obterEstados().subscribe((estado) => {
      this.estados = estado;
    });
    this.cabecalhoService.obterTodosCabecalhos().subscribe((cabecalhos: Cabecalho[]) => {
      const observables = cabecalhos.map((cabecalho) => {
        const idAreaAtuacao = cabecalho.cargo;
        console.log('Id:', idAreaAtuacao);

        return this.areaatuacaoService.obterAreaAtuacaoPorId(idAreaAtuacao);
      });

      forkJoin(observables).subscribe(
        (responses: any[]) => {
          this.candidates = cabecalhos.map((cabecalho, index) => {
            const areaAtuacao = responses[index][0]; // Acessa o primeiro elemento do array retornado
            const cargos = areaAtuacao ? areaAtuacao.descricao : '';

            return {
              nome: cabecalho.name,
              email: cabecalho.email,
              telefone: cabecalho.telefone,
              cargo: cargos,
              cidade: cabecalho.cidade,
              estado: cabecalho.estado,
              idusuario: cabecalho.idusuario,
            };
          });
        },
        (error) => {
          console.error('Erro ao buscar área de atuação:', error);
        }
      );
    });
  }

  // Variáveis para armazenar seleções do usuário
  selectedCargo: string = '';
  selectedCidade: string = '';
  selectedEstado: string = '';

  candidates: Candidato[] = []; // Lista de candidatos

  // Função para limpar as seleções
  clearSelections() {
    this.selectedCargo = '';
    this.selectedCidade = '';
    this.selectedEstado = '';
    this.noCandidatesFound = false;

    this.areaatuacaoService.obterAreaAtuacao().subscribe((cargos) => {
      this.cargos = cargos;
    });
    this.cabecalhoService.obterCidades().subscribe((cidade) => {
      this.cidades = cidade;
    });
    this.cabecalhoService.obterEstados().subscribe((estado) => {
      this.estados = estado;
    });
    this.cabecalhoService.obterTodosCabecalhos().subscribe((cabecalhos: Cabecalho[]) => {
      const observables = cabecalhos.map((cabecalho) => {
        const idAreaAtuacao = cabecalho.cargo;
        console.log('Id:', idAreaAtuacao);

        return this.areaatuacaoService.obterAreaAtuacaoPorId(idAreaAtuacao);
      });

      forkJoin(observables).subscribe(
        (responses: any[]) => {
          this.candidates = cabecalhos.map((cabecalho, index) => {
            const areaAtuacao = responses[index][0]; // Acessa o primeiro elemento do array retornado
            const cargos = areaAtuacao ? areaAtuacao.descricao : '';
            console.log('Descricao:', cargos);

            return {
              nome: cabecalho.name,
              email: cabecalho.email,
              telefone: cabecalho.telefone,
              cargo: cargos,
              cidade: cabecalho.cidade,
              estado: cabecalho.estado,
              idusuario: cabecalho.idusuario,
            };
          });
        },
        (error) => {
          console.error('Erro ao buscar área de atuação:', error);
        }
      );
    });
  }

  noCandidatesFound: boolean = false;

  // Função para buscar candidatos
  searchCandidates(): void {
    // Aplicar filtros com base nas seleções do usuário
    const filteredCandidates = this.candidates.filter((candidate) => {
      const cargoMatch =
        !this.selectedCargo || candidate.cargo.toLowerCase() === this.selectedCargo.toLowerCase();
      const cidadeMatch =
        !this.selectedCidade ||
        candidate.cidade.toLowerCase() === this.selectedCidade.toLowerCase();
      const estadoMatch =
        !this.selectedEstado ||
        candidate.estado.toLowerCase() === this.selectedEstado.toLowerCase();

      return cargoMatch && cidadeMatch && estadoMatch;
    });

    // Atualizar a lista de candidatos exibidos na tabela
    this.candidates = filteredCandidates;

    // Atualizar a variável para controlar a exibição da mensagem
    this.noCandidatesFound = filteredCandidates.length === 0;
  }

  public showModal: boolean = false;

  // Função para abrir o modal
  openModal(idUsuario: string): void {
    this.showModal = true;
    this.idusuario = idUsuario;

    // Chama o método para incrementar a quantidade
    this.visualizacoesService.incrementarQuantidade(this.idusuario).subscribe(
      () => {
        // Lógica adicional, se necessário, após incrementar a quantidade
        console.log('Quantidade incrementada com sucesso.');
      },
      (error) => {
        console.error('Erro ao incrementar a quantidade:', error);
        // Lógica adicional em caso de erro
      }
    );

    //inicio função ver curriculo
    console.log('ID do Usuário:', idUsuario);

    this.cabecalhoService.obterCabecalhoPorUsuario(idUsuario).subscribe((cabecalho) => {
      if (cabecalho) {
        this.nome = cabecalho[0].name;
        this.telefone = cabecalho[0].telefone;
        this.email = cabecalho[0].email;
        this.cidade = cabecalho[0].cidade;
        this.estado = cabecalho[0].estado;

        const areaAtuacaoId = cabecalho[0].cargo;

        console.log('areaAtuacaoId recebidas:', areaAtuacaoId);
        this.areaatuacaoService.obterAreaAtuacaoPorId(areaAtuacaoId).subscribe((areaAtuacao) => {
          if (areaAtuacao) {
            this.cargo = areaAtuacao[0].descricao;
          }
        });
      }
    });

    this.resumoService.obterResumoPorUsuario(idUsuario).subscribe((resumo) => {
      if (resumo) {
        this.resumo = resumo[0].descricao;
      }
    });

    this.experienciaService.obterExperienciaPorUsuario(idUsuario).subscribe(
      (experiencia) => {
        console.log('Experiencias recebidas:', experiencia);

        if (Array.isArray(experiencia)) {
          this.experiencias = experiencia;
        } else {
          console.error('Resposta do serviço não é um array:', experiencia);
        }

        console.log('Experiencias armazenadas:', this.experiencias);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro ao obter experiência:', error);
      }
    );

    this.habilidadesService.obterHabilidadesPorUsuario(idUsuario).subscribe(
      (habilidades) => {
        if (Array.isArray(habilidades)) {
          this.habilidades = habilidades;
        } else {
          console.error('Resposta do serviço não é um array:', habilidades);
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro ao obter habilidades:', error);
      }
    );

    this.adicionaisService.obterAdicionaisPorUsuario(idUsuario).subscribe(
      (adicionais) => {
        console.log('adicionais recebidas:', adicionais);

        if (Array.isArray(adicionais)) {
          this.adicionais = adicionais;
        } else {
          console.error('Resposta do serviço não é um array:', adicionais);
        }

        console.log('adicionais armazenadas:', this.adicionais);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro ao obter adicionais:', error);
      }
    );

    this.formacaoService.obterFormacaoPorUsuario(idUsuario).subscribe(
      (formacao) => {
        console.log('formacao recebidas:', formacao);

        if (Array.isArray(formacao)) {
          this.formacao = formacao;
        } else {
          console.error('Resposta do serviço não é um array:', formacao);
        }

        console.log('formacao armazenadas:', this.formacao);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro ao obter formacao:', error);
      }
    );
    // fim função ver curriculo
  }

  public showModal1: boolean = false;

  // Função para abrir o modal avaliacao
  openModal1(): void {
    this.showModal = false;
    this.showModal1 = true;
    const userId = this.idusuario;
    console.log('ID Usuario:', userId);
  }

  // Função para fechar o modal
  closeModal(): void {
    this.showModal1 = false;
  }

  public convertToPDF() {
    var content = document.getElementById('pdfContainer');
    html2canvas(content).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/jpeg');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var pageHeight = 291.5;
      var width = pdf.internal.pageSize.getWidth();
      var height = (canvas.height * width) / canvas.width;
      var heightLeft = height;
      var position = 0;
      pdf.addImage(contentDataURL, 'JPEG', 0, position, width, height);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - height;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'JPEG', 0, position, width, height);
        heightLeft -= pageHeight;
      }
      pdf.save('Currículos AGIZO.pdf');
    });
  }
  formatPhoneNumber(phoneNumber: string): string {
    // Remove os caracteres não numéricos do número de telefone
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    // Se o número começa com "1", remova esse "1" inicial
    const formattedPhoneNumber = cleanedPhoneNumber.startsWith('1')
      ? cleanedPhoneNumber.substring(1)
      : cleanedPhoneNumber;
    return formattedPhoneNumber;
  }
}
