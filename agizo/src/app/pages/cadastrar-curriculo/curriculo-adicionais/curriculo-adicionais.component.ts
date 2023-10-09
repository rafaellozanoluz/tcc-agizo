import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculo-adicionais',
  templateUrl: './curriculo-adicionais.component.html',
  styleUrls: ['./curriculo-adicionais.component.scss']
})
export class CurriculoAdicionaisComponent implements OnInit {

  constructor() { }

  adicionais: any[] = [{ tipo: '', descricao: '', dataAquisicao: ''}];

  adicionarAdicional() {
    this.adicionais.push({ tipo: '', descricao: '', dataAquisicao: ''});
  }

  removerAdicional(index: number) {
    this.adicionais.splice(index, 1);
  }


  ngOnInit(): void {
  }

}
