import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculo-formacao',
  templateUrl: './curriculo-formacao.component.html',
  styleUrls: ['./curriculo-formacao.component.scss']
})
export class CurriculoFormacaoComponent implements OnInit {

  constructor() { }

  formacoes: any[] = [{ curso: '', local: '', dataInicio: '', dataFim: '' }];

  adicionarFormacao() {
    this.formacoes.push({ curso: '', local: '', dataInicio: '', dataFim: '' });
  }

  removerFormacao(index: number) {
    this.formacoes.splice(index, 1);
  }

  ngOnInit(): void { }
}
