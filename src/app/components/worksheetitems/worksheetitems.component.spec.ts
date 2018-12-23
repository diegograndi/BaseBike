import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetitemsComponent } from './worksheetitems.component';

describe('WorksheetitemsComponent', () => {
  let component: WorksheetitemsComponent;
  let fixture: ComponentFixture<WorksheetitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
