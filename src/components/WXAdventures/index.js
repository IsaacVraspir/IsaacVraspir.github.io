/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css } from "@emotion/react"
import Navigator from "../navigator/index.js";
import PixiStart from "components/WXAdventures/pixiStart.js";

const WXAdventures = (props) => {
  

  return (
    <div
      css={css`
        background: ${props.state.darkestColor};
        height: ${props.state.windowHeight}px;
        width: ${props.state.windowWidth}px;
      `}
    >
      <Navigator />

      <PixiStart 
        width={props.state.windowWidth}
        height={props.state.windowHeight - props.state.heightOfNavigator - 4} //idk why the -4
      />
    </div>
  )
}

export default wrapComponent(
  WXAdventures,
  _.pick([
    "redirectToPage",
    "state.windowHeight",
    "state.windowWidth",
    "state.heightOfNavigator",
    "state.darkestColor",
    "state.lighterDarkColor"
  ])
);