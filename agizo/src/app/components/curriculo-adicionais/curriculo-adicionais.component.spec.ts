import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoAdicionaisComponent } from './curriculo-adicionais.component';

describe('CurriculoAdicionaisComponent', () => {
  let component: CurriculoAdicionaisComponent;
  let fixture: ComponentFixture<CurriculoAdicionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculoAdicionaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculoAdicionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
