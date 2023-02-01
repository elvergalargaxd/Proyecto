import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoInovateComponent } from './curso-inovate.component';

describe('CursoInovateComponent', () => {
  let component: CursoInovateComponent;
  let fixture: ComponentFixture<CursoInovateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoInovateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoInovateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
