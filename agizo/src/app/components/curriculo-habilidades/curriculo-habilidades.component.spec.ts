import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoHabilidadesComponent } from './curriculo-habilidades.component';

describe('CurriculoHabilidadesComponent', () => {
  let component: CurriculoHabilidadesComponent;
  let fixture: ComponentFixture<CurriculoHabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculoHabilidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculoHabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
