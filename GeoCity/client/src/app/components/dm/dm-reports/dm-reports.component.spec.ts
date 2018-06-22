import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmReportsComponent } from './dm-reports.component';

describe('DmReportsComponent', () => {
  let component: DmReportsComponent;
  let fixture: ComponentFixture<DmReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
