export const DEFAULT_COLORS = {
  default: '#000000',
  black: '#000000',
  blue: '#598ffd',
  gray: '#707070',
  green: '#49d156',
  orange: '#fea245',
  pink: '#fb9cf0',
  purple: '#9e8ef0',
  red: '#d14949',
  teal: '#34ac9e',
  white: 'FFFFFF',
  yellow: '#ffd700',
};

export const FLAGS_LIST = {
  american: 'usa',
  brazilian: 'brazil',
  canadian: 'canada',
  chinese: 'china',
  japanese: 'japan',
  korean: 'korea',
  taiwanese: 'taiwan',
  thai: 'thailand',
};

export const ICONS = {
  check:
    'M50,0C22.5,0,0,22.5,0,50s22.5,50,50,50s50-22.5,50-50S77.5,0,50,0z M75.6,41.2L47.5,73.1 c-1.2,1.2-3.1,1.2-4.4,0.6L23.1,60c-1.9-1.3-1.9-3.1-0.6-4.4l6.2-8.8c0.6-1.9,2.5-1.9,4.4-1.2l6.9,5c1.2,1.2,3.1,0.6,4.4-0.6 l18.1-20c1.2-1.2,3.1-1.2,4.4,0l8.1,6.9C76.2,38.1,76.2,40,75.6,41.2z',
  clock:
    'M100,50c0,9.4-2.2,17.8-6.6,25.1c-4.6,7.6-10.7,13.7-18.3,18.3C67.8,97.8,59.4,100,50,100s-17.8-2.2-25.1-6.6 c-7.6-4.6-13.7-10.7-18.3-18.3C2.2,67.8,0,59.4,0,50s2.2-17.8,6.6-25.1c4.6-7.6,10.7-13.7,18.3-18.3C32.2,2.2,40.6,0,50,0 s17.8,2.2,25.1,6.6c7.6,4.6,13.7,10.7,18.3,18.3C97.8,32.2,100,40.6,100,50z M85.4,50c0-6.2-1.5-12.2-4.6-17.8 c-3.2-5.5-7.5-9.8-13-13c-5.6-3-11.6-4.6-17.8-4.6s-12.2,1.5-17.8,4.6c-5.5,3.2-9.8,7.5-13,13c-3,5.6-4.6,11.6-4.6,17.8 s1.5,12.2,4.6,17.8c3.2,5.5,7.5,9.8,13,13c5.6,3,11.6,4.6,17.8,4.6s12.2-1.5,17.8-4.6c5.5-3.2,9.8-7.5,13-13 C83.9,62.2,85.4,56.2,85.4,50z M58.4,26.9v29.2c0,0.6-0.2,1.1-0.7,1.6c-0.5,0.5-1,0.7-1.6,0.7H35.4c-0.6,0-1.1-0.2-1.6-0.7 c-0.3-0.6-0.5-1.1-0.5-1.6v-4.1c0-0.6,0.2-1.1,0.5-1.4c0.5-0.5,1-0.7,1.6-0.7H50V26.9c0-0.5,0.2-0.9,0.7-1.4 c0.2-0.5,0.6-0.7,1.4-0.7h4.1c0.6,0,1.1,0.2,1.6,0.7C58.2,26,58.4,26.5,58.4,26.9z',
  heart:
    'M50,85.5c-1,0-1.9-0.3-2.5-1L12.7,51c-0.1,0-0.4-0.2-0.7-0.6s-0.6-0.7-0.9-0.8c-0.7-0.8-1.7-2-3.1-3.7 c-1.3-1.6-2.5-3.4-3.7-5.5c-1-1.7-2-3.9-2.9-6.6C0.5,31.2,0,28.6,0,26c0-8.1,2.3-14.5,7-19.1C11.6,2.3,18.2,0,26.8,0 c2.2,0,4.6,0.4,7,1.2s4.7,1.8,6.6,3.1c1.8,1.2,3.6,2.5,5.3,3.9c1.6,1.2,3,2.4,4.3,3.7c1.3-1.3,2.7-2.5,4.3-3.7 c1.7-1.4,3.5-2.7,5.3-3.9c2-1.3,4.2-2.3,6.6-3.1C68.7,0.4,71,0,73.2,0C81.8,0,88.4,2.3,93,6.8c4.7,4.7,7,11.1,7,19.1 s-4.2,16.5-12.7,25.2L52.5,84.6C51.9,85.2,51,85.5,50,85.5z',
  'heart-hollow':
    'M73.2,8c6.4,0,11,1.5,14.1,4.5C90.5,15.6,92,20.1,92,26c0,5.9-3.5,12.4-10.3,19.5L50,75.9L18.3,45.2 c-0.2-0.2-0.4-0.4-0.6-0.5c-0.3-0.3-0.7-0.7-1-1c-0.6-0.8-1.5-1.7-2.5-3c-1-1.2-1.9-2.6-2.9-4.2c-0.1-0.1-0.1-0.2-0.2-0.3 c-0.5-0.8-1.3-2.3-2.2-5c0,0,0-0.1,0-0.1C8.3,29.4,8,27.7,8,26c0-5.9,1.5-10.3,4.7-13.5c3-3,7.6-4.5,14.1-4.5 c1.4,0,2.9,0.3,4.6,0.8c1.7,0.6,3.3,1.3,4.6,2.2c0,0,0.1,0,0.1,0.1c1.5,1,3,2.1,4.4,3.3c0.1,0.1,0.2,0.2,0.4,0.3 c1.3,0.9,2.4,1.9,3.4,3c1.5,1.5,3.5,2.3,5.7,2.3s4.2-0.8,5.7-2.3c1-1,2.2-2,3.4-3c0.1-0.1,0.2-0.2,0.4-0.3c1.4-1.2,2.9-2.3,4.4-3.3 c0,0,0.1,0,0.1-0.1c1.3-0.9,2.9-1.6,4.6-2.2C70.3,8.3,71.9,8,73.2,8 M73.2,0c-2.2,0-4.6,0.4-7,1.2C63.7,2,61.5,3,59.6,4.3 c-1.8,1.2-3.6,2.5-5.3,3.9c-1.6,1.2-3,2.4-4.3,3.7c-1.3-1.3-2.7-2.5-4.3-3.7c-1.7-1.4-3.5-2.7-5.3-3.9c-2-1.3-4.2-2.3-6.6-3.1 C31.3,0.4,29,0,26.8,0C18.2,0,11.6,2.3,7,6.8C2.3,11.5,0,17.9,0,26c0,2.6,0.5,5.2,1.4,7.8c0.9,2.7,1.9,4.9,2.9,6.6 c1.2,2.1,2.4,3.9,3.7,5.5c1.4,1.7,2.5,2.9,3.1,3.7c0.3,0.1,0.6,0.4,0.9,0.8c0.3,0.4,0.6,0.6,0.7,0.6l34.8,33.6c0.7,0.7,1.5,1,2.5,1 s1.9-0.3,2.5-1l34.8-33.4C95.8,42.4,100,34,100,26c0-8.1-2.3-14.5-7-19.1C88.4,2.3,81.8,0,73.2,0L73.2,0z',
  login:
    'M77.2,50c0,1.1-0.5,2.1-1.4,3L40.4,88.4c-0.9,0.9-1.9,1.4-3,1.4c-1.1,0-2.1-0.5-3-1.4c-0.8-0.8-1.1-1.8-1.1-3V66.7H4.1 c-0.9,0-1.9-0.4-3-1.1c-0.8-0.8-1.1-1.8-1.1-3V37.4c0-1.2,0.4-2.2,1.1-3c1.1-0.8,2.1-1.1,3-1.1h29.2V14.6c0-1.2,0.4-2.2,1.1-3 c0.9-0.9,1.9-1.4,3-1.4c1.1,0,2.1,0.5,3,1.4L75.8,47C76.7,47.9,77.2,48.9,77.2,50z M82,8H62c-2.2,0-4,1.8-4,4s1.8,4,4,4h20 c1.7,0,10,0.7,10,11v21v4v21c0,10.3-8.4,11-10,11H62c-2.2,0-4,1.8-4,4s1.8,4,4,4h20c0.5,0,4.6-0.1,8.9-2.3C95,87.4,100,82.7,100,73 V52v-4V27C100,11.4,87,8,82,8z',
  logout:
    'M0,27l0,21l0,4l0,21c0,9.7,5,14.4,9.1,16.7c4.3,2.3,8.4,2.3,8.9,2.3h20c2.2,0,4-1.8,4-4s-1.8-4-4-4H18c-1.6,0-10-0.7-10-11 V52v-4V27c0-10.3,8.4-11,10-11h20c2.2,0,4-1.8,4-4s-1.8-4-4-4H18C13,8,0,11.4,0,27z M100.2,50c0,1.1-0.5,2.1-1.4,3L63.4,88.4 c-0.9,0.9-1.9,1.4-3,1.4c-1.1,0-2.1-0.5-3-1.4c-0.8-0.8-1.1-1.8-1.1-3V66.7H27.1c-0.9,0-1.9-0.4-3-1.1c-0.8-0.8-1.1-1.8-1.1-3V37.4 c0-1.2,0.4-2.2,1.1-3c1.1-0.8,2.1-1.1,3-1.1h29.2V14.6c0-1.2,0.4-2.2,1.1-3c0.9-0.9,1.9-1.4,3-1.4c1.1,0,2.1,0.5,3,1.4L98.8,47 C99.7,47.9,100.2,48.9,100.2,50z',
};

export const NATIONALITY_FLAG_URL = '/images/flags/';

export const PROFILE_PICTURE_URL = '/images/profiles/';

export const YOUTUBE_URLS = ['cudssvDuOpc'];
