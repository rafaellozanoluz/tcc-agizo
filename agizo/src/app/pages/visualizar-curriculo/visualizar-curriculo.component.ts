import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CurriculoService } from '../../services/curriculo.service';

@Component({
  selector: 'app-visualizar-curriculo',
  templateUrl: './visualizar-curriculo.component.html',
  styleUrls: ['./visualizar-curriculo.component.scss'],
})
export class VisualizarCurriculoComponent implements OnInit {
  title = 'html-to-pdf-angular-application';
  habilidades: any[] = [];
  formacao: any[] = [];
  experiencia: any[] = [];
  adicionais: any[] = [];

  nome: string = '';
  cargo: string = '';
  telefone: string = '';
  email: string = '';
  cidade: string = '';
  estado: string = '';
  resumo: string = '';

  constructor(private curriculoService: CurriculoService) {}

  ngOnInit(): void {
    this.curriculoService.obterCurriculo().subscribe((curriculo) => {
      if (curriculo && curriculo.length > 0) {
        this.habilidades = curriculo[0].habilidades;
        this.formacao = curriculo[0].formacao;
        this.experiencia = curriculo[0].experiencia;
        this.adicionais = curriculo[0].adicionais;

        this.resumo = curriculo[0].resumo;
        this.nome = curriculo[0].cabecalho.name;
        this.cargo = curriculo[0].cabecalho.cargo;
        this.telefone = curriculo[0].cabecalho.telefone;
        this.email = curriculo[0].cabecalho.email;
        this.cidade = curriculo[0].cabecalho.cidade;
        this.estado = curriculo[0].cabecalho.estado;
      }
    });
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
