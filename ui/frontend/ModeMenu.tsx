import React, { Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MenuGroup from './MenuGroup';
import SelectOne from './SelectOne';

import * as actions from './actions';
import State from './state';
import { Mode } from './types';

interface ModeMenuProps {
  close: () => void;
}

const ModeMenu: React.FC<ModeMenuProps> = props => {
  const mode = useSelector((state: State) => state.configuration.mode);
  const dispatch = useDispatch();
  const changeMode = useCallback((mode: Mode) => {
    dispatch(actions.changeMode(mode));
    props.close();
  }, [dispatch, props]
  );

  return (
    <Fragment>
      <MenuGroup title="Error reporting level">
        <SelectOne
          name="Basic Errors"
          currentValue={mode}
          thisValue={Mode.Release}
          changeValue={changeMode}
        >
          Run with basic error reporting.
        </SelectOne>
        <SelectOne
          name="Detailed Errors"
          currentValue={mode}
          thisValue={Mode.Debug}
          changeValue={changeMode}
        >
          Attempts to expand errors in more detail.
        </SelectOne>
      </MenuGroup>
    </Fragment>
  );
};

export default ModeMenu;
