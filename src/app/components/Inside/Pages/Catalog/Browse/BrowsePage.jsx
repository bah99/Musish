import React from 'react';
import { withRouter } from 'react-router-dom';
import PageContent from '../../../../Common/PageContent/PageContent';
import PageTitle from '../../../../Common/PageTitle/PageTitle';
import * as MusicPlayerApi from '../../../../../services/MusicPlayerApi';
import Tabs from '../../../../Common/Tabs/Tabs';
import Tab from '../../../../Common/Tabs/Tab';
import Genres from './Genres/Genres';
import translate from '../../../../../utils/translations/Translations';
import Overview from './Overview/Overview';

class BrowsePage extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  static playTrack({ tracks, index }) {
    MusicPlayerApi.playTrack(tracks, index);
  }

  render() {
    return (
      <PageContent innerRef={this.ref}>
        <PageTitle title={`${translate.browse}`} context={`${translate.appleMusic}`} />

        <Tabs>
          <Tab name={`${translate.topCharts}`} route={'/browse'}>
            <Overview />
          </Tab>
          <Tab name={`${translate.genres}`} route={'/browse/genres'}>
            <Genres />
          </Tab>
        </Tabs>
      </PageContent>
    );
  }
}

export default withRouter(BrowsePage);
