import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionCursoComponent } from './edicion-curso.component';

describe('EdicionCursoComponent', () => {
  let component: EdicionCursoComponent;
  let fixture: ComponentFixture<EdicionCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicionCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
