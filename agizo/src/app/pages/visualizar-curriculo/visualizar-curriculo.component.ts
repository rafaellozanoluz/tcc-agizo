import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CabecalhoService } from '../../services/cabecalho.service';
import { ResumoService } from '../../services/resumo.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { HabilidadesService } from '../../services/habilidades.service';
import { AdicionaisService } from '../../services/adicionais.service';
import { FormacaoService } from '../../services/formacao.service';
import { AreaAtuacaoService } from '../../services/areaatuacao.service';
import { NivelService } from '../../services/nivel.service';
import { AuthService } from 'src/app/services';
import { ChangeDetectorRef } from '@angular/core';

interface Opcao {
  language: string;
  name: string;
}

@Component({
  selector: 'app-visualizar-curriculo',
  templateUrl: './visualizar-curriculo.component.html',
  styleUrls: ['./visualizar-curriculo.component.scss'],
})
export class VisualizarCurriculoComponent implements OnInit {
  idUsuario: string = this.authService.userLogged.id;

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

  contato: string = 'Informações de Contato';
  habilidade: string = 'Habilidades';
  educacao: string = 'Educação';
  perfil: string = 'Perfil';
  experiencia: string = 'Experiências';
  infAdicionais: string = 'Informações Adicionais';
  ate: string = 'até';

  dadosJson: Opcao[] = [];
  linguagemFromSelecionada: string = '';
  linguagemToSelecionada: string = '';

  constructor(
    private authService: AuthService,
    private cabecalhoService: CabecalhoService,
    private resumoService: ResumoService,
    private experienciaService: ExperienciaService,
    private habilidadesService: HabilidadesService,
    private adicionaisService: AdicionaisService,
    private formacaoService: FormacaoService,
    private areaAtuacaoService: AreaAtuacaoService,
    private nivelService: NivelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.authService.userLogged) {
      const idUsuario: string = this.authService.userLogged.id;

      this.cabecalhoService.obterCabecalhoPorUsuario(idUsuario).subscribe((cabecalho) => {
        if (cabecalho) {
          this.nome = cabecalho[0].name;
          this.telefone = cabecalho[0].telefone;
          this.email = cabecalho[0].email;
          this.cidade = cabecalho[0].cidade;
          this.estado = cabecalho[0].estado;

          const areaAtuacaoId = cabecalho[0].cargo;

          console.log('areaAtuacaoId recebidas:', areaAtuacaoId);
          this.areaAtuacaoService.obterAreaAtuacaoPorId(areaAtuacaoId).subscribe((areaAtuacao) => {
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
    }

    this.popularSelectFromComJson('selectFrom');
    this.popularSelectToComJson('selectTo');
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

  popularSelectFromComJson(nomeSelect: string) {
    this.dadosJson = [
      { language: 'null', name: 'Selecione' },
      { language: 'pt-BR', name: 'Português' },
      { language: 'en-GB', name: 'Inglês' },
      { language: 'es-ES', name: 'Espanhol' },
      { language: 'it-IT', name: 'Italiano' },
      { language: 'ja-JP', name: 'Japonês' },
      { language: 'fr-FR', name: 'Francês' },
      // ... outras línguas
    ];

    const selectElement = document.getElementById(nomeSelect) as HTMLSelectElement;

    if (selectElement) {
      selectElement.innerHTML = '';

      this.dadosJson.forEach((lingua) => {
        const optionElement = document.createElement('option');
        optionElement.value = lingua.language;
        optionElement.text = lingua.name;
        selectElement.add(optionElement);
      });

      selectElement.addEventListener('change', () => {
        const indiceSelecionado = selectElement.selectedIndex;

        if (indiceSelecionado !== -1) {
          this.linguagemFromSelecionada = this.dadosJson[indiceSelecionado].language;
          console.log('Linguagem selecionada FROM:', this.linguagemFromSelecionada);
        }
      });
    } else {
      console.error(`Elemento select com ID ${nomeSelect} não encontrado.`);
    }
  }

  popularSelectToComJson(nomeSelect: string) {
    this.dadosJson = [
      { language: 'null', name: 'Selecione' },
      { language: 'pt-BR', name: 'Português' },
      { language: 'en-GB', name: 'Inglês' },
      { language: 'es-ES', name: 'Espanhol' },
      { language: 'it-IT', name: 'Italiano' },
      { language: 'ja-JP', name: 'Japonês' },
      { language: 'fr-FR', name: 'Francês' },
      // ... outras línguas
    ];

    const selectElement = document.getElementById(nomeSelect) as HTMLSelectElement;

    if (selectElement) {
      selectElement.innerHTML = '';

      this.dadosJson.forEach((lingua) => {
        const optionElement = document.createElement('option');
        optionElement.value = lingua.language;
        optionElement.text = lingua.name;
        selectElement.add(optionElement);
      });

      selectElement.addEventListener('change', () => {
        const indiceSelecionado = selectElement.selectedIndex;

        if (indiceSelecionado !== -1) {
          this.linguagemToSelecionada = this.dadosJson[indiceSelecionado].language;
          console.log('Linguagem selecionada TO:', this.linguagemToSelecionada);
          console.error(
            `Linguagem:langpair=${this.linguagemFromSelecionada}|${this.linguagemToSelecionada}`
          );
        }
      });
    } else {
      console.error(`Elemento select com ID ${nomeSelect} não encontrado.`);
    }
  }

  async loadTranslation(traduzir: string | any) {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${traduzir}&langpair=${this.linguagemFromSelecionada}|${this.linguagemToSelecionada}`
      );
      const data = await response.json();
      const traducao = data.responseData.translatedText;
      console.log(traducao);
      return traducao;
    } catch (erro) {
      console.error('Erro ao obter tradução:', erro);
      throw erro; // Rejeita a Promise com o erro
    }
  }

  async Translation() {
    try {
      this.contato = await this.loadTranslation(this.contato);
      this.habilidade = await this.loadTranslation(this.habilidade);
      this.educacao = await this.loadTranslation(this.educacao);
      this.perfil = await this.loadTranslation(this.perfil);
      this.experiencia = await this.loadTranslation(this.experiencia);
      this.infAdicionais = await this.loadTranslation(this.infAdicionais);
      this.ate = await this.loadTranslation(this.ate);
      this.cargo = await this.loadTranslation(this.cargo);
      this.resumo = await this.loadTranslation(this.resumo);

      for (let i = 0; i < this.habilidades.length; i++) {
        const habilidade = this.habilidades[i];
        habilidade.descricao = await this.loadTranslation(habilidade.descricao);
        habilidade.nivel = await this.loadTranslation(habilidade.nivel);
      }

      for (let i = 0; i < this.formacao.length; i++) {
        const formacao = this.formacao[i];
        formacao.curso = await this.loadTranslation(formacao.curso);
      }

      for (let i = 0; i < this.experiencias.length; i++) {
        const experiencia = this.experiencias[i];
        experiencia.cargo = await this.loadTranslation(experiencia.cargo);
        experiencia.descricao = await this.loadTranslation(experiencia.descricao);
      }

      for (let i = 0; i < this.adicionais.length; i++) {
        const adicionais = this.adicionais[i];
        adicionais.titulo = await this.loadTranslation(adicionais.titulo);
        adicionais.descricao = await this.loadTranslation(adicionais.descricao);
      }
    } catch (erro) {
      console.error(erro);
    }
  }
}
