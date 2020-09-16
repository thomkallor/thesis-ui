import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCheckboxComponent } from './package-checkbox.component';

describe('PackageCheckboxComponent', () => {
  let component: PackageCheckboxComponent;
  let fixture: ComponentFixture<PackageCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
