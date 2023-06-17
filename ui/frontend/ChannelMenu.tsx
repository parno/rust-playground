import React, { Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MenuGroup from './MenuGroup';
import SelectOne from './SelectOne';

import * as actions from './actions';
import * as selectors from './selectors';
import State from './state';
import { Channel } from './types';

import styles from './ChannelMenu.module.css';

interface ChannelMenuProps {
  close: () => void;
}

const ChannelMenu: React.FC<ChannelMenuProps> = props => {
  const channel = useSelector((state: State) => state.configuration.channel);
  const stableVersion = useSelector(selectors.stableVersionText);
  const stableVersionDetails = useSelector(selectors.stableVersionDetailsText);
  const betaVersion = useSelector(selectors.betaVersionText);
  const nightlyVersion = useSelector(selectors.nightlyVersionText);
  const betaVersionDetails = useSelector(selectors.betaVersionDetailsText);
  const nightlyVersionDetails = useSelector(selectors.nightlyVersionDetailsText);

  const dispatch = useDispatch();
  const changeChannel = useCallback((channel: Channel) => {
    dispatch(actions.changeChannel(channel));
    props.close();
  }, [dispatch, props]);

  return (
    <Fragment>
      <MenuGroup title="Verified using Verus version:">
          <Desc>
          <div dangerouslySetInnerHTML={{__html: stableVersionDetails }}></div>
          </Desc>
      </MenuGroup>
    </Fragment>
  );
};

const Desc: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <div className={styles.description}>{children}</div>
);

export default ChannelMenu;
