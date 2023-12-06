import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveisComponent } from './niveis.component';

describe('NiveisComponent', () => {
  let component: NiveisComponent;
  let fixture: ComponentFixture<NiveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
