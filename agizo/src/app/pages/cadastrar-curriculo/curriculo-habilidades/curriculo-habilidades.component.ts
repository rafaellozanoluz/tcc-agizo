import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculo-habilidades',
  templateUrl: './curriculo-habilidades.component.html',
  styleUrls: ['./curriculo-habilidades.component.scss']
})
export class CurriculoHabilidadesComponent implements OnInit {

  constructor() { }

  habilidades: any[] = [{ habilidade: '', nivel: '' }];

  adicionarHabilidade() {
    this.habilidades.push({ habilidade: '', nivel: '' });
  }

  removerHabilidade(index: number) {
    this.habilidades.splice(index, 1);
  }


  ngOnInit(): void {
  }

}
