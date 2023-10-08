import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoResumoComponent } from './curriculo-resumo.component';

describe('CurriculoResumoComponent', () => {
  let component: CurriculoResumoComponent;
  let fixture: ComponentFixture<CurriculoResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculoResumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculoResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
