import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoFormacaoComponent } from './curriculo-formacao.component';

describe('CurriculoFormacaoComponent', () => {
  let component: CurriculoFormacaoComponent;
  let fixture: ComponentFixture<CurriculoFormacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculoFormacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculoFormacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
