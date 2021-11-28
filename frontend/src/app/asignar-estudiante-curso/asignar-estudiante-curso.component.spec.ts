import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEstudianteCursoComponent } from './asignar-estudiante-curso.component';

describe('AsignarEstudianteCursoComponent', () => {
  let component: AsignarEstudianteCursoComponent;
  let fixture: ComponentFixture<AsignarEstudianteCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarEstudianteCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarEstudianteCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
