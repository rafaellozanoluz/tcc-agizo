import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CurriculoService } from '../../services/curriculo.service';

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

  dadosJson: Opcao[] = [];
  linguagemFromSelecionada: string = '';
  linguagemToSelecionada: string = '';

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

  contato: string = 'Informações de Contato';
  habilidade: string = 'Habilidades';
  educacao: string = 'Educação';
  perfil: string = 'Perfil';
  experiencias: string = 'Experiências';
  infAdicionais: string = 'Informações Adicionais';




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

    this.popularSelectFromComJson("selectFrom");
    this.popularSelectToComJson("selectTo");

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

      while(heightLeft >= 0){
        position = heightLeft - height;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'JPEG', 0, position, width, height);
        heightLeft -= pageHeight;
      }
      pdf.save('Currículos AGIZO.pdf');
    });
  }

  popularSelectFromComJson(nomeSelect: string) {

    this.dadosJson  = [
      { language: "null", name: "Selecione" },
      { language: "pt-BR", name: "Português" },
      { language: "en-GB", name: "Inglês" },
      { language: "es-ES", name: "Espanhol" },
      { language: "it-IT", name: "Italiano" },
      { language: "ja-JP", name: "Japonês" },
      { language: "fr-FR", name: "Francês" },
      // ... outras línguas
    ];

    const selectElement = document.getElementById(nomeSelect) as HTMLSelectElement;

    if (selectElement) {
      selectElement.innerHTML = "";

      this.dadosJson.forEach((lingua) => {
        const optionElement = document.createElement("option");
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

    this.dadosJson  = [
      { language: "null", name: "Selecione" },
      { language: "pt-BR", name: "Português" },
      { language: "en-GB", name: "Inglês" },
      { language: "es-ES", name: "Espanhol" },
      { language: "it-IT", name: "Italiano" },
      { language: "ja-JP", name: "Japonês" },
      { language: "fr-FR", name: "Francês" },
      // ... outras línguas
    ];

    const selectElement = document.getElementById(nomeSelect) as HTMLSelectElement;

    if (selectElement) {
      selectElement.innerHTML = "";

      this.dadosJson.forEach((lingua) => {
        const optionElement = document.createElement("option");
        optionElement.value = lingua.language;
        optionElement.text = lingua.name;
        selectElement.add(optionElement);
      });

      selectElement.addEventListener('change', () => {
        const indiceSelecionado = selectElement.selectedIndex;

        if (indiceSelecionado !== -1) {
          this.linguagemToSelecionada = this.dadosJson[indiceSelecionado].language;
          console.log('Linguagem selecionada TO:', this.linguagemToSelecionada);
          console.error(`Linguagem:langpair=${this.linguagemFromSelecionada}|${this.linguagemToSelecionada}`)
        }
      });
    } else {
      console.error(`Elemento select com ID ${nomeSelect} não encontrado.`);
    }
  }



   async loadTranslation(traduzir: string | any) {
      
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${traduzir}&langpair=${this.linguagemFromSelecionada}|${this.linguagemToSelecionada}`);
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

     //Traduz as labels 
    this.contato = await this.loadTranslation(this.contato);
    this.habilidade = await this.loadTranslation(this.habilidade);
    this.educacao = await this.loadTranslation(this.educacao);
    this.perfil = await this.loadTranslation(this.perfil);
    this.experiencias = await this.loadTranslation(this.experiencias);
    this.infAdicionais = await this.loadTranslation(this.infAdicionais);

    //Traduz as informações de cargo e resumo
    this.cargo = await this.loadTranslation(this.cargo);
    this.resumo = await this.loadTranslation(this.resumo);
    
    //Traduz todos as informações dos arrays percorrendo eles
    for (let i = 0; i < this.habilidades.length; i++) {
      const habilidade = this.habilidades[i];
      habilidade.descricao = await this.loadTranslation(habilidade.descricao);
      habilidade.nivel = await this.loadTranslation(habilidade.nivel);
    }

    for (let i = 0; i < this.formacao.length; i++) {
      const formacao = this.formacao[i];
      formacao.curso = await this.loadTranslation(formacao.curso);
    }

    for (let i = 0; i < this.experiencia.length; i++) {
      const experiencia = this.experiencia[i];
      experiencia.cargo = await this.loadTranslation(experiencia.cargo);
      experiencia.descricao = await this.loadTranslation(experiencia.descricao);
    }

    for (let i = 0; i < this.adicionais.length; i++) {
      const adicionais = this.adicionais[i];
      adicionais.titulo = await this.loadTranslation(adicionais.titulo);
      adicionais.descricao = await this.loadTranslation(adicionais.descricao);
    }
    
    } catch (erro){
      console.error(erro);
    }
  }
}

