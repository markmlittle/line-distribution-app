import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = ({ props }) => {
  const handleLogoClick = () => {
    props.history.push('/');
  };

  return (
    <header className="app-header">
      <img className="app-logo" src={logo} alt="Logo" onClick={handleLogoClick} />
      <nav className="app-nav">
        <Link to="/artists">Artists</Link>
        <Link to="/distribute">Distribute</Link>
        <Link to="/lyrics">Lyrics</Link>
        <Link to="/songs">Songs</Link>
        <Link to="/create">Create</Link>
        <Link to="/colorsheet">Color Sheet</Link>
        <Link to="/database">Database</Link>
      </nav>
    </header>
  );
};

export default Header;
