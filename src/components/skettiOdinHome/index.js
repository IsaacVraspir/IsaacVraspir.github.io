
/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css } from "@emotion/react"
import Navigator from "../navigator/index.js";

const SkettiOdinHome = (props) => {
  return(
    <div
      css={css`
        background: #191919;
        height: ${props.state.windowHeight}px;
        width: ${props.state.windowWidth}px;
      `}
    >
      {/*<Link to="/">Home</Link>*/}
      <Navigator />

      
    </div>
  )
}
export default wrapComponent(
  SkettiOdinHome,
  _.pick([
    "redirectToPage",
    "state.windowWidth",
    "state.windowHeight"
  ])
);