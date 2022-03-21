import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilEstudianteComponent } from './editar-perfil-estudiante.component';

describe('EditarPerfilEstudianteComponent', () => {
  let component: EditarPerfilEstudianteComponent;
  let fixture: ComponentFixture<EditarPerfilEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPerfilEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
