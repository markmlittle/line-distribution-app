import types from './types';

const initialState = {
  activeMemberPill: '',
  activeSong: {},
  activeUnit: {},
  // activeSong: {
  //   id: '-L_4OOhzdx5L1qgyuyoU',
  //   album: 'The Story Begins',
  //   createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //   distribution:
  //     '[1:13.31:3.09] modu nareul gajigo maeil gaman an dujo\n[2:16.51:1.6]  naega neomu yeppeujo\n[3:18.23:1.67]  na ttaemune da himdeuljo\n[4:19.95:3.23]  eodil geotgo isseodo ppalgan badagingeojo\n[5:23.24:1.98]  Red carpet gateun gibun\n[6:25.31:1.74]  modu nal cheoda bojo\n\n[7:27.08:3.4]  eotteon sarameun eomeonimi nugunyago\n[8:30.47:1.46]  shinseonhage mal georeodo\n[9:32.04:2.68]  amu neukkimi an deuljo Oh\n[10:33.87:3.54]  hajiman nado nugunga hago sarange\n[11:37.43:1.32]  ppajeobogo shipeo Baby\n[12:38.83:1.8]  jal deureoyo nae Boy\n\n[13:40.66:3.04]  dan hanbeondo neukkyeobon jeok eomneun geol\n[14:43.92:1.26]  alge haejuneun\n[15:45.26:1.99]  (saram gidarigo inneun geol)\n[16:47.35:1.42]  eolmaga dwaedo [17:49.05:1.8]  gidarigo shipeo\n[18:51.07:1.84]  (I just wanna fall in love)\n\n[19:53.46:3.73]  eotteoke naega umjigil su eopge\n[20:57.31:1.72]  nal Ooh ahh ooh ahh [21:59.17:1.98]  hage mandeureo jweo\n[22:61.25:3.11]  gajja gajja jinshim eomneun gajja\n[23:64.5:1.36]  jal ga jal ga [24:65.94:1.72]  (Huh OOH-AHH-hage)\n[25:67:3.67]  eotteoke ije deo halmari eopge\n[26:70.74:1.73]  nal Ooh ahh ooh ahh [27:72.61:2.04]  hage mandeureo jweo\n[28:74.76:3.2]  Bla la la la malmanhaji malgo\n[29:78.12:1.22]  neukkyeojige [30:79.47:1.61]  (Huh OOH-AHH-hage)\n\n[31:82.58:3.07]  nal bwa geobwa tto du beon bwa\n[32:85.77:3.13]  hanbeon jinachigo deungeul dollyeo cheodabwa [33:88.98:0.38]  (TWICE)\n[34:89.14:0.38]  eodil [35:89.67:1.47]  gadeorado hangsang min nat\n[36:91.22:1.64]  hajiman naega jeil binna\n[37:92.97:2.94]  najeun shinbal shineodo gachineun High\n\n[38:96.36:4.02]  meorissogen neul yeonghwa sok gateun La la la\n[39:99.78:1.7]  jangmyeondeuri jinagane\n[40:101.55:2.26]  saenggangmanhaedo tteolline Yeah\n[41:103.15:3.72]  ijeneun nado nugunga hago sarange\n[42:106.76:1.37]  ppajeo bogo shipeo Baby\n[43:108.25:1.66]  jal deureoyo nae Boy\n\n[44:109.95:3]  dan hanbeondo neukkyeobon jeok eomneun geol\n[45:113.25:1.24]  alge haejuneun\n[46:114.53:1.96]  (saram gidarigo inneun geol)\n[47:116.65:1.43]  eolmaga dwaedo [48:118.26:1.87]  gidarigo shipeo\n[49:120.34:1.78]  (I just wanna fall in love)\n\n[50:122.77:3.69]  eotteoke naega umjigil su eopge\n[51:126.55:1.94]  nal Ooh ahh ooh ahh [52:128.59:1.81]  hage mandeureo jweo\n[53:130.51:3.16]  gajja gajja jinshim eomneun gajja\n[54:133.87:1.32]  jal ga jal ga [55:135.27:1.69]  (Huh OOH-AHH-hage)\n[56:136.29:3.66]  eotteoke ije deo halmari eopge\n[57:140.08:1.72]  nal Ooh ahh ooh ahh [58:141.93:2.03]  hage mandeureo jweo\n[59:144.07:3.13]  Bla la la la malmanhaji malgo\n[60:147.39:1.3]  neukkyeojige [61:148.74:1.68]  (Huh OOH-AHH-hage)\n\n[62:150.42:2.89]  amuhago [63:153.58:1.01]  manna [64:155.04:2.59]  shijakagi shireo\n[65:158.43:2.66]  shwipji aneun yeoja [66:161.83:2.43]  geuge naingeol\n\n[67:166.05:0.9]  Let me see [68:167.36:1.73]  how you gon’ treat me\n[69:169.28:1.16]  I ain’t no easy\n[70:170.57:1.65]  Better think about it TWICE\n[71:172.81:0.89]  Let me see [72:174.08:1.74]  how you gon’ treat me\n[73:176.01:1.18]  I ain’t no easy\n[74:177.32:1.89]  Better think about it TWICE\n\n[75:179.19:3.19]  (Yeah) [76:178.53:3.72]  eotteoke naega umjigil su eopge\n[77:182.35:1.75]  nal Ooh ahh ooh ahh [78:184.22:2.04]  hage mandeureo jweo\n[79:186.39:3.11]  gajja gajja jinshim eomneun gajja [80:188.9:3.02]  (Oh yeah)\n[81:189.65:1.36]  jal ga jal ga [82:191.07:1.74]  (Huh OOH-AHH-hage)\n[83:192.03:3.7]  eotteoke ije deo halmari eopge\n[84:195.85:1.71]  nal Ooh ahh ooh ahh [85:197.69:2.03]  hage mandeureo jweo\n[86:199.85:3.1]  Bla la la la malmanhaji malgo\n[87:203.11:1.33]  neukkyeojige [88:204.55:1.73]  (Huh OOH-AHH-hage)\n\n[89:218.8:1.24]  OOH-AHH-hage\n',
  //   groupSize: 9,
  //   modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //   originalArtist: 'TWICE',
  //   originalArtistId: '-LZDwKklI8YGlhmy0KJ2',
  //   private: false,
  //   query: 'like ooh-ahh twice the story begins',
  //   single: true,
  //   title: 'Like Ooh-ahh',
  //   videoId: '0rtV5esQT6I',
  // },
  // activeUnit: {
  //   id: '-LZJ7AZJOR0ehcrPecgO',
  //   artistId: '-LZJ7AQQhyOk5w_TAD4u',
  //   averages: [],
  //   createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //   debutYear: 2018,
  //   distributions: [],
  //   distributions_legacy: [],
  //   members: {
  //     '-LZJ7AGyuXFDjXz1ECb2': {
  //       age: 20,
  //       altColorId: 'col000004',
  //       altColor: {
  //         b: 122,
  //         count: 6,
  //         g: 160,
  //         hex: '#FFA07A',
  //         name: 'peach',
  //         number: 4,
  //         r: 255,
  //         id: 'col000004',
  //       },
  //       birthdate: 19980826,
  //       colorId: 'col000018',
  //       color: {
  //         b: 221,
  //         count: 8,
  //         g: 186,
  //         hex: '#39BADD',
  //         name: 'turquoise',
  //         number: 18,
  //         r: 57,
  //         id: 'col000018',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'SY',
  //       name: 'Soyeon',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'KOREAN',
  //       positions: [
  //         'CENTER',
  //         'LEADER',
  //         'LEAD_RAPPER',
  //         'MAIN_DANCER',
  //         'VOCALIST',
  //       ],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AGyuXFDjXz1ECb2',
  //     },
  //     '-LZJ7AH22seM59PQ977M': {
  //       age: 22,
  //       altColorId: 'col000010',
  //       altColor: {
  //         b: 82,
  //         count: 4,
  //         g: 255,
  //         hex: '#FFFF52',
  //         name: 'lemon',
  //         number: 10,
  //         r: 225,
  //         id: 'col000010',
  //       },
  //       birthdate: 19970131,
  //       colorId: 'col000023',
  //       color: {
  //         b: 239,
  //         count: 10,
  //         g: 119,
  //         hex: '#A177EF',
  //         name: 'violet',
  //         number: 23,
  //         r: 161,
  //         id: 'col000023',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'MY',
  //       name: 'Miyeon',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'KOREAN',
  //       positions: ['MAIN_VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AH22seM59PQ977M',
  //     },
  //     '-LZJ7AH7krbGtR-yZyhT': {
  //       age: 21,
  //       altColorId: 'col000019',
  //       altColor: {
  //         b: 134,
  //         count: 6,
  //         g: 89,
  //         hex: '#285986',
  //         name: 'navy',
  //         number: 19,
  //         r: 40,
  //         id: 'col000019',
  //       },
  //       birthdate: 19971023,
  //       colorId: 'col000002',
  //       color: {
  //         b: 27,
  //         count: 6,
  //         g: 49,
  //         hex: '#CE311B',
  //         name: 'blood',
  //         number: 2,
  //         r: 206,
  //         id: 'col000002',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'MN',
  //       name: 'Minnie',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'KOREAN',
  //       positions: ['MAIN_VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AH7krbGtR-yZyhT',
  //     },
  //     '-LZJ7AHDQIEw5VM1mI3C': {
  //       age: 20,
  //       altColorId: 'col000023',
  //       altColor: {
  //         b: 239,
  //         count: 10,
  //         g: 119,
  //         hex: '#A177EF',
  //         name: 'violet',
  //         number: 23,
  //         r: 161,
  //         id: 'col000023',
  //       },
  //       birthdate: 19980309,
  //       colorId: 'col000006',
  //       color: {
  //         b: 42,
  //         count: 14,
  //         g: 142,
  //         hex: '#FF8E2A',
  //         name: 'orange',
  //         number: 6,
  //         r: 255,
  //         id: 'col000006',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'SJ',
  //       name: 'Soojin',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'KOREAN',
  //       positions: ['LEAD_RAPPER', 'MAIN_DANCER', 'VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AHDQIEw5VM1mI3C',
  //     },
  //     '-LZJ7AHM3LgaoxdPJphc': {
  //       age: 19,
  //       altColorId: 'col000027',
  //       altColor: {
  //         b: 101,
  //         count: 5,
  //         g: 20,
  //         hex: '#9C1465',
  //         name: 'jam',
  //         number: 27,
  //         r: 156,
  //         id: 'col000027',
  //       },
  //       birthdate: 19990923,
  //       colorId: 'col000014',
  //       color: {
  //         b: 20,
  //         count: 5,
  //         g: 125,
  //         hex: '#147D14',
  //         name: 'forest',
  //         number: 14,
  //         r: 20,
  //         id: 'col000014',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'YQ',
  //       name: 'Yuqi',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'CHINESE',
  //       positions: ['LEAD_DANCER', 'LEAD_RAPPER', 'LEAD_VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AHM3LgaoxdPJphc',
  //     },
  //     '-LZJ7AHNENioOO_v3cE5': {
  //       age: 19,
  //       altColorId: 'col000024',
  //       altColor: {
  //         b: 255,
  //         count: 2,
  //         g: 208,
  //         hex: '#F7D0FF',
  //         name: 'rose',
  //         number: 24,
  //         r: 247,
  //         id: 'col000024',
  //       },
  //       birthdate: 20000106,
  //       colorId: 'col000008',
  //       color: {
  //         b: 0,
  //         count: 10,
  //         g: 228,
  //         hex: '#FFE400',
  //         name: 'yellow',
  //         number: 8,
  //         r: 255,
  //         id: 'col000008',
  //       },
  //       createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       gender: 'FEMALE',
  //       initials: 'SH',
  //       name: 'Shuhua',
  //       modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //       nationality: 'TAIWANESE',
  //       positions: ['VISUAL', 'VOCALIST'],
  //       private: false,
  //       referenceArtist: '(G)I-DLE',
  //       id: '-LZJ7AHNENioOO_v3cE5',
  //     },
  //   },
  //   modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
  //   name: 'OT6',
  //   official: true,
  //   private: false,
  //   complete: true,
  //   artistName: '(G)I-DLE',
  //   genre: 'K-Pop',
  // },
  category: 'OFFICIAL',
  distributionLines: [],
  rates: {},
  remainder: 100,
};

export default function reducer(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.SET_ACTIVE_MEMBER_PILL:
      newState.activeMemberPill = action.payload;
      break;

    case types.SET_ACTIVE_SONG:
      newState.activeSong = action.payload;
      break;

    case types.SET_ACTIVE_UNIT:
      newState.activeUnit = action.payload;
      break;

    case types.SET_DISTRIBUTION_CATEGORY:
      newState.category = action.payload;
      break;

    case types.SET_DISTRIBUTION_LINES:
      newState.distributionLines = action.payload;
      break;

    case types.SET_DISTRIBUTION_REMAINDER:
      newState.remainder = action.payload;
      break;

    case types.SET_RATES:
      newState.rates = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
