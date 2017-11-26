import rootReducer from './index';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import reducer, * as action from '../../src/reducers/lyrics';
import { setCurrentBand } from '../../src/reducers/app';

// import * as CONSTANTS from '../constants';

/* ALL TEST CASES
* Case 0: Blank line
* ''
* Case 1: One singer, one part
* [BRAVO] I can sing
* Case 2: Two singers, two parts
* [BRAVO] I can sing [ALPHA] I can dance
* Case 3: Multiple singers, same amout of parts
* [BRAVO] I can sing [ALPHA] I can dance [CHARLIE] I can stand still [DELTA] me too
* Case 4: Unassigned line is assigned to member from previous line
* [BRAVO] Yeah \n I can sing
* Case 5: Unassigned line is assigned to ALL if previou line was blank
* \nI can sing [CHARLIE] I can dance --> [ALL] I can sing [CHARLIE] I can dance
* Case 6: If assigned member is ALL, keep ALL
* [ALL] I can sing
* Case 7: Two singers and one part share the line and get double color
* [BOB/CHARLIE] We love you
* Case 8: Names in parenthesis add adlibs
* [BOB (CHARLIE)] I love you (Me too)
* Case 9: Double members plus adlibs
* [BOB/APLHA (CHARLIE)] I love you (Me too)
* Case 10: Double members plust double adlibs
*/

const testBand = {
  bandName: 'Test Band',
  colors: ['red', 'blue', 'green', 'yellow'],
  genre: 'Test Genre',
  id: 1000,
  members: ['alpha', 'bravo', 'charlie', 'delta']
};

describe('Lyrics Parser', () => {

  let testStore;
  beforeEach(() => {
    testStore = createStore(
      rootReducer,
      composeWithDevTools(
        applyMiddleware(thunkMiddleware)
      )
    );
    testStore.dispatch(setCurrentBand(testBand));
  });

  describe('handleParser', () => {

    it('Case 0: Blank line', () => {
      const evt = {target: { value: '' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: [''],
        content: ['&nbsp;'],
        member: [],
        adlibs: []
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 1: One singer, one part', () => {
      const evt = {target: { value: '[bravo] I can sing' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue'],
        content: ['I can sing'],
        member: ['BRAVO'],
        adlibs: [false]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 1b: Singers are case insensite"', () => {
      const evt = {target: { value: '[BraVo] I can sing' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue'],
        content: ['I can sing'],
        member: ['BRAVO'],
        adlibs: [false]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 1c: It does not break if Singer name is not found"', () => {
      const evt = {target: { value: '[bob] I can sing' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: [undefined],
        content: ['I can sing'],
        member: ['BOB'],
        adlibs: [false]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 2: Two singers, two parts', () => {
      const evt = {target: { value: '[bravo] I can sing [alpha] I can dance' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue', 'red'],
        content: ['I can sing', 'I can dance'],
        member: ['BRAVO', 'ALPHA'],
        adlibs: [false, false]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 3: Multiple singers, same amout of parts', () => {
      const evt = {target: { value: '[bravo] I can sing [alpha] I can dance [charliE] I can stand still [delta] me too' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue', 'red', 'green', 'yellow'],
        content: ['I can sing', 'I can dance', 'I can stand still', 'me too'],
        member: ['BRAVO', 'ALPHA', 'CHARLIE', 'DELTA'],
        adlibs: [false, false, false, false]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 4: Unassigned line is assigned to member from previous line', () => {
      const evt = {target: { value: '[BRAVO] Yeah\nI can sing' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue'],
        content: ['Yeah'],
        member: ['BRAVO'],
        adlibs: [false]
      }, {
        class: ['blue'],
        content: ['I can sing'],
        member: [undefined],
        adlibs: [false]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 5: Unassigned line is assigned to ALL if previou line was blank', () => {
      const evt = {target: { value: '\nI can sing [CHARLIE] I can dance' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: [''],
        content: ['&nbsp;'],
        member: [],
        adlibs: []
      }, {
        class: [undefined, 'green'],
        content: ['I can sing', 'I can dance'],
        member: ['ALL', 'CHARLIE'],
        adlibs: [false, false]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 6: If assigned member is ALL, keep ALL', () => {
      const evt = {target: { value: '[ALL] I can sing [CHARLIE] I can dance' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: [undefined, 'green'],
        content: ['I can sing', 'I can dance'],
        member: ['ALL', 'CHARLIE'],
        adlibs: [false, false]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 7: Two singers and one part share the line and get double color', () => {
      const evt = {target: { value: '[BRAVO/CHARLIE] We love you' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue-green'],
        content: ['We love you'],
        member: ['BRAVO/CHARLIE'],
        adlibs: [false]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 8: Names in parenthesis add adlibs', () => {
      const evt = {target: { value: '[BRAVO (CHARLIE)] We love you (Me too)' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue', 'green'],
        content: ['We love you', '(Me too)'],
        member: ['BRAVO (CHARLIE)'],
        adlibs: [false, true]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 8b: Repeating ames in parenthesis add adlibs', () => {
      const evt = {target: { value: '[BRAVO (CHARLIE)] We love you (Me too) Oh yeah (oh yeah)' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue', 'green', 'blue', 'green'],
        content: ['We love you', '(Me too)', 'Oh yeah', '(oh yeah)'],
        member: ['BRAVO (CHARLIE)'],
        adlibs: [false, true, false, true]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 9: Double members plus adlibs', () => {
      const evt = {target: { value: '[BRAVO/ALPHA (CHARLIE)] We love you (Me too)' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue-red', 'green'],
        content: ['We love you', '(Me too)'],
        member: ['BRAVO/ALPHA (CHARLIE)'],
        adlibs: [false, true]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });

    it('Case 10: Double members plust double adlibs', () => {
      const evt = {target: { value: '[BRAVO/ALPHA (CHARLIE/DELTA)] We love you (Us too)' }};
      testStore.dispatch(action.handleParser(evt));
      const result = [{
        class: ['blue-red', 'green-yellow'],
        content: ['We love you', '(Us too)'],
        member: ['BRAVO/ALPHA (CHARLIE/DELTA)'],
        adlibs: [false, true]
      }];
      expect(testStore.getState().lyrics.formattedLyrics).toEqual(result);
    });
  });
});
