import React from "react";
import { compose } from "recompose";
import { withWidth, WithWidth, isWidthDown } from "../mui/width";
import MobileDrawer from './components/MobileDrawer';
import TitleBar from './components/TitleBar';

type Props = WithWidth;

const AppContainer: React.SFC<Props> = ({ width, ...props }) => {
  const isMobile = isWidthDown("sm", width, false);
  return (
    <>
      <MobileDrawer />
      <TitleBar />
      {props.children}
    </>
  )
}

export default compose(
  withWidth()
)(AppContainer);