import React, { Component } from 'react';

import LoginRequiredScreen from './LoginRequiredScreen';
import LoadingScreen from './LoadingScreen';
import UserArtistTable from './UserArtistTable';

import { ARTITST_PLACEHOLDER } from '../constants';

class Artists extends Component {
  componentWillMount() {
    if (this.props.db.loaded) {
      this.props.loadArtists();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.db.loaded !== this.props.db.loaded) {
      this.props.loadArtists();
      this.render();
    }
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.filterArtists('');
    }
  }

  render() {
    // If user is not logged in
    if (!this.props.user.authenticated) {
      return <LoginRequiredScreen props={this.props} />;
    }
    // If no db, show loading
    if (this.props.db.loaded === false) {
      return <LoadingScreen />;
    }

    const APP = this.props.app;
    const ARTISTS = this.props.artists;
    const { artistList } = ARTISTS;
    const currentArtist = APP.currentArtist.id ? APP.currentArtist : ARTITST_PLACEHOLDER;

    const handleArtistClick = (e) => {
      // Get id of the closest tr element
      const artistId = ARTISTS.artistList[[].indexOf.call(e.currentTarget.children, e.target.closest('tr'))].id;
      this.props.history.push(`/artist/${artistId}`);
      this.props.toggleIsLoading(false);
    };

    const setArtistUnit = (unit) => {
      this.props.history.push(`/artist/${unit.artist.id}`);
      this.props.toggleIsLoading(true);
      // Delays setting selected unit to override page landing functions
      setTimeout(() => {
        this.props.updateSelectedUnit(unit.id);
        this.props.toggleIsLoading(false);
      }, 1000);
    };

    return (
      <section className="container">
        <h1>Artists</h1>
        <p>Current Band: {currentArtist.name}</p>

        {
          this.props.user.authenticated ? (
            <div className="user-artists-container">
              <UserArtistTable
                title="Your Latest Artists"
                unitList={ARTISTS.userLatestArtists}
                action={setArtistUnit}
                message="When you begin using the app, the 5 most recent artists you use will show up here."
              />
              <UserArtistTable
                title="Your Favorite Artists"
                unitList={ARTISTS.userFavoriteArtists}
                action={setArtistUnit}
                message="You may favorite up to 5 artists by clicking on the Star icon in the Artist page."
              />
            </div>
          ) : null
        }


        <h2>All Artists</h2>
        <input className="search-bar" type="text" placeholder="Filter..." onChange={this.props.filterArtists} />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Units</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody onClick={(e) => handleArtistClick(e)}>
            {
              artistList.length > 0 ?
              artistList.map((entry) => {
                const unitCount = entry.units ? entry.units.length : 0;
                return (
                  <tr key={entry.id}>
                    <td>{entry.name}</td>
                    <td>{entry.genre}</td>
                    <td>{unitCount}</td>
                    <td>{entry.memberList.join(', ')}</td>
                  </tr>
                );
              })
              :
              <tr><td>No artists available within your search</td><td /><td /><td /></tr>
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Artists;
