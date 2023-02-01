import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeerInscripcioneComponent } from './leer-inscripcione.component';

describe('LeerInscripcioneComponent', () => {
  let component: LeerInscripcioneComponent;
  let fixture: ComponentFixture<LeerInscripcioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeerInscripcioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerInscripcioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
