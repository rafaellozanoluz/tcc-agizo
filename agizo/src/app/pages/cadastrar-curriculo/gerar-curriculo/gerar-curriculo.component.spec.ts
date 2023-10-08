import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarCurriculoComponent } from './gerar-curriculo.component';

describe('GerarCurriculoComponent', () => {
  let component: GerarCurriculoComponent;
  let fixture: ComponentFixture<GerarCurriculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GerarCurriculoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GerarCurriculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
