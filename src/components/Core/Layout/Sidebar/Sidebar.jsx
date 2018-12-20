import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Player from '../../Player/Player';
import classes from './Sidebar.scss';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: null,
    };
  }

  async componentDidMount() {
    const music = MusicKit.getInstance();
    const playlists = await music.api.library.playlists();

    this.setState({
      playlists,
    });
  }

  render() {
    const playlists =
      this.state.playlists &&
      this.state.playlists.map(playlist => (
        <MenuItem
          to={`/playlists/${playlist.id}`}
          label={playlist.attributes.name}
          key={playlist.id}
        />
      ));

    return (
      <aside className={classes.sidebar}>
        <div className={classes.menus}>
          <div className={classes.menu}>
            <h3>My Library</h3>
            <ul>
              <MenuItem to={'/'} label={'For You'} />
              <MenuItem to={'/artists'} exact={false} label={'Artists'} />
              <MenuItem to={'/albums'} exact={false} label={'Albums'} />
              <MenuItem to={'/songs'} label={'Songs'} />
            </ul>
          </div>
          <div className={classes.menu}>
            <h3>Apple Music</h3>
            <ul>
              <MenuItem to={'/browse'} label={'Browse'} />
              <MenuItem to={'/radio'} label={'Radio'} />
            </ul>
          </div>
          {playlists && (
            <div className={classes.menu}>
              <h3>Playlists</h3>
              <ul>{playlists}</ul>
            </div>
          )}
        </div>
        <Player />
      </aside>
    );
  }
}

function MenuItem(props) {
  const { to, label, exact } = props;

  return (
    <Route path={to} exact={exact}>
      {({ match }) => (
        <li className={match ? classes.active : ''}>
          <Link to={to}>{label}</Link>
        </li>
      )}
    </Route>
  );
}

MenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

MenuItem.defaultProps = {
  exact: true,
};