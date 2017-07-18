import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateComponent } from './allocate.component';

describe('AllocateComponent', () => {
  let component: AllocateComponent;
  let fixture: ComponentFixture<AllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
