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
  }

  public convertToPDF() {
    var content = document.getElementById('pdfContainer');
    html2canvas(content).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = (canvas.height * width) / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('Currículos AGIZO.pdf');
    });
  }
}
