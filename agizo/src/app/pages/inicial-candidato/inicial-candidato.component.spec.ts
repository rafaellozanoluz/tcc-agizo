import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicialCandidatoComponent } from './inicial-candidato.component';

describe('InicialCandidatoComponent', () => {
  let component: InicialCandidatoComponent;
  let fixture: ComponentFixture<InicialCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicialCandidatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicialCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
