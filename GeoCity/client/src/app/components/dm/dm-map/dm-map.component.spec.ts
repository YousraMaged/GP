import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmMapComponent } from './dm-map.component';

describe('DmMapComponent', () => {
  let component: DmMapComponent;
  let fixture: ComponentFixture<DmMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
