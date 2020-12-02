import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSuggestionComponent } from './video-suggestion.component';

describe('VideoSuggestionComponent', () => {
  let component: VideoSuggestionComponent;
  let fixture: ComponentFixture<VideoSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
