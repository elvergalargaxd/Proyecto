import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerEstudianteComponent } from './leer-estudiante.component';

describe('LeerEstudianteComponent', () => {
  let component: LeerEstudianteComponent;
  let fixture: ComponentFixture<LeerEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
