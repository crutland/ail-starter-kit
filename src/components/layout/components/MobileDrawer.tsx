import React from "react";
import { SwipeableDrawer } from "../../mui";
import { createStyles, withStyles, WithStyles } from "src/components/mui/style";
import { compose } from 'recompose';
import { ApplicationState } from 'src/store';
import { LayoutActions } from "src/store/layout";
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DrawerContents from './DrawerContents';

const drawerWidth = 300;

const styles = createStyles({
  list: {
    width: drawerWidth,
    height: "100%",
    display: "flex",
    flexFlow: "column nowrap"
  },
});

interface PropsFromState {
  open: boolean;
}

interface PropsFromDispatch {
  onOpen: () => void;
  onClose: () => void;
}

type Props = PropsFromState & PropsFromDispatch & WithStyles<typeof styles>;

const MobileDrawer: React.SFC<Props> = ({ open, onOpen, onClose, classes }) => {
  return (
    <SwipeableDrawer open={open} onOpen={onOpen} onClose={onClose}>
      <div className={classes.list} tabIndex={0} role="button" onClick={onClose}>
        <DrawerContents />
      </div>
    </SwipeableDrawer>
  )
};

function mapState(state: ApplicationState): PropsFromState {
  return {
    open: state.layout.drawer == "open"
  }
}

function mapDispatch(dispatch: Dispatch): PropsFromDispatch {
  return bindActionCreators({
    onOpen: () => LayoutActions.setDrawerState("open"),
    onClose: () => LayoutActions.setDrawerState("closed")
  }, dispatch)
}

export default compose(
  withStyles(styles),
  connect(mapState, mapDispatch)
)(MobileDrawer);