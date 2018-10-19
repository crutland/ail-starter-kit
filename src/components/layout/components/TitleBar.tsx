import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "src/components/mui";
import { WithStyles, withStyles, createStyles, Theme } from "src/components/mui/style";
import { withWidth, WithWidth, isWidthDown } from "src/components/mui/width";
import { MenuIcon } from "src/components/mui/icons";
import { compose } from 'recompose';
import { ApplicationState } from 'src/store';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import classNames from "classnames";
import { LayoutActions } from 'src/store/layout';

const drawerWidth = 300;

const styles = (theme: Theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  shifted: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none"
  }
});

interface PropsFromState {
  drawerOpen: boolean
};

interface PropsFromDispatch {
  openDrawer: () => void
}

type Props = PropsFromState & PropsFromDispatch & WithStyles<typeof styles> & WithWidth;

const TitleBar: React.SFC<Props> = ({ width, classes, drawerOpen, openDrawer }) => {
  const isMobile = isWidthDown("sm", width, true);
  const appBarClasses = classNames(classes.appBar, (!isMobile && drawerOpen && classes.shifted));
  const iconButtonClasses = classNames(classes.menuButton, (!isMobile && drawerOpen && classes.hide));
  const disableGutters = !drawerOpen && !isMobile;
  return (
    <AppBar position="static" elevation={5} className={appBarClasses}>
      <Toolbar disableGutters={disableGutters}>
        <IconButton color="inherit" area-label="Open Drawer" onClick={openDrawer} className={iconButtonClasses}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Residential Data Explorer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

function mapState(state: ApplicationState): PropsFromState {
  return { drawerOpen: state.layout.drawer === "open" };
}

function mapDispatch(dispatch: Dispatch): PropsFromDispatch {
  return bindActionCreators({
    openDrawer: () => LayoutActions.setDrawerState("open")
  }, dispatch);
}

export default compose(
  withWidth(),
  withStyles(styles),
  connect(mapState, mapDispatch)
)(TitleBar)