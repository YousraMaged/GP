import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelinfoComponent } from './parcelinfo.component';

describe('ParcelinfoComponent', () => {
  let component: ParcelinfoComponent;
  let fixture: ComponentFixture<ParcelinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
