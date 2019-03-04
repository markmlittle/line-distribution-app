import _ from 'lodash';

import actions from './actions';

const activateSong = id => (dispatch, getState) => {
  const activeSong = _.find(getState().admin.songs, { id });
  dispatch(actions.setActiveSong(activeSong));
};

const activateUnit = () => (dispatch, getState) => {
  const selectedArtist = { ...getState().artists.selectedArtist };
  const activeUnit = { ...getState().artists.selectedUnit };

  activeUnit.artistName = selectedArtist.name;
  activeUnit.genre = selectedArtist.genre;

  dispatch(actions.setActiveUnit(activeUnit));
};

const prepareSong = () => (dispatch, getState) => {
  const { activeSong } = getState().distribute;
  if (activeSong.id) {
    const distributionString = activeSong.distribution;

    const buildPartData = data => {
      const [id, startTime, duration] = data.split(':');
      return {
        id,
        startTime: +startTime,
        duration: +duration,
        endTime: +startTime + +duration,
      };
    };

    // Iterate through lines
    const distributionLines = distributionString.split('\n').map(line => {
      if (line.length < 2) {
        return [];
      }
      const parsedLine = [];
      let insideBracket = false;
      let id = '';
      let content = '';

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '[' && i > 0) {
          content = content[0] === ' ' ? content.substring(1) : content;
          parsedLine.push({ ...buildPartData(id), content, memberId: [] });
        }

        if (char === '[') {
          insideBracket = true;
          id = '';
          content = content.trim();
        } else if (char === ']') {
          insideBracket = false;
          content = '';
        } else if (insideBracket) {
          id += char;
        } else {
          content += char;
        }
      }
      content = content[0] === ' ' ? content.substring(1) : content;
      parsedLine.push({ ...buildPartData(id), content, memberId: [] });

      return parsedLine;
    });

    dispatch(actions.setDistibutionLines(distributionLines));
  }
};

const activateMemberPill = id => (dispatch, getState) => {
  const { activeMemberPill } = getState().distribute;

  if (id === activeMemberPill) {
    dispatch(actions.setActiveMemberPill(''));
  } else {
    dispatch(actions.setActiveMemberPill(id));
  }
};

const linkMemberToPart = id => (dispatch, getState) => {
  const { activeMemberPill } = getState().distribute;

  if (!activeMemberPill) return;

  const distributionLines = [...getState().distribute.distributionLines];

  // console.log(distributionLines);
  for (let l = 0; l < distributionLines.length; l++) {
    const line = distributionLines[l];
    let found = false;
    for (let p = 0; p < line.length; p++) {
      const part = line[p];

      if (part.id === id) {
        // If it already has the member, remove it
        if (part.memberId.includes(activeMemberPill)) {
          part.memberId = part.memberId.filter(m => m !== activeMemberPill);
        } else {
          part.memberId.push(activeMemberPill);
        }

        found = true;
        break;
      }
    }
    if (found) break;
  }
  dispatch(actions.setDistibutionLines(distributionLines));
  dispatch(calculateRates(distributionLines));
};

const calculateRates = distributionLines => dispatch => {
  const rates = {
    total: 0,
    remaining: 0,
  };

  for (let l = 0; l < distributionLines.length; l++) {
    const line = distributionLines[l];
    for (let p = 0; p < line.length; p++) {
      const part = line[p];
      if (part.memberId.length) {
        for (let m = 0; m < part.memberId.length; m++) {
          rates.total += part.duration;
          const mId = part.memberId[m];
          if (rates[mId] === undefined) {
            rates[mId] = 0;
          }
          rates[mId] += part.duration;
        }
      } else {
        rates.remaining += part.duration;
      }
    }
  }

  dispatch(actions.setRates(rates));
};

export default {
  activateMemberPill,
  activateSong,
  activateUnit,
  linkMemberToPart,
  prepareSong,
};