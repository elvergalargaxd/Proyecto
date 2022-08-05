import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerDocenteComponent } from './leer-docente.component';

describe('LeerDocenteComponent', () => {
  let component: LeerDocenteComponent;
  let fixture: ComponentFixture<LeerDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
