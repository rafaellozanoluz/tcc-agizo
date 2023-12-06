import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-curriculo',
  templateUrl: './cadastrar-curriculo.component.html',
  styleUrls: ['./cadastrar-curriculo.component.scss'],
})
export class CadastrarCurriculoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // Variável para rastrear o estado do slide atual
  slideAtual = 1;

  alterarSlide(numero: number) {
    this.slideAtual = numero;
  }

  // Função para avançar para o próximo slide
  slideProximo() {
    if (this.slideAtual < 6) {
      // Se houver mais slides, aumente o número aqui
      this.slideAtual++;
    }
  }

  // Função para voltar ao slide anterior
  slideVoltar() {
    if (this.slideAtual > 1) {
      this.slideAtual--;
    }
  }
}
