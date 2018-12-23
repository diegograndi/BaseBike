import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetphotosComponent } from './worksheetphotos.component';

describe('WorksheetphotosComponent', () => {
  let component: WorksheetphotosComponent;
  let fixture: ComponentFixture<WorksheetphotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetphotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetphotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
