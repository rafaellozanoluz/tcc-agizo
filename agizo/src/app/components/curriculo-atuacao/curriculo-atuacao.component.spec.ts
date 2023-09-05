import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoAtuacaoComponent } from './curriculo-atuacao.component';

describe('CurriculoAtuacaoComponent', () => {
  let component: CurriculoAtuacaoComponent;
  let fixture: ComponentFixture<CurriculoAtuacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculoAtuacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculoAtuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
