import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculogeralComponent } from './curriculogeral.component';

describe('CurriculogeralComponent', () => {
  let component: CurriculogeralComponent;
  let fixture: ComponentFixture<CurriculogeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculogeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculogeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
