import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosInnovatComponent } from './cursos-innovat.component';

describe('CursosInnovatComponent', () => {
  let component: CursosInnovatComponent;
  let fixture: ComponentFixture<CursosInnovatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosInnovatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosInnovatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
