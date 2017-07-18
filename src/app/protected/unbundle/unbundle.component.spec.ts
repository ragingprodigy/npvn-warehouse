import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbundleComponent } from './unbundle.component';

describe('UnbundleComponent', () => {
  let component: UnbundleComponent;
  let fixture: ComponentFixture<UnbundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnbundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
