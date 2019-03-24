import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from '../../../../../Common/Loader/Loader';
import * as MusicPlayerApi from '../../../../../../services/MusicPlayerApi';
import * as Backend from '../../../../../../services/Backend';
import BrowseSection from './BrowseSection';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: null,
    };

    this.ref = React.createRef();
    this.getOverview = this.getOverview.bind(this);
  }

  componentDidMount() {
    this.getOverview();
  }

  async getOverview() {
    const data = await Backend.getBrowseOverview();

    const sections = data.sections.map(section => ({
      ...section,
      content: section.content.map(item => {
        const itemId = typeof item === 'string' ? item : item.itemId;
        return data.lookup[itemId];
      }),
    }));

    this.setState({
      sections: sections,
    });
  }

  static playTrack({ tracks, index }) {
    MusicPlayerApi.playTrack(tracks, index);
  }

  render() {
    const { sections } = this.state;

    if (!sections) {
      return <Loader />;
    }

    return sections.map(section => <BrowseSection section={section} />);
  }
}

export default withRouter(Overview);
