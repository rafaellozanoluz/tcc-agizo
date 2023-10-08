import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-curriculo-experiencia',
  templateUrl: './curriculo-experiencia.component.html',
  styleUrls: ['./curriculo-experiencia.component.scss'],
})
export class CurriculoExperienciaComponent implements OnInit {
  experienceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.experienceForm = this.fb.group({
      experiences: this.fb.array([this.createExperience()]),
    });
  }

  createExperience(): FormGroup {
    return this.fb.group({
      cargo: '',
      empresa: '',
      descricao: '',
      dataInicio: '',
      dataFim: '',
    });
  }

  addExperience(): void {
    const experiencesArray = this.experienceForm.get('experiences') as FormArray;
    experiencesArray.push(this.createExperience());
  }

  removeExperience(index: number): void {
    const experiencesArray = this.experienceForm.get('experiences') as FormArray;
    experiencesArray.removeAt(index);
  }

  ngOnInit(): void {}
}
