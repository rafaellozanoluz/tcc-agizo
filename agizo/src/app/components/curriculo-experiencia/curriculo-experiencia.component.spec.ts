import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoExperienciaComponent } from './curriculo-experiencia.component';

describe('CurriculoExperienciaComponent', () => {
  let component: CurriculoExperienciaComponent;
  let fixture: ComponentFixture<CurriculoExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculoExperienciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculoExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
