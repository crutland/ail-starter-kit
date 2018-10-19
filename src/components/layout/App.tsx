import React from "react";
import { Store } from 'redux';
import { compose } from "recompose";
import { Provider, connect } from "react-redux";
import { CssBaseline, Typography } from "../mui";
import { MuiThemeProvider, withStyles, WithStyles, createStyles, Theme } from "../mui/style";
import { darkTheme, lightTheme } from "src/theme/amherst";
import { ApplicationState } from 'src/store';
import AppContainer from './AppContainer';
import AppContent from './AppContent';

interface OwnProps {
  store: Store<ApplicationState>
}

interface PropsFromState {
  theme: Theme
}

const styles = createStyles({
  center: {
    textAlign: "center"
  }
});

type Props = OwnProps & PropsFromState & WithStyles<typeof styles>;

function mapState(state: ApplicationState): PropsFromState {
  return { theme: state.layout.theme === "light" ? lightTheme : darkTheme };
}

const App: React.SFC<Props> = ({ store, theme, classes }) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppContainer>
          <AppContent />
        </AppContainer>
      </MuiThemeProvider>
    </Provider>
  );
}

export default compose<Props, OwnProps>(
  withStyles(styles),
  connect(mapState),
)(App);
