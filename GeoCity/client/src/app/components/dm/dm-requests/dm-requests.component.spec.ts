import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmRequestsComponent } from './dm-requests.component';

describe('DmRequestsComponent', () => {
  let component: DmRequestsComponent;
  let fixture: ComponentFixture<DmRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
