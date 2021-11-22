import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerCursoComponent } from './leer-curso.component';

describe('LeerCursoComponent', () => {
  let component: LeerCursoComponent;
  let fixture: ComponentFixture<LeerCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
