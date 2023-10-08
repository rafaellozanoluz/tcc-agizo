import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-curriculo-experiencia',
  templateUrl: './curriculo-experiencia.component.html',
  styleUrls: ['./curriculo-experiencia.component.scss'],
})
export class CurriculoExperienciaComponent implements OnInit {
  constructor() {}

  experiencias: any[] = [{ cargo: '', local: '', descricao: '', dataInicio: '', dataFim: '' }];

  adicionarExperiencia() {
    this.experiencias.push({ cargo: '', local: '', descricao: '', dataInicio: '', dataFim: '' });
  }

  removerExperiencia(index: number) {
    this.experiencias.splice(index, 1);
  }

  ngOnInit(): void {}
}
