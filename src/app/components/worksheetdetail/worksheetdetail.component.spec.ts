import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetdetailComponent } from './worksheetdetail.component';

describe('WorksheetdetailComponent', () => {
  let component: WorksheetdetailComponent;
  let fixture: ComponentFixture<WorksheetdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
