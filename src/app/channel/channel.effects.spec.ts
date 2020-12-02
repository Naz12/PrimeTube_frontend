import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ChannelEffects } from './channel.effects';

describe('ChannelEffects', () => {
  let actions$: Observable<any>;
  let effects: ChannelEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChannelEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ChannelEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
