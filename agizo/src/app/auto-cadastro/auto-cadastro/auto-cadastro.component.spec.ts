import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCadastroComponent } from './auto-cadastro.component';

describe('AutoCadastroComponent', () => {
  let component: AutoCadastroComponent;
  let fixture: ComponentFixture<AutoCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoCadastroComponent]
    });
    fixture = TestBed.createComponent(AutoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
