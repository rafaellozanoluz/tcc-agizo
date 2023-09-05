import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoCabecalhoComponent } from './curriculo-cabecalho.component';

describe('CurriculoCabecalhoComponent', () => {
  let component: CurriculoCabecalhoComponent;
  let fixture: ComponentFixture<CurriculoCabecalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculoCabecalhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculoCabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
