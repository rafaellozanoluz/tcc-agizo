import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicialRecrutadorComponent } from './inicial-recrutador.component';

describe('InicialRecrutadorComponent', () => {
  let component: InicialRecrutadorComponent;
  let fixture: ComponentFixture<InicialRecrutadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicialRecrutadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicialRecrutadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
