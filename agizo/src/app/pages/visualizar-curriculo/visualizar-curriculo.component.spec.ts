import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCurriculoComponent } from './visualizar-curriculo.component';

describe('VisualizarCurriculoComponent', () => {
  let component: VisualizarCurriculoComponent;
  let fixture: ComponentFixture<VisualizarCurriculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarCurriculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarCurriculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
