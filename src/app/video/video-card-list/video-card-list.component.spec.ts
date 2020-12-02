import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCardListComponent } from './video-card-list.component';

describe('VideoCardListComponent', () => {
  let component: VideoCardListComponent;
  let fixture: ComponentFixture<VideoCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
