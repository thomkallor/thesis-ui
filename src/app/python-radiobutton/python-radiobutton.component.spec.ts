import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonRadiobuttonComponent } from './python-radiobutton.component';

describe('PythonRadiobuttonComponent', () => {
  let component: PythonRadiobuttonComponent;
  let fixture: ComponentFixture<PythonRadiobuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythonRadiobuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonRadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
