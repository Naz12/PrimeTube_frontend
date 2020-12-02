import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveWarningDialogComponent } from './live-warning-dialog.component';

describe('LiveWarningDialogComponent', () => {
  let component: LiveWarningDialogComponent;
  let fixture: ComponentFixture<LiveWarningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveWarningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
