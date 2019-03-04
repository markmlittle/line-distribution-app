import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import shared components
import { LoadingIcon, Icon } from '../../../common';

const SongsTable = ({ songs, pending, rowAction, songSearchQuery }) => {
  // Filter table rows based on searchQuery
  let filteredSongs = songs;
  if (songSearchQuery && filteredSongs[0]) {
    filteredSongs = _.filter(songs, o => o.query.includes(songSearchQuery));
  }
  // Message to be display when table has no rows
  const emptyTableMessage =
    songSearchQuery.length > 0
      ? 'No songs available within your search'
      : 'No songs available';

  const rowFallback = () => {
    if (pending) {
      return (
        <tr>
          <td colSpan="7">
            <LoadingIcon />
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan="7">{emptyTableMessage}</td>
      </tr>
    );
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Group Size</th>
          <th>Video</th>
          <th>Title Song</th>
        </tr>
      </thead>
      <tbody onClick={rowAction}>
        {filteredSongs.length > 0
          ? filteredSongs.map(entry => (
              <tr key={`all-artists-${entry.id}`} id={`a-${entry.id}`}>
                <td>
                  {entry.private ? (
                    <Icon type="private" color="red" title="PRivate" inline />
                  ) : (
                    ''
                  )}
                </td>
                <td>{entry.title}</td>
                <td>
                  {entry.originalArtist}{' '}
                  {entry.originalArtistId ? (
                    <Icon
                      type="check"
                      color="yellow"
                      title="Artist in LD"
                      inline
                    />
                  ) : null}
                </td>
                <td>
                  {entry.album !== 'UNKNOWN' ? (
                    entry.album
                  ) : (
                    <Icon
                      type="question-mark"
                      color="blue"
                      title="Unkown Album Title"
                      inline
                    />
                  )}
                </td>
                <td>{entry.groupSize}</td>
                <td>
                  {entry.videoId ? (
                    <Icon
                      type="youtube"
                      color="red"
                      title={entry.videoId}
                      size="18"
                      inline
                    />
                  ) : (
                    'Unavailable'
                  )}
                </td>
                <td>
                  {entry.single ? (
                    <Icon
                      type="check"
                      color="green"
                      title="Title Song"
                      inline
                    />
                  ) : (
                    <Icon
                      type="no"
                      color="red"
                      title="Not a Title Song"
                      inline
                    />
                  )}
                </td>
              </tr>
            ))
          : rowFallback()}
      </tbody>
    </table>
  );
};

SongsTable.propTypes = {
  pending: PropTypes.bool,
  rowAction: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  songSearchQuery: PropTypes.string,
};

SongsTable.defaultProps = {
  pending: false,
  songSearchQuery: '',
};

export default SongsTable;