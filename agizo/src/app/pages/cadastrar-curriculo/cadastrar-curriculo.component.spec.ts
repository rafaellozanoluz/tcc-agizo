import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCurriculoComponent } from './cadastrar-curriculo.component';

describe('CadastrarCurriculoComponent', () => {
  let component: CadastrarCurriculoComponent;
  let fixture: ComponentFixture<CadastrarCurriculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastrarCurriculoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarCurriculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
