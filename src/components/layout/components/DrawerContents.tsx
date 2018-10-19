import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "src/components/mui/list";
import { createStyles, withStyles, WithStyles } from "src/components/mui/style";
import { CheckBoxIcon, CheckBoxOutlineIcon } from "src/components/mui/icons";
import { compose } from 'recompose';
import { Dispatch, bindActionCreators } from 'redux';
import { LayoutActions } from "src/store/layout";
import { ThemeOptions } from 'src/theme';
import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';

const styles = createStyles({
  primary: {
    overflow: "auto",
    flex: 1
  }
});

interface PropsFromState {
  theme: ThemeOptions
};

interface PropsFromDispatch {
  setTheme: (theme: ThemeOptions) => void;
};

type Props = PropsFromState & PropsFromDispatch & WithStyles<typeof styles>;

const DrawerContents: React.SFC<Props> = ({ classes, theme, setTheme }) => {
  const nextTheme = theme === "light" ? "dark" : "light";
  const toggleTheme = () => setTheme(nextTheme);
  const themeIcon = nextTheme === "light" ? <CheckBoxIcon /> : <CheckBoxOutlineIcon />
  return (
    <>
      <List className={classes.primary}>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toggleTheme}>
          <ListItemIcon>{themeIcon}</ListItemIcon>
          <ListItemText>Use Dark Theme</ListItemText>
        </ListItem>
      </List>
    </>
  )
};

function mapState(state: ApplicationState): PropsFromState {
  return ({ theme: state.layout.theme });
}

function mapDispatch(dispatch: Dispatch): PropsFromDispatch {
  return bindActionCreators({ setTheme: LayoutActions.setTheme }, dispatch);
}

export default compose(
  withStyles(styles),
  connect(mapState, mapDispatch)
)(DrawerContents);